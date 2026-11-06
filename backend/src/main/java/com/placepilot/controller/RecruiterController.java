package com.placepilot.controller;

import com.placepilot.dto.ApplicationDto;
import com.placepilot.dto.CompanyDto;
import com.placepilot.dto.PlacementDriveDto;
import com.placepilot.security.UserPrincipal;
import com.placepilot.service.ApplicationService;
import com.placepilot.service.RecruiterService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recruiter")
@PreAuthorize("hasRole('RECRUITER')")
public class RecruiterController {

    private final RecruiterService recruiterService;
    private final ApplicationService applicationService;

    public RecruiterController(RecruiterService recruiterService, ApplicationService applicationService) {
        this.recruiterService = recruiterService;
        this.applicationService = applicationService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(recruiterService.getRecruiterProfile(principal.getId()));
    }

    @PutMapping("/company/{companyId}")
    public ResponseEntity<CompanyDto> updateCompany(@PathVariable Long companyId,
                                                    @RequestBody CompanyDto dto) {
        return ResponseEntity.ok(recruiterService.updateCompany(companyId, dto));
    }

    @GetMapping("/drives")
    public ResponseEntity<List<PlacementDriveDto>> getMyDrives(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(recruiterService.getMyDrives(principal.getId()));
    }

    @GetMapping("/drives/{driveId}/applicants")
    public ResponseEntity<List<ApplicationDto>> getDriveApplicants(@PathVariable Long driveId) {
        return ResponseEntity.ok(applicationService.getDriveApplicants(driveId));
    }
}

