package com.placepilot.service;

import com.placepilot.dto.EligibilityResultDto;
import com.placepilot.dto.JobMatchResultDto;
import com.placepilot.dto.PlacementDriveDto;
import com.placepilot.dto.PlacementDriveRequest;
import com.placepilot.entity.*;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlacementDriveService {

    private final PlacementDriveRepository driveRepository;
    private final CompanyRepository companyRepository;
    private final ApplicationRepository applicationRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final EligibilityEngineService eligibilityEngine;
    private final AiService aiService;

    public PlacementDriveService(PlacementDriveRepository driveRepository,
                                 CompanyRepository companyRepository,
                                 ApplicationRepository applicationRepository,
                                 StudentProfileRepository studentProfileRepository,
                                 EligibilityEngineService eligibilityEngine,
                                 AiService aiService) {
        this.driveRepository = driveRepository;
        this.companyRepository = companyRepository;
        this.applicationRepository = applicationRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.eligibilityEngine = eligibilityEngine;
        this.aiService = aiService;
    }

    @Transactional
    public PlacementDriveDto createDrive(PlacementDriveRequest request, Long companyId) {
        Long targetCompanyId = request.getCompanyId() != null ? request.getCompanyId() : companyId;
        Company company = companyRepository.findById(targetCompanyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + targetCompanyId));

        PlacementDrive drive = new PlacementDrive();
        drive.setTitle(request.getTitle());
        drive.setRoleName(request.getRoleName());
        drive.setCompany(company);
        drive.setJobDescription(request.getJobDescription());
        drive.setJobLocation(request.getJobLocation());
        drive.setPackageLpa(request.getPackageLpa());
        drive.setMinCgpa(request.getMinCgpa());
        drive.setEligibleBranches(request.getEligibleBranches());
        drive.setMaxBacklogsAllowed(request.getMaxBacklogsAllowed());
        drive.setGraduationYear(request.getGraduationYear());
        drive.setRequiredSkills(request.getRequiredSkills());
        drive.setDriveDate(request.getDriveDate());
        drive.setApplicationDeadline(request.getApplicationDeadline());
        drive.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");

        drive = driveRepository.save(drive);
        return toDto(drive);
    }

    @Transactional
    public PlacementDriveDto updateDrive(Long id, PlacementDriveRequest request) {
        PlacementDrive drive = driveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement drive not found with ID: " + id));

        drive.setTitle(request.getTitle());
        drive.setRoleName(request.getRoleName());
        drive.setJobDescription(request.getJobDescription());
        drive.setJobLocation(request.getJobLocation());
        drive.setPackageLpa(request.getPackageLpa());
        drive.setMinCgpa(request.getMinCgpa());
        drive.setEligibleBranches(request.getEligibleBranches());
        drive.setMaxBacklogsAllowed(request.getMaxBacklogsAllowed());
        drive.setGraduationYear(request.getGraduationYear());
        drive.setRequiredSkills(request.getRequiredSkills());
        drive.setDriveDate(request.getDriveDate());
        drive.setApplicationDeadline(request.getApplicationDeadline());
        if (request.getStatus() != null) drive.setStatus(request.getStatus());

        drive = driveRepository.save(drive);
        return toDto(drive);
    }

    public List<PlacementDriveDto> getAllDrives() {
        return driveRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PlacementDriveDto> getActiveDrives() {
        return driveRepository.findByStatus("ACTIVE").stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public PlacementDriveDto getDriveById(Long id) {
        PlacementDrive drive = driveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement drive not found with ID: " + id));
        return toDto(drive);
    }

    public List<PlacementDriveDto> getDrivesByCompanyId(Long companyId) {
        return driveRepository.findByCompanyId(companyId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Enriches drives for a student: checks application status, computes deterministic eligibility,
     * and calculates AI job match score.
     */
    public List<PlacementDriveDto> getDrivesForStudent(Long userId) {
        Optional<StudentProfile> studentOpt = studentProfileRepository.findByUserId(userId);
        List<PlacementDrive> drives = driveRepository.findAllByOrderByCreatedAtDesc();

        if (studentOpt.isEmpty()) {
            return drives.stream().map(this::toDto).collect(Collectors.toList());
        }

        StudentProfile student = studentOpt.get();
        List<PlacementDriveDto> list = new ArrayList<>();

        for (PlacementDrive drive : drives) {
            PlacementDriveDto dto = toDto(drive);

            // Check if student applied
            Optional<Application> appOpt = applicationRepository.findByStudentProfileAndPlacementDrive(student, drive);
            if (appOpt.isPresent()) {
                dto.setUserApplied(true);
                dto.setUserApplicationStatus(appOpt.get().getStatus().name());
            } else {
                dto.setUserApplied(false);
            }

            // Deterministic Eligibility Check
            EligibilityResultDto eligibility = eligibilityEngine.evaluateEligibility(student, drive);
            dto.setUserEligible(eligibility.isEligible());
            dto.setUserEligibilityReason(eligibility.getSummaryMessage());

            // Smart Job Match Score
            try {
                JobMatchResultDto match = aiService.calculateJobMatch(student.getId(), drive.getId());
                dto.setMatchScore(match.getMatchScore());
            } catch (Exception e) {
                dto.setMatchScore(75);
            }

            list.add(dto);
        }

        return list;
    }

    public PlacementDriveDto toDto(PlacementDrive d) {
        PlacementDriveDto dto = new PlacementDriveDto();
        dto.setId(d.getId());
        dto.setTitle(d.getTitle());
        dto.setRoleName(d.getRoleName());
        if (d.getCompany() != null) {
            dto.setCompanyId(d.getCompany().getId());
            dto.setCompanyName(d.getCompany().getName());
            dto.setCompanyLogo(d.getCompany().getLogoUrl());
            dto.setCompanyIndustry(d.getCompany().getIndustry());
        }
        dto.setJobDescription(d.getJobDescription());
        dto.setJobLocation(d.getJobLocation());
        dto.setPackageLpa(d.getPackageLpa());
        dto.setMinCgpa(d.getMinCgpa());
        dto.setEligibleBranches(d.getEligibleBranches());
        dto.setMaxBacklogsAllowed(d.getMaxBacklogsAllowed());
        dto.setGraduationYear(d.getGraduationYear());
        dto.setRequiredSkills(d.getRequiredSkills());
        dto.setDriveDate(d.getDriveDate());
        dto.setApplicationDeadline(d.getApplicationDeadline());
        dto.setStatus(d.getStatus());
        dto.setTotalApplicants(applicationRepository.findByPlacementDrive(d).size());
        dto.setCreatedAt(d.getCreatedAt());
        return dto;
    }
}

