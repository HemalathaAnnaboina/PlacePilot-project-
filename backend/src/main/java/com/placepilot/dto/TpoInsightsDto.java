package com.placepilot.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TpoInsightsDto {

    private long totalRegisteredStudents;
    private long totalDrivesConducted;
    private long totalApplicationsSubmitted;
    private long totalStudentsPlaced;
    private double overallPlacementRate; // Percentage
    private double averagePackageLpa;
    private double highestPackageLpa;

    private List<SkillDemandInsight> topInDemandSkills = new ArrayList<>();
    private List<BranchReadinessInsight> branchReadinessMetrics = new ArrayList<>();
    private List<String> keyTrends = new ArrayList<>();
    private List<String> strategicRecommendations = new ArrayList<>();
    private Map<String, Long> applicationFunnel;

    public static class SkillDemandInsight {
        private String skillName;
        private int driveCount;
        private double percentageDemand;
        private String trend; // "RISING", "HIGH", "STEADY"

        public SkillDemandInsight() {}

        public SkillDemandInsight(String skillName, int driveCount, double percentageDemand, String trend) {
            this.skillName = skillName;
            this.driveCount = driveCount;
            this.percentageDemand = percentageDemand;
            this.trend = trend;
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public int getDriveCount() { return driveCount; }
        public void setDriveCount(int driveCount) { this.driveCount = driveCount; }
        public double getPercentageDemand() { return percentageDemand; }
        public void setPercentageDemand(double percentageDemand) { this.percentageDemand = percentageDemand; }
        public String getTrend() { return trend; }
        public void setTrend(String trend) { this.trend = trend; }
    }

    public static class BranchReadinessInsight {
        private String branch;
        private long totalStudents;
        private long eligibleStudents;
        private double averageCgpa;
        private double readinessScore; // 0-100%

        public BranchReadinessInsight() {}

        public BranchReadinessInsight(String branch, long totalStudents, long eligibleStudents, double averageCgpa, double readinessScore) {
            this.branch = branch;
            this.totalStudents = totalStudents;
            this.eligibleStudents = eligibleStudents;
            this.averageCgpa = averageCgpa;
            this.readinessScore = readinessScore;
        }

        public String getBranch() { return branch; }
        public void setBranch(String branch) { this.branch = branch; }
        public long getTotalStudents() { return totalStudents; }
        public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }
        public long getEligibleStudents() { return eligibleStudents; }
        public void setEligibleStudents(long eligibleStudents) { this.eligibleStudents = eligibleStudents; }
        public double getAverageCgpa() { return averageCgpa; }
        public void setAverageCgpa(double averageCgpa) { this.averageCgpa = averageCgpa; }
        public double getReadinessScore() { return readinessScore; }
        public void setReadinessScore(double readinessScore) { this.readinessScore = readinessScore; }
    }

    public TpoInsightsDto() {}

    public long getTotalRegisteredStudents() { return totalRegisteredStudents; }
    public void setTotalRegisteredStudents(long totalRegisteredStudents) { this.totalRegisteredStudents = totalRegisteredStudents; }
    public long getTotalDrivesConducted() { return totalDrivesConducted; }
    public void setTotalDrivesConducted(long totalDrivesConducted) { this.totalDrivesConducted = totalDrivesConducted; }
    public long getTotalApplicationsSubmitted() { return totalApplicationsSubmitted; }
    public void setTotalApplicationsSubmitted(long totalApplicationsSubmitted) { this.totalApplicationsSubmitted = totalApplicationsSubmitted; }
    public long getTotalStudentsPlaced() { return totalStudentsPlaced; }
    public void setTotalStudentsPlaced(long totalStudentsPlaced) { this.totalStudentsPlaced = totalStudentsPlaced; }
    public double getOverallPlacementRate() { return overallPlacementRate; }
    public void setOverallPlacementRate(double overallPlacementRate) { this.overallPlacementRate = overallPlacementRate; }
    public double getAveragePackageLpa() { return averagePackageLpa; }
    public void setAveragePackageLpa(double averagePackageLpa) { this.averagePackageLpa = averagePackageLpa; }
    public double getHighestPackageLpa() { return highestPackageLpa; }
    public void setHighestPackageLpa(double highestPackageLpa) { this.highestPackageLpa = highestPackageLpa; }
    public List<SkillDemandInsight> getTopInDemandSkills() { return topInDemandSkills; }
    public void setTopInDemandSkills(List<SkillDemandInsight> topInDemandSkills) { this.topInDemandSkills = topInDemandSkills; }
    public List<BranchReadinessInsight> getBranchReadinessMetrics() { return branchReadinessMetrics; }
    public void setBranchReadinessMetrics(List<BranchReadinessInsight> branchReadinessMetrics) { this.branchReadinessMetrics = branchReadinessMetrics; }
    public List<String> getKeyTrends() { return keyTrends; }
    public void setKeyTrends(List<String> keyTrends) { this.keyTrends = keyTrends; }
    public List<String> getStrategicRecommendations() { return strategicRecommendations; }
    public void setStrategicRecommendations(List<String> strategicRecommendations) { this.strategicRecommendations = strategicRecommendations; }
    public Map<String, Long> getApplicationFunnel() { return applicationFunnel; }
    public void setApplicationFunnel(Map<String, Long> applicationFunnel) { this.applicationFunnel = applicationFunnel; }
}

