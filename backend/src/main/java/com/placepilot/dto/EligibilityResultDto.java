package com.placepilot.dto;

import java.util.ArrayList;
import java.util.List;

public class EligibilityResultDto {

    private boolean eligible;
    private String status; // "ELIGIBLE" or "NOT_ELIGIBLE"
    private String driveTitle;
    private String companyName;
    private List<CriterionDetail> criteria = new ArrayList<>();
    private List<String> ineligibilityReasons = new ArrayList<>();
    private String summaryMessage;

    public static class CriterionDetail {
        private String criterionName;
        private boolean passed;
        private String studentValue;
        private String requiredValue;
        private String message;

        public CriterionDetail() {}

        public CriterionDetail(String criterionName, boolean passed, String studentValue, String requiredValue, String message) {
            this.criterionName = criterionName;
            this.passed = passed;
            this.studentValue = studentValue;
            this.requiredValue = requiredValue;
            this.message = message;
        }

        public String getCriterionName() { return criterionName; }
        public void setCriterionName(String criterionName) { this.criterionName = criterionName; }
        public boolean isPassed() { return passed; }
        public void setPassed(boolean passed) { this.passed = passed; }
        public String getStudentValue() { return studentValue; }
        public void setStudentValue(String studentValue) { this.studentValue = studentValue; }
        public String getRequiredValue() { return requiredValue; }
        public void setRequiredValue(String requiredValue) { this.requiredValue = requiredValue; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    public EligibilityResultDto() {}

    public void addCriterion(String criterionName, boolean passed, String studentValue, String requiredValue, String message) {
        criteria.add(new CriterionDetail(criterionName, passed, studentValue, requiredValue, message));
        if (!passed) {
            ineligibilityReasons.add(message);
        }
    }

    public boolean isEligible() { return eligible; }
    public void setEligible(boolean eligible) {
        this.eligible = eligible;
        this.status = eligible ? "ELIGIBLE" : "NOT_ELIGIBLE";
    }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDriveTitle() { return driveTitle; }
    public void setDriveTitle(String driveTitle) { this.driveTitle = driveTitle; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public List<CriterionDetail> getCriteria() { return criteria; }
    public void setCriteria(List<CriterionDetail> criteria) { this.criteria = criteria; }
    public List<String> getIneligibilityReasons() { return ineligibilityReasons; }
    public void setIneligibilityReasons(List<String> ineligibilityReasons) { this.ineligibilityReasons = ineligibilityReasons; }
    public String getSummaryMessage() { return summaryMessage; }
    public void setSummaryMessage(String summaryMessage) { this.summaryMessage = summaryMessage; }
}

