package com.placepilot.dto;

import jakarta.validation.constraints.NotNull;

public class ApplicationRequest {

    @NotNull(message = "Placement drive ID is required")
    private Long placementDriveId;

    private String notes;

    public ApplicationRequest() {}

    public ApplicationRequest(Long placementDriveId, String notes) {
        this.placementDriveId = placementDriveId;
        this.notes = notes;
    }

    public Long getPlacementDriveId() { return placementDriveId; }
    public void setPlacementDriveId(Long placementDriveId) { this.placementDriveId = placementDriveId; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}

