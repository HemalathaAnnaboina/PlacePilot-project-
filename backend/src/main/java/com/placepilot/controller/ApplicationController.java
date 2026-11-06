package com.placepilot.controller;

import com.placepilot.dto.*;
import com.placepilot.security.UserPrincipal;
import com.placepilot.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApplicationDto> apply(@Valid @RequestBody ApplicationRequest request,
                                                @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(applicationService.apply(principal.getId(), request));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('RECRUITER', 'TPO')")
    public ResponseEntity<ApplicationDto> updateStatus(@PathVariable Long id,
                                                       @Valid @RequestBody ApplicationStatusUpdateRequest request,
                                                       @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(applicationService.updateStatus(id, request, principal.getFullName()));
    }

    @PostMapping("/{id}/interviews")
    @PreAuthorize("hasAnyRole('RECRUITER', 'TPO')")
    public ResponseEntity<InterviewScheduleDto> scheduleInterview(@PathVariable Long id,
                                                                 @Valid @RequestBody InterviewScheduleRequest request) {
        return ResponseEntity.ok(applicationService.scheduleInterview(id, request));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ApplicationDto>> getMyApplications(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(applicationService.getStudentApplications(principal.getId()));
    }

    @GetMapping("/drive/{driveId}")
    @PreAuthorize("hasAnyRole('RECRUITER', 'TPO')")
    public ResponseEntity<List<ApplicationDto>> getDriveApplicants(@PathVariable Long driveId) {
        return ResponseEntity.ok(applicationService.getDriveApplicants(driveId));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('TPO')")
    public ResponseEntity<List<ApplicationDto>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDto> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }
}

