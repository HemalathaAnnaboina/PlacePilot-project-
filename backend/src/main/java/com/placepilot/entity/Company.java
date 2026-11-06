package com.placepilot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 120)
    private String name;

    private String website;

    @Column(length = 80)
    private String industry;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String logoUrl;

    @Column(length = 100)
    private String location;

    @Column(nullable = false)
    private boolean approved = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Company() {}

    public Company(String name, String website, String industry, String description, String location, String logoUrl) {
        this.name = name;
        this.website = website;
        this.industry = industry;
        this.description = description;
        this.location = location;
        this.logoUrl = logoUrl;
        this.approved = true;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

