package com.placepilot.dto;

import java.util.ArrayList;
import java.util.List;

public class JobMatchResultDto {

    private Long placementDriveId;
    private String jobTitle;
    private String companyName;
    private int matchScore; // 0-100%
    private String matchTier; // "Excellent Match", "Strong Match", "Moderate Match", "Needs Upskilling"
    private String matchExplanation;
    private List<String> matchingSkills = new ArrayList<>();
    private List<String> missingSkills = new ArrayList<>();
    private List<String> matchStrengths = new ArrayList<>();
    private List<String> actionableRecommendations = new ArrayList<>();

    public JobMatchResultDto() {}

    public Long getPlacementDriveId() { return placementDriveId; }
    public void setPlacementDriveId(Long placementDriveId) { this.placementDriveId = placementDriveId; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public int getMatchScore() { return matchScore; }
    public void setMatchScore(int matchScore) { this.matchScore = matchScore; }
    public String getMatchTier() { return matchTier; }
    public void setMatchTier(String matchTier) { this.matchTier = matchTier; }
    public String getMatchExplanation() { return matchExplanation; }
    public void setMatchExplanation(String matchExplanation) { this.matchExplanation = matchExplanation; }
    public List<String> getMatchingSkills() { return matchingSkills; }
    public void setMatchingSkills(List<String> matchingSkills) { this.matchingSkills = matchingSkills; }
    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }
    public List<String> getMatchStrengths() { return matchStrengths; }
    public void setMatchStrengths(List<String> matchStrengths) { this.matchStrengths = matchStrengths; }
    public List<String> getActionableRecommendations() { return actionableRecommendations; }
    public void setActionableRecommendations(List<String> actionableRecommendations) { this.actionableRecommendations = actionableRecommendations; }
}

