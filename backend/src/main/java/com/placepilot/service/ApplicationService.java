package com.placepilot.service;

import com.placepilot.dto.*;
import com.placepilot.entity.*;
import com.placepilot.exception.BadRequestException;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationHistoryRepository historyRepository;
    private final InterviewScheduleRepository interviewRepository;
    private final PlacementDriveRepository driveRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final EligibilityEngineService eligibilityEngine;
    private final AiService aiService;
    private final NotificationService notificationService;

    public ApplicationService(ApplicationRepository applicationRepository,
                              ApplicationHistoryRepository historyRepository,
                              InterviewScheduleRepository interviewRepository,
                              PlacementDriveRepository driveRepository,
                              StudentProfileRepository studentProfileRepository,
                              EligibilityEngineService eligibilityEngine,
                              AiService aiService,
                              NotificationService notificationService) {
        this.applicationRepository = applicationRepository;
        this.historyRepository = historyRepository;
        this.interviewRepository = interviewRepository;
        this.driveRepository = driveRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.eligibilityEngine = eligibilityEngine;
        this.aiService = aiService;
        this.notificationService = notificationService;
    }

    @Transactional
    public ApplicationDto apply(Long userId, ApplicationRequest request) {
        StudentProfile student = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        PlacementDrive drive = driveRepository.findById(request.getPlacementDriveId())
                .orElseThrow(() -> new ResourceNotFoundException("Placement drive not found"));

        if (!"ACTIVE".equalsIgnoreCase(drive.getStatus())) {
            throw new BadRequestException("This placement drive is not currently accepting applications");
        }

        if (applicationRepository.existsByStudentProfileAndPlacementDrive(student, drive)) {
            throw new BadRequestException("You have already submitted an application for this placement drive");
        }

        // Deterministic Eligibility Check before allowing application
        EligibilityResultDto eligibility = eligibilityEngine.evaluateEligibility(student, drive);
        if (!eligibility.isEligible()) {
            throw new BadRequestException("Eligibility verification failed: " + eligibility.getSummaryMessage());
        }

        Application app = new Application(student, drive);
        app.setNotes(request.getNotes());

        // Calculate AI Job Match Score & Explanation
        try {
            JobMatchResultDto match = aiService.calculateJobMatch(student.getId(), drive.getId());
            app.setMatchScore(match.getMatchScore());
            app.setMatchExplanation(match.getMatchExplanation());
        } catch (Exception e) {
            app.setMatchScore(80);
        }

        app = applicationRepository.save(app);

        // Record Initial History Entry
        ApplicationHistory history = new ApplicationHistory(
                app, null, ApplicationStatus.APPLIED, "Application submitted by student", student.getUser().getFullName()
        );
        historyRepository.save(history);
        app.addHistory(history);

        // Send Student Notification
        notificationService.createNotification(
                student.getUser(),
                "Application Submitted Successfully",
                String.format("Your application for %s at %s has been received.", drive.getRoleName(), drive.getCompany().getName()),
                "SUCCESS",
                "/student/applications"
        );

        return toDto(app);
    }

    @Transactional
    public ApplicationDto updateStatus(Long applicationId, ApplicationStatusUpdateRequest request, String updatedByName) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));

        ApplicationStatus fromStatus = app.getStatus();
        ApplicationStatus toStatus = request.getStatus();

        if (fromStatus == toStatus) {
            return toDto(app);
        }

        app.setStatus(toStatus);
        app = applicationRepository.save(app);

        // Record Audit History
        ApplicationHistory history = new ApplicationHistory(
                app, fromStatus, toStatus, request.getRemarks(), updatedByName
        );
        historyRepository.save(history);
        app.addHistory(history);

        // Notify Student of Status Progress
        notificationService.createNotification(
                app.getStudentProfile().getUser(),
                "Application Status Updated: " + toStatus.name(),
                String.format("Your application for %s at %s moved to '%s'. Remarks: %s",
                        app.getPlacementDrive().getRoleName(),
                        app.getPlacementDrive().getCompany().getName(),
                        toStatus.name().replace('_', ' '),
                        request.getRemarks() != null ? request.getRemarks() : "No remarks provided"),
                toStatus == ApplicationStatus.SELECTED ? "SUCCESS" : "INFO",
                "/student/applications"
        );

        return toDto(app);
    }

    @Transactional
    public InterviewScheduleDto scheduleInterview(Long applicationId, InterviewScheduleRequest request) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));

        InterviewSchedule interview = new InterviewSchedule(
                app,
                request.getRoundName(),
                request.getScheduledTime(),
                request.getMeetingLink(),
                request.getLocation(),
                request.getInstructions()
        );
        interview = interviewRepository.save(interview);
        app.addInterview(interview);

        // Automatically update application stage if earlier than INTERVIEW_SCHEDULED
        if (app.getStatus() == ApplicationStatus.APPLIED || app.getStatus() == ApplicationStatus.UNDER_REVIEW || app.getStatus() == ApplicationStatus.SHORTLISTED) {
            ApplicationStatus fromStatus = app.getStatus();
            app.setStatus(ApplicationStatus.INTERVIEW_SCHEDULED);
            applicationRepository.save(app);

            ApplicationHistory history = new ApplicationHistory(
                    app, fromStatus, ApplicationStatus.INTERVIEW_SCHEDULED,
                    "Interview scheduled: " + request.getRoundName(), "Recruitment Team"
            );
            historyRepository.save(history);
        }

        // Notify Student
        notificationService.createNotification(
                app.getStudentProfile().getUser(),
                "Interview Scheduled: " + request.getRoundName(),
                String.format("An interview round '%s' has been scheduled on %s for %s at %s. Link: %s",
                        request.getRoundName(), request.getScheduledTime(),
                        app.getPlacementDrive().getRoleName(),
                        app.getPlacementDrive().getCompany().getName(),
                        request.getMeetingLink() != null ? request.getMeetingLink() : "Check details"),
                "INTERVIEW",
                "/student/applications"
        );

        return toInterviewDto(interview);
    }

    public List<ApplicationDto> getStudentApplications(Long userId) {
        StudentProfile student = studentProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        return applicationRepository.findByStudentProfileIdOrderByAppliedAtDesc(student.getId()).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getDriveApplicants(Long driveId) {
        return applicationRepository.findByPlacementDriveIdOrderByAppliedAtDesc(driveId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ApplicationDto getApplicationById(Long id) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));
        return toDto(app);
    }

    public ApplicationDto toDto(Application a) {
        ApplicationDto dto = new ApplicationDto();
        dto.setId(a.getId());
        if (a.getStudentProfile() != null) {
            dto.setStudentProfileId(a.getStudentProfile().getId());
            dto.setStudentName(a.getStudentProfile().getUser().getFullName());
            dto.setStudentEmail(a.getStudentProfile().getUser().getEmail());
            dto.setStudentRollNumber(a.getStudentProfile().getRollNumber());
            dto.setStudentBranch(a.getStudentProfile().getBranch());
            dto.setStudentCgpa(a.getStudentProfile().getCgpa());
            dto.setStudentBacklogs(a.getStudentProfile().getActiveBacklogs());
            dto.setResumeUrl(a.getStudentProfile().getResumeUrl());
        }
        if (a.getPlacementDrive() != null) {
            dto.setPlacementDriveId(a.getPlacementDrive().getId());
            dto.setDriveTitle(a.getPlacementDrive().getTitle());
            dto.setRoleName(a.getPlacementDrive().getRoleName());
            if (a.getPlacementDrive().getCompany() != null) {
                dto.setCompanyId(a.getPlacementDrive().getCompany().getId());
                dto.setCompanyName(a.getPlacementDrive().getCompany().getName());
                dto.setCompanyLogo(a.getPlacementDrive().getCompany().getLogoUrl());
            }
        }
        dto.setStatus(a.getStatus());
        dto.setMatchScore(a.getMatchScore());
        dto.setMatchExplanation(a.getMatchExplanation());
        dto.setNotes(a.getNotes());
        dto.setAppliedAt(a.getAppliedAt());
        dto.setUpdatedAt(a.getUpdatedAt());

        List<ApplicationHistoryDto> hist = historyRepository.findByApplicationIdOrderByCreatedAtAsc(a.getId()).stream()
                .map(h -> new ApplicationHistoryDto(h.getId(), h.getFromStatus(), h.getToStatus(), h.getRemarks(), h.getUpdatedBy(), h.getCreatedAt()))
                .collect(Collectors.toList());
        dto.setHistory(hist);

        List<InterviewScheduleDto> ints = interviewRepository.findByApplicationIdOrderByScheduledTimeAsc(a.getId()).stream()
                .map(this::toInterviewDto)
                .collect(Collectors.toList());
        dto.setInterviews(ints);

        return dto;
    }

    public InterviewScheduleDto toInterviewDto(InterviewSchedule i) {
        InterviewScheduleDto dto = new InterviewScheduleDto();
        dto.setId(i.getId());
        dto.setApplicationId(i.getApplication() != null ? i.getApplication().getId() : null);
        dto.setRoundName(i.getRoundName());
        dto.setScheduledTime(i.getScheduledTime());
        dto.setMeetingLink(i.getMeetingLink());
        dto.setLocation(i.getLocation());
        dto.setInstructions(i.getInstructions());
        dto.setInterviewerFeedback(i.getInterviewerFeedback());
        dto.setResult(i.getResult());
        dto.setCreatedAt(i.getCreatedAt());
        return dto;
    }
}

