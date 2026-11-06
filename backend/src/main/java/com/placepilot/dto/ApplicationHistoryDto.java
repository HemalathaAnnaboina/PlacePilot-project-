package com.placepilot.dto;

import com.placepilot.entity.ApplicationStatus;
import java.time.LocalDateTime;

public class ApplicationHistoryDto {
    private Long id;
    private ApplicationStatus fromStatus;
    private ApplicationStatus toStatus;
    private String remarks;
    private String updatedBy;
    private LocalDateTime createdAt;

    public ApplicationHistoryDto() {}

    public ApplicationHistoryDto(Long id, ApplicationStatus fromStatus, ApplicationStatus toStatus, String remarks, String updatedBy, LocalDateTime createdAt) {
        this.id = id;
        this.fromStatus = fromStatus;
        this.toStatus = toStatus;
        this.remarks = remarks;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ApplicationStatus getFromStatus() { return fromStatus; }
    public void setFromStatus(ApplicationStatus fromStatus) { this.fromStatus = fromStatus; }
    public ApplicationStatus getToStatus() { return toStatus; }
    public void setToStatus(ApplicationStatus toStatus) { this.toStatus = toStatus; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

