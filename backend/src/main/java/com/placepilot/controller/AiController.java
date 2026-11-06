package com.placepilot.controller;

import com.placepilot.dto.*;
import com.placepilot.entity.StudentProfile;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.StudentProfileRepository;
import com.placepilot.security.UserPrincipal;
import com.placepilot.service.AiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;
    private final StudentProfileRepository studentProfileRepository;

    public AiController(AiService aiService, StudentProfileRepository studentProfileRepository) {
        this.aiService = aiService;
        this.studentProfileRepository = studentProfileRepository;
    }

    @PostMapping("/resume/analyze")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<AiResumeAnalysisDto> analyzeResume(@AuthenticationPrincipal UserPrincipal principal,
                                                             @RequestParam(value = "jobId", required = false) Long jobId) {
        StudentProfile student = studentProfileRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        return ResponseEntity.ok(aiService.analyzeResume(student.getId(), jobId));
    }

    @GetMapping("/job-match/{driveId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<JobMatchResultDto> getJobMatch(@PathVariable Long driveId,
                                                         @AuthenticationPrincipal UserPrincipal principal) {
        StudentProfile student = studentProfileRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        return ResponseEntity.ok(aiService.calculateJobMatch(student.getId(), driveId));
    }

    @GetMapping("/skill-gap")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<SkillGapAnalysisDto> getSkillGap(@RequestParam(defaultValue = "Full Stack Java Developer") String role,
                                                           @AuthenticationPrincipal UserPrincipal principal) {
        StudentProfile student = studentProfileRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        return ResponseEntity.ok(aiService.analyzeSkillGap(student.getId(), role));
    }

    @PostMapping("/mock-interview/generate")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<MockInterviewQuestionDto> generateMockQuestions(@RequestBody Map<String, String> body,
                                                                          @AuthenticationPrincipal UserPrincipal principal) {
        StudentProfile student = studentProfileRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        String role = body.getOrDefault("role", "Full Stack Java Developer");
        return ResponseEntity.ok(aiService.generateMockQuestions(student.getId(), role));
    }

    @PostMapping("/mock-interview/evaluate")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<MockInterviewEvaluationDto> evaluateMockInterview(@Valid @RequestBody MockInterviewSubmitRequest request) {
        return ResponseEntity.ok(aiService.evaluateMockInterview(request));
    }

    @GetMapping("/tpo-insights")
    @PreAuthorize("hasAnyRole('TPO', 'RECRUITER')")
    public ResponseEntity<TpoInsightsDto> getTpoInsights() {
        return ResponseEntity.ok(aiService.generateTpoInsights());
    }
}

