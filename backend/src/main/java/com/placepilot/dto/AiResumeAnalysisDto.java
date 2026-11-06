package com.placepilot.dto;

import java.util.ArrayList;
import java.util.List;

public class AiResumeAnalysisDto {

    private int overallScore; // 0-100
    private int atsCompatibilityScore; // 0-100
    private int impactScore; // 0-100
    private String executiveSummary;
    private List<String> identifiedSkills = new ArrayList<>();
    private List<String> detectedEducation = new ArrayList<>();
    private List<String> detectedProjects = new ArrayList<>();
    private List<String> detectedExperience = new ArrayList<>();
    private List<String> keyStrengths = new ArrayList<>();
    private List<String> areasOfImprovement = new ArrayList<>();
    private List<String> recommendedKeywords = new ArrayList<>();
    private List<BulletPointSuggestion> bulletPointImprovements = new ArrayList<>();

    public static class BulletPointSuggestion {
        private String original;
        private String suggested;
        private String reason;

        public BulletPointSuggestion() {}

        public BulletPointSuggestion(String original, String suggested, String reason) {
            this.original = original;
            this.suggested = suggested;
            this.reason = reason;
        }

        public String getOriginal() { return original; }
        public void setOriginal(String original) { this.original = original; }
        public String getSuggested() { return suggested; }
        public void setSuggested(String suggested) { this.suggested = suggested; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }

    public AiResumeAnalysisDto() {}

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }
    public int getAtsCompatibilityScore() { return atsCompatibilityScore; }
    public void setAtsCompatibilityScore(int atsCompatibilityScore) { this.atsCompatibilityScore = atsCompatibilityScore; }
    public int getImpactScore() { return impactScore; }
    public void setImpactScore(int impactScore) { this.impactScore = impactScore; }
    public String getExecutiveSummary() { return executiveSummary; }
    public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }
    public List<String> getIdentifiedSkills() { return identifiedSkills; }
    public void setIdentifiedSkills(List<String> identifiedSkills) { this.identifiedSkills = identifiedSkills; }
    public List<String> getDetectedEducation() { return detectedEducation; }
    public void setDetectedEducation(List<String> detectedEducation) { this.detectedEducation = detectedEducation; }
    public List<String> getDetectedProjects() { return detectedProjects; }
    public void setDetectedProjects(List<String> detectedProjects) { this.detectedProjects = detectedProjects; }
    public List<String> getDetectedExperience() { return detectedExperience; }
    public void setDetectedExperience(List<String> detectedExperience) { this.detectedExperience = detectedExperience; }
    public List<String> getKeyStrengths() { return keyStrengths; }
    public void setKeyStrengths(List<String> keyStrengths) { this.keyStrengths = keyStrengths; }
    public List<String> getAreasOfImprovement() { return areasOfImprovement; }
    public void setAreasOfImprovement(List<String> areasOfImprovement) { this.areasOfImprovement = areasOfImprovement; }
    public List<String> getRecommendedKeywords() { return recommendedKeywords; }
    public void setRecommendedKeywords(List<String> recommendedKeywords) { this.recommendedKeywords = recommendedKeywords; }
    public List<BulletPointSuggestion> getBulletPointImprovements() { return bulletPointImprovements; }
    public void setBulletPointImprovements(List<BulletPointSuggestion> bulletPointImprovements) { this.bulletPointImprovements = bulletPointImprovements; }
}

