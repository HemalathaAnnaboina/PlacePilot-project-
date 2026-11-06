package com.placepilot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_analysis_results")
public class AiAnalysisResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id")
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placement_drive_id")
    private PlacementDrive placementDrive;

    @Column(nullable = false, length = 50)
    private String analysisType; // RESUME_ANALYSIS, JOB_MATCH, SKILL_GAP, PLACEMENT_INSIGHTS

    private Integer score; // Overall score (0-100)

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String detailsJson; // JSON payload storing full breakdown

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public AiAnalysisResult() {}

    public AiAnalysisResult(StudentProfile studentProfile, PlacementDrive placementDrive, String analysisType, Integer score, String summary, String detailsJson) {
        this.studentProfile = studentProfile;
        this.placementDrive = placementDrive;
        this.analysisType = analysisType;
        this.score = score;
        this.summary = summary;
        this.detailsJson = detailsJson;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public PlacementDrive getPlacementDrive() { return placementDrive; }
    public void setPlacementDrive(PlacementDrive placementDrive) { this.placementDrive = placementDrive; }
    public String getAnalysisType() { return analysisType; }
    public void setAnalysisType(String analysisType) { this.analysisType = analysisType; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getDetailsJson() { return detailsJson; }
    public void setDetailsJson(String detailsJson) { this.detailsJson = detailsJson; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

