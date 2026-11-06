package com.placepilot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "applications", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_profile_id", "placement_drive_id"})
})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "placement_drive_id", nullable = false)
    private PlacementDrive placementDrive;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    private Integer matchScore; // Calculated job match score 0-100

    @Column(columnDefinition = "TEXT")
    private String matchExplanation;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("createdAt DESC")
    private List<ApplicationHistory> history = new ArrayList<>();

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("scheduledTime ASC")
    private List<InterviewSchedule> interviews = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedAt;

    private LocalDateTime updatedAt;

    public Application() {}

    public Application(StudentProfile studentProfile, PlacementDrive placementDrive) {
        this.studentProfile = studentProfile;
        this.placementDrive = placementDrive;
        this.status = ApplicationStatus.APPLIED;
    }

    @PrePersist
    protected void onCreate() {
        this.appliedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void addHistory(ApplicationHistory h) {
        history.add(h);
        h.setApplication(this);
    }

    public void addInterview(InterviewSchedule i) {
        interviews.add(i);
        i.setApplication(this);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public PlacementDrive getPlacementDrive() { return placementDrive; }
    public void setPlacementDrive(PlacementDrive placementDrive) { this.placementDrive = placementDrive; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
    public String getMatchExplanation() { return matchExplanation; }
    public void setMatchExplanation(String matchExplanation) { this.matchExplanation = matchExplanation; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public List<ApplicationHistory> getHistory() { return history; }
    public void setHistory(List<ApplicationHistory> history) { this.history = history; }
    public List<InterviewSchedule> getInterviews() { return interviews; }
    public void setInterviews(List<InterviewSchedule> interviews) { this.interviews = interviews; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

