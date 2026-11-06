package com.placepilot.dto;

import java.util.ArrayList;
import java.util.List;

public class SkillGapAnalysisDto {

    private String targetRole;
    private int currentReadinessPercentage; // 0-100%
    private List<String> currentSkills = new ArrayList<>();
    private List<String> requiredSkills = new ArrayList<>();
    private List<String> missingSkills = new ArrayList<>();
    private List<LearningModule> learningRoadmap = new ArrayList<>();
    private List<String> personalizedAdvice = new ArrayList<>();

    public static class LearningModule {
        private String skillName;
        private String priority; // High, Medium, Low
        private String estimatedTimeToLearn; // e.g. "1-2 weeks"
        private List<String> keyTopics = new ArrayList<>();
        private List<String> recommendedResources = new ArrayList<>();
        private String practicalProjectIdea;

        public LearningModule() {}

        public LearningModule(String skillName, String priority, String estimatedTimeToLearn, List<String> keyTopics, List<String> recommendedResources, String practicalProjectIdea) {
            this.skillName = skillName;
            this.priority = priority;
            this.estimatedTimeToLearn = estimatedTimeToLearn;
            this.keyTopics = keyTopics;
            this.recommendedResources = recommendedResources;
            this.practicalProjectIdea = practicalProjectIdea;
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getEstimatedTimeToLearn() { return estimatedTimeToLearn; }
        public void setEstimatedTimeToLearn(String estimatedTimeToLearn) { this.estimatedTimeToLearn = estimatedTimeToLearn; }
        public List<String> getKeyTopics() { return keyTopics; }
        public void setKeyTopics(List<String> keyTopics) { this.keyTopics = keyTopics; }
        public List<String> getRecommendedResources() { return recommendedResources; }
        public void setRecommendedResources(List<String> recommendedResources) { this.recommendedResources = recommendedResources; }
        public String getPracticalProjectIdea() { return practicalProjectIdea; }
        public void setPracticalProjectIdea(String practicalProjectIdea) { this.practicalProjectIdea = practicalProjectIdea; }
    }

    public SkillGapAnalysisDto() {}

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public int getCurrentReadinessPercentage() { return currentReadinessPercentage; }
    public void setCurrentReadinessPercentage(int currentReadinessPercentage) { this.currentReadinessPercentage = currentReadinessPercentage; }
    public List<String> getCurrentSkills() { return currentSkills; }
    public void setCurrentSkills(List<String> currentSkills) { this.currentSkills = currentSkills; }
    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }
    public List<LearningModule> getLearningRoadmap() { return learningRoadmap; }
    public void setLearningRoadmap(List<LearningModule> learningRoadmap) { this.learningRoadmap = learningRoadmap; }
    public List<String> getPersonalizedAdvice() { return personalizedAdvice; }
    public void setPersonalizedAdvice(List<String> personalizedAdvice) { this.personalizedAdvice = personalizedAdvice; }
}

