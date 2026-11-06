package com.placepilot.service;

import com.placepilot.dto.SkillDto;
import com.placepilot.dto.StudentProfileDto;
import com.placepilot.entity.Skill;
import com.placepilot.entity.StudentProfile;
import com.placepilot.entity.StudentSkill;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.SkillRepository;
import com.placepilot.repository.StudentProfileRepository;
import com.placepilot.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentProfileRepository studentProfileRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final ResumeParserService resumeParserService;
    private final AiService aiService;

    public StudentService(StudentProfileRepository studentProfileRepository,
                          SkillRepository skillRepository,
                          StudentSkillRepository studentSkillRepository,
                          ResumeParserService resumeParserService,
                          AiService aiService) {
        this.studentProfileRepository = studentProfileRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.resumeParserService = resumeParserService;
        this.aiService = aiService;
    }

    public StudentProfileDto getProfileByUserId(Long userId) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + userId));
        return toDto(profile);
    }

    public StudentProfileDto getProfileById(Long id) {
        StudentProfile profile = studentProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found with ID: " + id));
        return toDto(profile);
    }

    @Transactional
    public StudentProfileDto updateProfile(Long userId, StudentProfileDto dto) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        if (dto.getRollNumber() != null) profile.setRollNumber(dto.getRollNumber().trim().toUpperCase());
        if (dto.getBranch() != null) profile.setBranch(dto.getBranch().trim().toUpperCase());
        if (dto.getCgpa() != null) profile.setCgpa(dto.getCgpa());
        if (dto.getGraduationYear() != null) profile.setGraduationYear(dto.getGraduationYear());
        if (dto.getActiveBacklogs() != null) profile.setActiveBacklogs(dto.getActiveBacklogs());
        if (dto.getTotalBacklogs() != null) profile.setTotalBacklogs(dto.getTotalBacklogs());
        if (dto.getPhone() != null) profile.setPhone(dto.getPhone());
        if (dto.getBio() != null) profile.setBio(dto.getBio());
        if (dto.getLinkedInUrl() != null) profile.setLinkedInUrl(dto.getLinkedInUrl());
        if (dto.getGithubUrl() != null) profile.setGithubUrl(dto.getGithubUrl());
        if (dto.getPortfolioUrl() != null) profile.setPortfolioUrl(dto.getPortfolioUrl());

        profile = studentProfileRepository.save(profile);
        return toDto(profile);
    }

    @Transactional
    public StudentProfileDto addSkill(Long userId, String skillName, String proficiencyLevel) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        String clean = skillName.trim();
        Skill skill = skillRepository.findByNameIgnoreCase(clean)
                .orElseGet(() -> skillRepository.save(new Skill(clean, "Technical")));

        boolean exists = profile.getSkills().stream()
                .anyMatch(s -> s.getSkill().getId().equals(skill.getId()));

        if (!exists) {
            StudentSkill studentSkill = new StudentSkill(profile, skill, proficiencyLevel);
            studentSkillRepository.save(studentSkill);
            profile.addSkill(studentSkill);
        }

        return toDto(profile);
    }

    @Transactional
    public StudentProfileDto removeSkill(Long userId, Long skillId) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        profile.getSkills().removeIf(s -> s.getSkill().getId().equals(skillId));
        studentProfileRepository.save(profile);
        return toDto(profile);
    }

    @Transactional
    public StudentProfileDto uploadResume(Long userId, MultipartFile file) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        String extractedText = resumeParserService.extractTextFromPdf(file);
        profile.setResumeText(extractedText);
        profile.setResumeOriginalFilename(file.getOriginalFilename());
        profile.setResumeUrl("/uploads/resumes/" + profile.getId() + "_" + file.getOriginalFilename());
        profile.setResumeUploadedAt(LocalDateTime.now());

        profile = studentProfileRepository.save(profile);

        // Automatically trigger AI analysis in the background
        try {
            aiService.analyzeResume(profile.getId(), null);
        } catch (Exception ignored) {}

        return toDto(profile);
    }

    public StudentProfileDto toDto(StudentProfile p) {
        StudentProfileDto dto = new StudentProfileDto();
        dto.setId(p.getId());
        dto.setUserId(p.getUser().getId());
        dto.setFullName(p.getUser().getFullName());
        dto.setEmail(p.getUser().getEmail());
        dto.setRollNumber(p.getRollNumber());
        dto.setBranch(p.getBranch());
        dto.setCgpa(p.getCgpa());
        dto.setGraduationYear(p.getGraduationYear());
        dto.setActiveBacklogs(p.getActiveBacklogs());
        dto.setTotalBacklogs(p.getTotalBacklogs());
        dto.setPhone(p.getPhone());
        dto.setBio(p.getBio());
        dto.setLinkedInUrl(p.getLinkedInUrl());
        dto.setGithubUrl(p.getGithubUrl());
        dto.setPortfolioUrl(p.getPortfolioUrl());
        dto.setResumeUrl(p.getResumeUrl());
        dto.setResumeOriginalFilename(p.getResumeOriginalFilename());
        dto.setResumeUploadedAt(p.getResumeUploadedAt());
        dto.setVerified(p.isVerified());

        List<SkillDto> skillDtos = p.getSkills().stream().map(s -> new SkillDto(
                s.getSkill().getId(),
                s.getSkill().getName(),
                s.getSkill().getCategory(),
                s.getProficiencyLevel()
        )).collect(Collectors.toList());
        dto.setSkills(skillDtos);

        return dto;
    }
}

