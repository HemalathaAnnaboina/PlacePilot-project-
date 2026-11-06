package com.placepilot.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class MockInterviewSubmitRequest {

    @NotNull(message = "Session ID is required")
    private Long sessionId;

    @NotEmpty(message = "Answers cannot be empty")
    private List<AnswerSubmission> answers;

    public static class AnswerSubmission {
        private int questionNumber;
        private String studentAnswer;

        public AnswerSubmission() {}

        public AnswerSubmission(int questionNumber, String studentAnswer) {
            this.questionNumber = questionNumber;
            this.studentAnswer = studentAnswer;
        }

        public int getQuestionNumber() { return questionNumber; }
        public void setQuestionNumber(int questionNumber) { this.questionNumber = questionNumber; }
        public String getStudentAnswer() { return studentAnswer; }
        public void setStudentAnswer(String studentAnswer) { this.studentAnswer = studentAnswer; }
    }

    public MockInterviewSubmitRequest() {}

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
    public List<AnswerSubmission> getAnswers() { return answers; }
    public void setAnswers(List<AnswerSubmission> answers) { this.answers = answers; }
}

