package com.placepilot.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PlacementDriveDto {
    private Long id;
    private String title;
    private String roleName;
    private Long companyId;
    private String companyName;
    private String companyLogo;
    private String companyIndustry;
    private String jobDescription;
    private String jobLocation;
    private Double packageLpa;
    private Double minCgpa;
    private String eligibleBranches;
    private Integer maxBacklogsAllowed;
    private Integer graduationYear;
    private String requiredSkills;
    private LocalDate driveDate;
    private LocalDateTime applicationDeadline;
    private String status;
    private long totalApplicants;
    private LocalDateTime createdAt;

    // Student contextual info (if requested by student)
    private Boolean userApplied;
    private String userApplicationStatus;
    private Boolean userEligible;
    private String userEligibilityReason;
    private Integer matchScore;

    public PlacementDriveDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getCompanyLogo() { return companyLogo; }
    public void setCompanyLogo(String companyLogo) { this.companyLogo = companyLogo; }
    public String getCompanyIndustry() { return companyIndustry; }
    public void setCompanyIndustry(String companyIndustry) { this.companyIndustry = companyIndustry; }
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
    public long getTotalApplicants() { return totalApplicants; }
    public void setTotalApplicants(long totalApplicants) { this.totalApplicants = totalApplicants; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Boolean getUserApplied() { return userApplied; }
    public void setUserApplied(Boolean userApplied) { this.userApplied = userApplied; }
    public String getUserApplicationStatus() { return userApplicationStatus; }
    public void setUserApplicationStatus(String userApplicationStatus) { this.userApplicationStatus = userApplicationStatus; }
    public Boolean getUserEligible() { return userEligible; }
    public void setUserEligible(Boolean userEligible) { this.userEligible = userEligible; }
    public String getUserEligibilityReason() { return userEligibilityReason; }
    public void setUserEligibilityReason(String userEligibilityReason) { this.userEligibilityReason = userEligibilityReason; }
    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
}

