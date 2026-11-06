package com.placepilot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_schedules")
public class InterviewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Application application;

    @Column(nullable = false, length = 100)
    private String roundName; // e.g. Technical Round 1, System Design, HR Interview

    @Column(nullable = false)
    private LocalDateTime scheduledTime;

    private String meetingLink;

    @Column(length = 150)
    private String location; // "Google Meet", "Conference Hall 3", etc.

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(columnDefinition = "TEXT")
    private String interviewerFeedback;

    @Column(length = 50)
    private String result; // PENDING, PASSED, FAILED

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public InterviewSchedule() {}

    public InterviewSchedule(Application application, String roundName, LocalDateTime scheduledTime, String meetingLink, String location, String instructions) {
        this.application = application;
        this.roundName = roundName;
        this.scheduledTime = scheduledTime;
        this.meetingLink = meetingLink;
        this.location = location;
        this.instructions = instructions;
        this.result = "PENDING";
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Application getApplication() { return application; }
    public void setApplication(Application application) { this.application = application; }
    public String getRoundName() { return roundName; }
    public void setRoundName(String roundName) { this.roundName = roundName; }
    public LocalDateTime getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(LocalDateTime scheduledTime) { this.scheduledTime = scheduledTime; }
    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }
    public String getInterviewerFeedback() { return interviewerFeedback; }
    public void setInterviewerFeedback(String interviewerFeedback) { this.interviewerFeedback = interviewerFeedback; }
    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

