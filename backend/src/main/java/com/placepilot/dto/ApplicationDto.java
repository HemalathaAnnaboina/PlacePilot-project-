package com.placepilot.dto;

import com.placepilot.entity.ApplicationStatus;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ApplicationDto {

    private Long id;
    private Long studentProfileId;
    private String studentName;
    private String studentEmail;
    private String studentRollNumber;
    private String studentBranch;
    private Double studentCgpa;
    private Integer studentBacklogs;
    private String resumeUrl;
    private Long placementDriveId;
    private String driveTitle;
    private String roleName;
    private Long companyId;
    private String companyName;
    private String companyLogo;
    private ApplicationStatus status;
    private Integer matchScore;
    private String matchExplanation;
    private String notes;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
    private List<ApplicationHistoryDto> history = new ArrayList<>();
    private List<InterviewScheduleDto> interviews = new ArrayList<>();

    public ApplicationDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudentProfileId() { return studentProfileId; }
    public void setStudentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }
    public String getStudentRollNumber() { return studentRollNumber; }
    public void setStudentRollNumber(String studentRollNumber) { this.studentRollNumber = studentRollNumber; }
    public String getStudentBranch() { return studentBranch; }
    public void setStudentBranch(String studentBranch) { this.studentBranch = studentBranch; }
    public Double getStudentCgpa() { return studentCgpa; }
    public void setStudentCgpa(Double studentCgpa) { this.studentCgpa = studentCgpa; }
    public Integer getStudentBacklogs() { return studentBacklogs; }
    public void setStudentBacklogs(Integer studentBacklogs) { this.studentBacklogs = studentBacklogs; }
    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
    public Long getPlacementDriveId() { return placementDriveId; }
    public void setPlacementDriveId(Long placementDriveId) { this.placementDriveId = placementDriveId; }
    public String getDriveTitle() { return driveTitle; }
    public void setDriveTitle(String driveTitle) { this.driveTitle = driveTitle; }
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getCompanyLogo() { return companyLogo; }
    public void setCompanyLogo(String companyLogo) { this.companyLogo = companyLogo; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
    public String getMatchExplanation() { return matchExplanation; }
    public void setMatchExplanation(String matchExplanation) { this.matchExplanation = matchExplanation; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public List<ApplicationHistoryDto> getHistory() { return history; }
    public void setHistory(List<ApplicationHistoryDto> history) { this.history = history; }
    public List<InterviewScheduleDto> getInterviews() { return interviews; }
    public void setInterviews(List<InterviewScheduleDto> interviews) { this.interviews = interviews; }
}

