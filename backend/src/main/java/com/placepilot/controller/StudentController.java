package com.placepilot.controller;

import com.placepilot.dto.StudentProfileDto;
import com.placepilot.security.UserPrincipal;
import com.placepilot.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileDto> getProfile(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(studentService.getProfileByUserId(principal.getId()));
    }

    @PutMapping("/profile")
    public ResponseEntity<StudentProfileDto> updateProfile(@AuthenticationPrincipal UserPrincipal principal,
                                                          @RequestBody StudentProfileDto dto) {
        return ResponseEntity.ok(studentService.updateProfile(principal.getId(), dto));
    }

    @PostMapping("/skills")
    public ResponseEntity<StudentProfileDto> addSkill(@AuthenticationPrincipal UserPrincipal principal,
                                                     @RequestBody Map<String, String> body) {
        String skill = body.get("skill");
        String level = body.getOrDefault("level", "Intermediate");
        return ResponseEntity.ok(studentService.addSkill(principal.getId(), skill, level));
    }

    @DeleteMapping("/skills/{skillId}")
    public ResponseEntity<StudentProfileDto> removeSkill(@AuthenticationPrincipal UserPrincipal principal,
                                                        @PathVariable Long skillId) {
        return ResponseEntity.ok(studentService.removeSkill(principal.getId(), skillId));
    }

    @PostMapping("/resume/upload")
    public ResponseEntity<StudentProfileDto> uploadResume(@AuthenticationPrincipal UserPrincipal principal,
                                                         @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(studentService.uploadResume(principal.getId(), file));
    }
}

