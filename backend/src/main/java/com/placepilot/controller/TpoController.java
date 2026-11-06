package com.placepilot.controller;

import com.placepilot.dto.PlacementAnnouncementRequest;
import com.placepilot.dto.StudentProfileDto;
import com.placepilot.entity.PlacementAnnouncement;
import com.placepilot.security.UserPrincipal;
import com.placepilot.service.TpoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tpo")
@PreAuthorize("hasRole('TPO')")
public class TpoController {

    private final TpoService tpoService;

    public TpoController(TpoService tpoService) {
        this.tpoService = tpoService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(tpoService.getOverviewStats());
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentProfileDto>> getAllStudents() {
        return ResponseEntity.ok(tpoService.getAllStudents());
    }

    @PatchMapping("/students/{id}/verify")
    public ResponseEntity<StudentProfileDto> verifyStudent(@PathVariable Long id,
                                                           @RequestBody Map<String, Boolean> body) {
        boolean verified = body.getOrDefault("verified", true);
        return ResponseEntity.ok(tpoService.verifyStudent(id, verified));
    }

    @GetMapping("/recruiters")
    public ResponseEntity<List<Map<String, Object>>> getAllRecruiters() {
        return ResponseEntity.ok(tpoService.getAllRecruiters());
    }

    @PatchMapping("/recruiters/{id}/approve")
    public ResponseEntity<Map<String, String>> approveRecruiter(@PathVariable Long id,
                                                                @RequestBody Map<String, Boolean> body) {
        boolean approved = body.getOrDefault("approved", true);
        tpoService.approveRecruiter(id, approved);
        return ResponseEntity.ok(Map.of("message", "Recruiter status updated successfully"));
    }

    @PostMapping("/announcements")
    public ResponseEntity<PlacementAnnouncement> createAnnouncement(@Valid @RequestBody PlacementAnnouncementRequest request,
                                                                   @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(tpoService.createAnnouncement(request, principal.getFullName()));
    }

    @GetMapping("/announcements")
    public ResponseEntity<List<PlacementAnnouncement>> getAnnouncements(@RequestParam(required = false) String audience) {
        return ResponseEntity.ok(tpoService.getAnnouncements(audience));
    }
}

