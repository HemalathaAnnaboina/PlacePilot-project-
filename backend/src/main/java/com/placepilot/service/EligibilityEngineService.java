package com.placepilot.service;

import com.placepilot.dto.EligibilityResultDto;
import com.placepilot.entity.PlacementDrive;
import com.placepilot.entity.StudentProfile;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EligibilityEngineService {

    /**
     * Deterministic eligibility evaluation engine according to placement criteria.
     * Evaluates every criterion independently and records exact reason for eligibility or ineligibility.
     */
    public EligibilityResultDto evaluateEligibility(StudentProfile student, PlacementDrive drive) {
        EligibilityResultDto result = new EligibilityResultDto();
        result.setDriveTitle(drive.getTitle());
        result.setCompanyName(drive.getCompany() != null ? drive.getCompany().getName() : "Company");

        boolean overallEligible = true;

        // 1. Minimum CGPA Check
        boolean cgpaPassed = student.getCgpa() != null && student.getCgpa() >= drive.getMinCgpa();
        String studentCgpaStr = student.getCgpa() != null ? String.format("%.2f", student.getCgpa()) : "N/A";
        String requiredCgpaStr = String.format(">= %.2f", drive.getMinCgpa());
        String cgpaMessage = cgpaPassed
                ? String.format("CGPA %s satisfies the minimum requirement of %.2f", studentCgpaStr, drive.getMinCgpa())
                : String.format("CGPA %s is below the mandatory cutoff of %.2f", studentCgpaStr, drive.getMinCgpa());
        result.addCriterion("Minimum CGPA", cgpaPassed, studentCgpaStr, requiredCgpaStr, cgpaMessage);
        if (!cgpaPassed) overallEligible = false;

        // 2. Branch Eligibility Check
        List<String> allowedBranches = Arrays.stream(drive.getEligibleBranches().split(","))
                .map(String::trim)
                .map(String::toUpperCase)
                .collect(Collectors.toList());

        String studentBranch = student.getBranch() != null ? student.getBranch().trim().toUpperCase() : "";
        boolean branchPassed = !studentBranch.isEmpty() && (allowedBranches.contains(studentBranch) || allowedBranches.contains("ALL"));
        String requiredBranchesStr = String.join(", ", allowedBranches);
        String branchMessage = branchPassed
                ? String.format("Branch '%s' is among eligible branches (%s)", student.getBranch(), requiredBranchesStr)
                : String.format("Branch '%s' is not in the list of eligible branches (%s)", student.getBranch(), requiredBranchesStr);
        result.addCriterion("Branch Eligibility", branchPassed, student.getBranch(), requiredBranchesStr, branchMessage);
        if (!branchPassed) overallEligible = false;

        // 3. Active Backlogs Check
        int studentBacklogs = student.getActiveBacklogs() != null ? student.getActiveBacklogs() : 0;
        int maxBacklogs = drive.getMaxBacklogsAllowed() != null ? drive.getMaxBacklogsAllowed() : 0;
        boolean backlogsPassed = studentBacklogs <= maxBacklogs;
        String studentBacklogsStr = String.valueOf(studentBacklogs);
        String requiredBacklogsStr = String.format("<= %d active backlog(s)", maxBacklogs);
        String backlogsMessage = backlogsPassed
                ? (studentBacklogs == 0
                    ? "Zero active backlogs (Compliant)"
                    : String.format("%d active backlogs is within permitted limit of %d", studentBacklogs, maxBacklogs))
                : String.format("Student has %d active backlogs exceeding maximum allowed limit of %d", studentBacklogs, maxBacklogs);
        result.addCriterion("Active Backlogs", backlogsPassed, studentBacklogsStr, requiredBacklogsStr, backlogsMessage);
        if (!backlogsPassed) overallEligible = false;

        // 4. Graduation Year Check
        boolean yearPassed = student.getGraduationYear() != null && student.getGraduationYear().equals(drive.getGraduationYear());
        String studentYearStr = student.getGraduationYear() != null ? String.valueOf(student.getGraduationYear()) : "N/A";
        String requiredYearStr = String.valueOf(drive.getGraduationYear());
        String yearMessage = yearPassed
                ? String.format("Graduation batch %s matches target batch %s", studentYearStr, requiredYearStr)
                : String.format("Graduation batch %s does not match required batch %s", studentYearStr, requiredYearStr);
        result.addCriterion("Graduation Year", yearPassed, studentYearStr, requiredYearStr, yearMessage);
        if (!yearPassed) overallEligible = false;

        // Final verdict
        result.setEligible(overallEligible);
        if (overallEligible) {
            result.setSummaryMessage("Congratulations! You satisfy all deterministic criteria for this drive.");
        } else {
            result.setSummaryMessage("You do not meet the mandatory criteria: " + String.join("; ", result.getIneligibilityReasons()));
        }

        return result;
    }
}

