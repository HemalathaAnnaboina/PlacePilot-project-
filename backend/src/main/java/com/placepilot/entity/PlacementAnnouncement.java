package com.placepilot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_announcements")
public class PlacementAnnouncement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false, length = 30)
    private String targetAudience = "ALL"; // ALL, STUDENTS, RECRUITERS

    @Column(nullable = false)
    private boolean pinned = false;

    @Column(length = 100)
    private String authorName;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public PlacementAnnouncement() {}

    public PlacementAnnouncement(String title, String content, String targetAudience, boolean pinned, String authorName) {
        this.title = title;
        this.content = content;
        this.targetAudience = targetAudience;
        this.pinned = pinned;
        this.authorName = authorName;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getTargetAudience() { return targetAudience; }
    public void setTargetAudience(String targetAudience) { this.targetAudience = targetAudience; }
    public boolean isPinned() { return pinned; }
    public void setPinned(boolean pinned) { this.pinned = pinned; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

