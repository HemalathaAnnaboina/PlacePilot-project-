package com.placepilot.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class PlacementDriveRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Role name is required")
    private String roleName;

    private Long companyId;

    @NotBlank(message = "Job description is required")
    private String jobDescription;

    private String jobLocation;

    @NotNull(message = "Package LPA is required")
    @DecimalMin(value = "0.1", message = "Package must be greater than 0")
    private Double packageLpa;

    @NotNull(message = "Minimum CGPA is required")
    private Double minCgpa;

    @NotBlank(message = "Eligible branches are required")
    private String eligibleBranches; // e.g. "CSE, IT, ECE"

    @NotNull(message = "Maximum backlogs allowed is required")
    private Integer maxBacklogsAllowed;

    @NotNull(message = "Graduation year is required")
    private Integer graduationYear;

    private String requiredSkills; // e.g. "Java, Spring Boot, React, SQL"

    private LocalDate driveDate;

    private LocalDateTime applicationDeadline;

    private String status = "ACTIVE"; // ACTIVE, DRAFT, CLOSED

    public PlacementDriveRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    public String getJobLocation() { return jobLocation; }
    public void setJobLocation(String jobLocation) { this.jobLocation = jobLocation; }
    public Double getPackageLpa() { return packageLpa; }
    public void setPackageLpa(Double packageLpa) { this.packageLpa = packageLpa; }
    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
    public String getEligibleBranches() { return eligibleBranches; }
    public void setEligibleBranches(String eligibleBranches) { this.eligibleBranches = eligibleBranches; }
    public Integer getMaxBacklogsAllowed() { return maxBacklogsAllowed; }
    public void setMaxBacklogsAllowed(Integer maxBacklogsAllowed) { this.maxBacklogsAllowed = maxBacklogsAllowed; }
    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }
    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }
    public LocalDate getDriveDate() { return driveDate; }
    public void setDriveDate(LocalDate driveDate) { this.driveDate = driveDate; }
    public LocalDateTime getApplicationDeadline() { return applicationDeadline; }
    public void setApplicationDeadline(LocalDateTime applicationDeadline) { this.applicationDeadline = applicationDeadline; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

