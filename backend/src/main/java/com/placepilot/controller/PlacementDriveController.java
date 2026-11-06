package com.placepilot.controller;

import com.placepilot.dto.EligibilityResultDto;
import com.placepilot.dto.PlacementDriveDto;
import com.placepilot.dto.PlacementDriveRequest;
import com.placepilot.entity.PlacementDrive;
import com.placepilot.entity.RecruiterProfile;
import com.placepilot.entity.StudentProfile;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.PlacementDriveRepository;
import com.placepilot.repository.RecruiterProfileRepository;
import com.placepilot.repository.StudentProfileRepository;
import com.placepilot.security.UserPrincipal;
import com.placepilot.service.EligibilityEngineService;
import com.placepilot.service.PlacementDriveService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
public class PlacementDriveController {

    private final PlacementDriveService driveService;
    private final PlacementDriveRepository driveRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final EligibilityEngineService eligibilityEngine;

    public PlacementDriveController(PlacementDriveService driveService,
                                    PlacementDriveRepository driveRepository,
                                    StudentProfileRepository studentProfileRepository,
                                    RecruiterProfileRepository recruiterProfileRepository,
                                    EligibilityEngineService eligibilityEngine) {
        this.driveService = driveService;
        this.driveRepository = driveRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.eligibilityEngine = eligibilityEngine;
    }

    @GetMapping
    public ResponseEntity<List<PlacementDriveDto>> getAllDrives() {
        return ResponseEntity.ok(driveService.getAllDrives());
    }

    @GetMapping("/active")
    public ResponseEntity<List<PlacementDriveDto>> getActiveDrives() {
        return ResponseEntity.ok(driveService.getActiveDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlacementDriveDto> getDriveById(@PathVariable Long id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<PlacementDriveDto>> getDrivesForStudent(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(driveService.getDrivesForStudent(principal.getId()));
    }

    @GetMapping("/{id}/eligibility")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EligibilityResultDto> checkEligibility(@PathVariable Long id,
                                                                 @AuthenticationPrincipal UserPrincipal principal) {
        StudentProfile student = studentProfileRepository.findByUserId(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        PlacementDrive drive = driveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Placement drive not found with ID: " + id));

        EligibilityResultDto result = eligibilityEngine.evaluateEligibility(student, drive);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('TPO', 'RECRUITER')")
    public ResponseEntity<PlacementDriveDto> createDrive(@Valid @RequestBody PlacementDriveRequest request,
                                                         @AuthenticationPrincipal UserPrincipal principal) {
        Long companyId = request.getCompanyId();
        if (companyId == null && principal.getRole() == com.placepilot.entity.Role.RECRUITER) {
            RecruiterProfile rec = recruiterProfileRepository.findByUserId(principal.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));
            companyId = rec.getCompany().getId();
        }
        return ResponseEntity.ok(driveService.createDrive(request, companyId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('TPO', 'RECRUITER')")
    public ResponseEntity<PlacementDriveDto> updateDrive(@PathVariable Long id,
                                                         @Valid @RequestBody PlacementDriveRequest request) {
        return ResponseEntity.ok(driveService.updateDrive(id, request));
    }
}

