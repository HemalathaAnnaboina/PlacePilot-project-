package com.placepilot.dto;

import java.util.ArrayList;
import java.util.List;

public class MockInterviewQuestionDto {

    private Long sessionId;
    private String targetRole;
    private List<QuestionItem> questions = new ArrayList<>();

    public static class QuestionItem {
        private int questionNumber;
        private String questionText;
        private String category; // Technical, Problem Solving, System Architecture, Behavioral
        private String tips;

        public QuestionItem() {}

        public QuestionItem(int questionNumber, String questionText, String category, String tips) {
            this.questionNumber = questionNumber;
            this.questionText = questionText;
            this.category = category;
            this.tips = tips;
        }

        public int getQuestionNumber() { return questionNumber; }
        public void setQuestionNumber(int questionNumber) { this.questionNumber = questionNumber; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getTips() { return tips; }
        public void setTips(String tips) { this.tips = tips; }
    }

    public MockInterviewQuestionDto() {}

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public List<QuestionItem> getQuestions() { return questions; }
    public void setQuestions(List<QuestionItem> questions) { this.questions = questions; }
}

