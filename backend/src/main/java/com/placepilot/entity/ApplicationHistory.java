package com.placepilot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "application_history")
public class ApplicationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Application application;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ApplicationStatus fromStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ApplicationStatus toStatus;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(length = 100)
    private String updatedBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ApplicationHistory() {}

    public ApplicationHistory(Application application, ApplicationStatus fromStatus, ApplicationStatus toStatus, String remarks, String updatedBy) {
        this.application = application;
        this.fromStatus = fromStatus;
        this.toStatus = toStatus;
        this.remarks = remarks;
        this.updatedBy = updatedBy;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Application getApplication() { return application; }
    public void setApplication(Application application) { this.application = application; }
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

