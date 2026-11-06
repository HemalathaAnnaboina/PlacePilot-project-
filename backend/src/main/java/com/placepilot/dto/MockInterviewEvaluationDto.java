package com.placepilot.dto;

import java.util.ArrayList;
import java.util.List;

public class MockInterviewEvaluationDto {

    private Long sessionId;
    private String targetRole;
    private int overallScore; // 0-100
    private String overallFeedback;
    private List<QuestionReview> questionReviews = new ArrayList<>();
    private List<String> topStrengths = new ArrayList<>();
    private List<String> prioritizedImprovements = new ArrayList<>();

    public static class QuestionReview {
        private int questionNumber;
        private String questionText;
        private String category;
        private String studentAnswer;
        private int score;
        private String feedback;
        private String improvementSuggestions;
        private String modelAnswer;

        public QuestionReview() {}

        public QuestionReview(int questionNumber, String questionText, String category, String studentAnswer, int score, String feedback, String improvementSuggestions, String modelAnswer) {
            this.questionNumber = questionNumber;
            this.questionText = questionText;
            this.category = category;
            this.studentAnswer = studentAnswer;
            this.score = score;
            this.feedback = feedback;
            this.improvementSuggestions = improvementSuggestions;
            this.modelAnswer = modelAnswer;
        }

        public int getQuestionNumber() { return questionNumber; }
        public void setQuestionNumber(int questionNumber) { this.questionNumber = questionNumber; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getStudentAnswer() { return studentAnswer; }
        public void setStudentAnswer(String studentAnswer) { this.studentAnswer = studentAnswer; }
        public int getScore() { return score; }
        public void setScore(int score) { this.score = score; }
        public String getFeedback() { return feedback; }
        public void setFeedback(String feedback) { this.feedback = feedback; }
        public String getImprovementSuggestions() { return improvementSuggestions; }
        public void setImprovementSuggestions(String improvementSuggestions) { this.improvementSuggestions = improvementSuggestions; }
        public String getModelAnswer() { return modelAnswer; }
        public void setModelAnswer(String modelAnswer) { this.modelAnswer = modelAnswer; }
    }

    public MockInterviewEvaluationDto() {}

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }
    public String getOverallFeedback() { return overallFeedback; }
    public void setOverallFeedback(String overallFeedback) { this.overallFeedback = overallFeedback; }
    public List<QuestionReview> getQuestionReviews() { return questionReviews; }
    public void setQuestionReviews(List<QuestionReview> questionReviews) { this.questionReviews = questionReviews; }
    public List<String> getTopStrengths() { return topStrengths; }
    public void setTopStrengths(List<String> topStrengths) { this.topStrengths = topStrengths; }
    public List<String> getPrioritizedImprovements() { return prioritizedImprovements; }
    public void setPrioritizedImprovements(List<String> prioritizedImprovements) { this.prioritizedImprovements = prioritizedImprovements; }
}

