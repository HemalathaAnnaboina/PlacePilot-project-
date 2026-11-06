package com.placepilot.dto;

import com.placepilot.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;

public class ApplicationStatusUpdateRequest {

    @NotNull(message = "Target status is required")
    private ApplicationStatus status;

    private String remarks;

    public ApplicationStatusUpdateRequest() {}

    public ApplicationStatusUpdateRequest(ApplicationStatus status, String remarks) {
        this.status = status;
        this.remarks = remarks;
    }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}

