package com.placepilot.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class StudentProfileDto {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String rollNumber;
    private String branch;
    private Double cgpa;
    private Integer graduationYear;
    private Integer activeBacklogs;
    private Integer totalBacklogs;
    private String phone;
    private String bio;
    private String linkedInUrl;
    private String githubUrl;
    private String portfolioUrl;
    private String resumeUrl;
    private String resumeOriginalFilename;
    private LocalDateTime resumeUploadedAt;
    private boolean verified;
    private List<SkillDto> skills = new ArrayList<>();

    public StudentProfileDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    public Integer getGraduationYear() { return graduationYear; }
    public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }
    public Integer getActiveBacklogs() { return activeBacklogs; }
    public void setActiveBacklogs(Integer activeBacklogs) { this.activeBacklogs = activeBacklogs; }
    public Integer getTotalBacklogs() { return totalBacklogs; }
    public void setTotalBacklogs(Integer totalBacklogs) { this.totalBacklogs = totalBacklogs; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getLinkedInUrl() { return linkedInUrl; }
    public void setLinkedInUrl(String linkedInUrl) { this.linkedInUrl = linkedInUrl; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }
    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
    public String getResumeOriginalFilename() { return resumeOriginalFilename; }
    public void setResumeOriginalFilename(String resumeOriginalFilename) { this.resumeOriginalFilename = resumeOriginalFilename; }
    public LocalDateTime getResumeUploadedAt() { return resumeUploadedAt; }
    public void setResumeUploadedAt(LocalDateTime resumeUploadedAt) { this.resumeUploadedAt = resumeUploadedAt; }
    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }
    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }
}

