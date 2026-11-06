package com.placepilot.dto;

import java.time.LocalDateTime;

public class InterviewScheduleDto {
    private Long id;
    private Long applicationId;
    private String roundName;
    private LocalDateTime scheduledTime;
    private String meetingLink;
    private String location;
    private String instructions;
    private String interviewerFeedback;
    private String result;
    private LocalDateTime createdAt;

    public InterviewScheduleDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
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

