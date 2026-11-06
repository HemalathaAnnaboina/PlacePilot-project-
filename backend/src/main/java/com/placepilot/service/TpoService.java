package com.placepilot.service;

import com.placepilot.dto.*;
import com.placepilot.entity.*;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TpoService {

    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final CompanyRepository companyRepository;
    private final PlacementDriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final PlacementAnnouncementRepository announcementRepository;
    private final StudentService studentService;

    public TpoService(StudentProfileRepository studentProfileRepository,
                      RecruiterProfileRepository recruiterProfileRepository,
                      CompanyRepository companyRepository,
                      PlacementDriveRepository driveRepository,
                      ApplicationRepository applicationRepository,
                      PlacementAnnouncementRepository announcementRepository,
                      StudentService studentService) {
        this.studentProfileRepository = studentProfileRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.companyRepository = companyRepository;
        this.driveRepository = driveRepository;
        this.applicationRepository = applicationRepository;
        this.announcementRepository = announcementRepository;
        this.studentService = studentService;
    }

    public Map<String, Object> getOverviewStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalStudents = studentProfileRepository.count();
        long placedStudents = applicationRepository.countPlacedStudents();
        long totalDrives = driveRepository.count();
        long totalCompanies = companyRepository.count();
        Double avgPackage = driveRepository.getAveragePackage();
        Double highestPackage = driveRepository.getHighestPackage();

        stats.put("totalStudents", totalStudents);
        stats.put("placedStudents", placedStudents);
        stats.put("placementRate", totalStudents > 0 ? Math.round(((double) placedStudents / totalStudents) * 1000.0) / 10.0 : 0.0);
        stats.put("totalDrives", totalDrives);
        stats.put("totalCompanies", totalCompanies);
        stats.put("averagePackage", avgPackage != null ? Math.round(avgPackage * 10.0) / 10.0 : 8.5);
        stats.put("highestPackage", highestPackage != null ? highestPackage : 24.0);

        // Branch Breakdown
        List<Object[]> branchCounts = studentProfileRepository.countByBranch();
        List<Map<String, Object>> branches = new ArrayList<>();
        for (Object[] row : branchCounts) {
            Map<String, Object> b = new HashMap<>();
            b.put("branch", row[0]);
            b.put("total", row[1]);
            branches.add(b);
        }
        stats.put("branchDistribution", branches);

        // Funnel
        List<Object[]> funnel = applicationRepository.countByStatusGroup();
        Map<String, Long> funnelMap = new HashMap<>();
        for (Object[] row : funnel) {
            funnelMap.put(row[0].toString(), (Long) row[1]);
        }
        stats.put("applicationFunnel", funnelMap);

        return stats;
    }

    public List<StudentProfileDto> getAllStudents() {
        return studentProfileRepository.findAll().stream()
                .map(studentService::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public StudentProfileDto verifyStudent(Long studentId, boolean verified) {
        StudentProfile student = studentProfileRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));
        student.setVerified(verified);
        student = studentProfileRepository.save(student);
        return studentService.toDto(student);
    }

    public List<Map<String, Object>> getAllRecruiters() {
        return recruiterProfileRepository.findAll().stream().map(r -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", r.getId());
            map.put("userId", r.getUser().getId());
            map.put("fullName", r.getUser().getFullName());
            map.put("email", r.getUser().getEmail());
            map.put("designation", r.getDesignation());
            map.put("phone", r.getPhone());
            map.put("approved", r.isApproved());
            if (r.getCompany() != null) {
                map.put("companyId", r.getCompany().getId());
                map.put("companyName", r.getCompany().getName());
                map.put("companyIndustry", r.getCompany().getIndustry());
            }
            return map;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void approveRecruiter(Long recruiterId, boolean approved) {
        RecruiterProfile recruiter = recruiterProfileRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with ID: " + recruiterId));
        recruiter.setApproved(approved);
        recruiterProfileRepository.save(recruiter);
    }

    @Transactional
    public PlacementAnnouncement createAnnouncement(PlacementAnnouncementRequest request, String authorName) {
        PlacementAnnouncement ann = new PlacementAnnouncement(
                request.getTitle(),
                request.getContent(),
                request.getTargetAudience(),
                request.isPinned(),
                authorName
        );
        return announcementRepository.save(ann);
    }

    public List<PlacementAnnouncement> getAnnouncements(String audience) {
        if (audience == null || audience.equalsIgnoreCase("ALL")) {
            return announcementRepository.findAllByOrderByPinnedDescCreatedAtDesc();
        }
        return announcementRepository.findByTargetAudienceInOrderByPinnedDescCreatedAtDesc(List.of("ALL", audience.toUpperCase()));
    }
}

