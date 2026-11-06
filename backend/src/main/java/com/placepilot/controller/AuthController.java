package com.placepilot.controller;

import com.placepilot.dto.AuthRequest;
import com.placepilot.dto.AuthResponse;
import com.placepilot.dto.RecruiterRegisterRequest;
import com.placepilot.dto.StudentRegisterRequest;
import com.placepilot.security.UserPrincipal;
import com.placepilot.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register/student")
    public ResponseEntity<AuthResponse> registerStudent(@Valid @RequestBody StudentRegisterRequest request) {
        return ResponseEntity.ok(authService.registerStudent(request));
    }

    @PostMapping("/register/recruiter")
    public ResponseEntity<AuthResponse> registerRecruiter(@Valid @RequestBody RecruiterRegisterRequest request) {
        return ResponseEntity.ok(authService.registerRecruiter(request));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("id", principal.getId());
        map.put("email", principal.getUsername());
        map.put("fullName", principal.getFullName());
        map.put("role", principal.getRole().name());
        return ResponseEntity.ok(map);
    }
}

