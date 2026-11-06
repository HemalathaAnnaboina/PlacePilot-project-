package com.placepilot.service;

import com.placepilot.dto.*;
import com.placepilot.entity.*;
import com.placepilot.exception.BadRequestException;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.*;
import com.placepilot.security.JwtService;
import com.placepilot.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       StudentProfileRepository studentProfileRepository,
                       RecruiterProfileRepository recruiterProfileRepository,
                       CompanyRepository companyRepository,
                       SkillRepository skillRepository,
                       StudentSkillRepository studentSkillRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.companyRepository = companyRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        UserPrincipal principal = new UserPrincipal(user);
        String token = jwtService.generateToken(principal);

        AuthResponse response = new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole());

        if (user.getRole() == Role.STUDENT) {
            studentProfileRepository.findByUserId(user.getId()).ifPresent(profile -> {
                response.setStudentProfileId(profile.getId());
            });
        } else if (user.getRole() == Role.RECRUITER) {
            recruiterProfileRepository.findByUserId(user.getId()).ifPresent(profile -> {
                response.setRecruiterProfileId(profile.getId());
                if (profile.getCompany() != null) {
                    response.setCompanyId(profile.getCompany().getId());
                    response.setCompanyName(profile.getCompany().getName());
                }
            });
        }

        return response;
    }

    @Transactional
    public AuthResponse registerStudent(StudentRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with this email already exists: " + request.getEmail());
        }
        if (studentProfileRepository.existsByRollNumber(request.getRollNumber())) {
            throw new BadRequestException("A student profile with roll number " + request.getRollNumber() + " already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(Role.STUDENT);
        user = userRepository.save(user);

        StudentProfile profile = new StudentProfile();
        profile.setUser(user);
        profile.setRollNumber(request.getRollNumber().trim().toUpperCase());
        profile.setBranch(request.getBranch().trim().toUpperCase());
        profile.setCgpa(request.getCgpa());
        profile.setGraduationYear(request.getGraduationYear());
        profile.setActiveBacklogs(request.getActiveBacklogs() != null ? request.getActiveBacklogs() : 0);
        profile.setPhone(request.getPhone());
        profile = studentProfileRepository.save(profile);

        if (request.getSkills() != null) {
            for (String skillName : request.getSkills()) {
                if (skillName != null && !skillName.trim().isEmpty()) {
                    String clean = skillName.trim();
                    Skill skill = skillRepository.findByNameIgnoreCase(clean)
                            .orElseGet(() -> skillRepository.save(new Skill(clean, "General")));
                    StudentSkill studentSkill = new StudentSkill(profile, skill, "Intermediate");
                    studentSkillRepository.save(studentSkill);
                    profile.addSkill(studentSkill);
                }
            }
        }

        UserPrincipal principal = new UserPrincipal(user);
        String token = jwtService.generateToken(principal);

        AuthResponse response = new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole());
        response.setStudentProfileId(profile.getId());
        return response;
    }

    @Transactional
    public AuthResponse registerRecruiter(RecruiterRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with this email already exists: " + request.getEmail());
        }

        Company company = companyRepository.findByNameIgnoreCase(request.getCompanyName().trim())
                .orElseGet(() -> {
                    Company c = new Company();
                    c.setName(request.getCompanyName().trim());
                    c.setWebsite(request.getCompanyWebsite());
                    c.setIndustry(request.getIndustry() != null ? request.getIndustry() : "Technology");
                    c.setDescription(request.getCompanyDescription());
                    c.setLocation(request.getCompanyLocation());
                    return companyRepository.save(c);
                });

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(Role.RECRUITER);
        user = userRepository.save(user);

        RecruiterProfile recruiterProfile = new RecruiterProfile(
                user, company, request.getDesignation(), request.getEmail(), request.getPhone()
        );
        recruiterProfile = recruiterProfileRepository.save(recruiterProfile);

        UserPrincipal principal = new UserPrincipal(user);
        String token = jwtService.generateToken(principal);

        AuthResponse response = new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole());
        response.setRecruiterProfileId(recruiterProfile.getId());
        response.setCompanyId(company.getId());
        response.setCompanyName(company.getName());
        return response;
    }
}

