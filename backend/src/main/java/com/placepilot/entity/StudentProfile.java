package com.placepilot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    @Column(nullable = false, unique = true, length = 50)
    private String rollNumber;

    @Column(nullable = false, length = 50)
    private String branch; // CSE, IT, ECE, EEE, MECH, etc.

    @Column(nullable = false)
    private Double cgpa;

    @Column(nullable = false)
    private Integer graduationYear;

    @Column(nullable = false)
    private Integer activeBacklogs = 0;

    @Column(nullable = false)
    private Integer totalBacklogs = 0;

    @Column(length = 20)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String linkedInUrl;
    private String githubUrl;
    private String portfolioUrl;

    private String resumeUrl;
    private String resumeOriginalFilename;

    @Column(columnDefinition = "TEXT")
    private String resumeText;

    private LocalDateTime resumeUploadedAt;

    @Column(nullable = false)
    private boolean verified = true;

    @OneToMany(mappedBy = "studentProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentSkill> skills = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StudentProfile() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Helpers
    public void addSkill(StudentSkill skill) {
        skills.add(skill);
        skill.setStudentProfile(this);
    }

    public void removeSkill(StudentSkill skill) {
        skills.remove(skill);
        skill.setStudentProfile(null);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
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
    public String getResumeText() { return resumeText; }
    public void setResumeText(String resumeText) { this.resumeText = resumeText; }
    public LocalDateTime getResumeUploadedAt() { return resumeUploadedAt; }
    public void setResumeUploadedAt(LocalDateTime resumeUploadedAt) { this.resumeUploadedAt = resumeUploadedAt; }
    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }
    public List<StudentSkill> getSkills() { return skills; }
    public void setSkills(List<StudentSkill> skills) { this.skills = skills; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

