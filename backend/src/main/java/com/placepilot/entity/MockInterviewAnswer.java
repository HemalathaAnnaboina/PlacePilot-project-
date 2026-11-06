package com.placepilot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "mock_interview_answers")
public class MockInterviewAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    @JsonIgnore
    private MockInterviewSession session;

    @Column(nullable = false)
    private Integer questionNumber;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @Column(length = 50)
    private String questionCategory; // Technical, Problem Solving, System Architecture, Behavioral

    @Column(columnDefinition = "TEXT")
    private String studentAnswer;

    private Integer score; // 0-100

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(columnDefinition = "TEXT")
    private String improvementSuggestions;

    @Column(columnDefinition = "TEXT")
    private String modelAnswer;

    public MockInterviewAnswer() {}

    public MockInterviewAnswer(MockInterviewSession session, Integer questionNumber, String questionText, String questionCategory, String modelAnswer) {
        this.session = session;
        this.questionNumber = questionNumber;
        this.questionText = questionText;
        this.questionCategory = questionCategory;
        this.modelAnswer = modelAnswer;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public MockInterviewSession getSession() { return session; }
    public void setSession(MockInterviewSession session) { this.session = session; }
    public Integer getQuestionNumber() { return questionNumber; }
    public void setQuestionNumber(Integer questionNumber) { this.questionNumber = questionNumber; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public String getQuestionCategory() { return questionCategory; }
    public void setQuestionCategory(String questionCategory) { this.questionCategory = questionCategory; }
    public String getStudentAnswer() { return studentAnswer; }
    public void setStudentAnswer(String studentAnswer) { this.studentAnswer = studentAnswer; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
    public String getImprovementSuggestions() { return improvementSuggestions; }
    public void setImprovementSuggestions(String improvementSuggestions) { this.improvementSuggestions = improvementSuggestions; }
    public String getModelAnswer() { return modelAnswer; }
    public void setModelAnswer(String modelAnswer) { this.modelAnswer = modelAnswer; }
}

