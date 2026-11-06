package com.placepilot.util;

import com.placepilot.entity.*;
import com.placepilot.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final PlacementDriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final ApplicationHistoryRepository historyRepository;
    private final InterviewScheduleRepository interviewRepository;
    private final PlacementAnnouncementRepository announcementRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           StudentProfileRepository studentProfileRepository,
                           RecruiterProfileRepository recruiterProfileRepository,
                           CompanyRepository companyRepository,
                           SkillRepository skillRepository,
                           StudentSkillRepository studentSkillRepository,
                           PlacementDriveRepository driveRepository,
                           ApplicationRepository applicationRepository,
                           ApplicationHistoryRepository historyRepository,
                           InterviewScheduleRepository interviewRepository,
                           PlacementAnnouncementRepository announcementRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.companyRepository = companyRepository;
        this.skillRepository = skillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.driveRepository = driveRepository;
        this.applicationRepository = applicationRepository;
        this.historyRepository = historyRepository;
        this.interviewRepository = interviewRepository;
        this.announcementRepository = announcementRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Data already exists
        }

        System.out.println(">>> Initializing PlacePilot Database with Comprehensive Seed Data...");

        // 1. Common Skills Pool
        Skill java = skillRepository.save(new Skill("Java", "Languages"));
        Skill python = skillRepository.save(new Skill("Python", "Languages"));
        Skill ts = skillRepository.save(new Skill("TypeScript", "Languages"));
        Skill js = skillRepository.save(new Skill("JavaScript", "Languages"));
        Skill cpp = skillRepository.save(new Skill("C++", "Languages"));
        Skill spring = skillRepository.save(new Skill("Spring Boot", "Frameworks"));
        Skill react = skillRepository.save(new Skill("React", "Frameworks"));
        Skill postgres = skillRepository.save(new Skill("PostgreSQL", "Databases"));
        Skill mysql = skillRepository.save(new Skill("MySQL", "Databases"));
        Skill redis = skillRepository.save(new Skill("Redis", "Databases"));
        Skill docker = skillRepository.save(new Skill("Docker", "DevOps & Cloud"));
        Skill k8s = skillRepository.save(new Skill("Kubernetes", "DevOps & Cloud"));
        Skill aws = skillRepository.save(new Skill("AWS", "DevOps & Cloud"));
        Skill git = skillRepository.save(new Skill("Git", "Tools"));
        Skill dsa = skillRepository.save(new Skill("Data Structures", "Core CS"));
        Skill ml = skillRepository.save(new Skill("Machine Learning", "AI & ML"));

        // 2. TPO / Admin Account
        User tpoUser = new User();
        tpoUser.setEmail("tpo@placepilot.edu");
        tpoUser.setFullName("Dr. Robert Vance (Director of Placements)");
        tpoUser.setPassword(passwordEncoder.encode("password123"));
        tpoUser.setRole(Role.TPO);
        userRepository.save(tpoUser);

        // 3. Companies
        Company abcTech = new Company(
                "ABC Technologies", "https://abctechnologies.com", "Software & Cloud Services",
                "Leading digital engineering and cloud transformation company operating globally.",
                "Bengaluru, India",
                "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"
        );
        abcTech = companyRepository.save(abcTech);

        Company apexCloud = new Company(
                "Apex Cloud Systems", "https://apexcloud.io", "Cloud Infrastructure",
                "Pioneering next-generation hybrid cloud resilience and Kubernetes orchestration.",
                "Hyderabad, India",
                "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop"
        );
        apexCloud = companyRepository.save(apexCloud);

        Company finEdge = new Company(
                "FinEdge Capital", "https://finedge.com", "Fintech & Algorithmic Trading",
                "Quantitative finance platform driving high-frequency execution and intelligent lending.",
                "Mumbai, India",
                "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop"
        );
        finEdge = companyRepository.save(finEdge);

        // 4. Recruiter Accounts
        User recUser1 = new User();
        recUser1.setEmail("recruiter@abctech.com");
        recUser1.setFullName("Sarah Jenkins");
        recUser1.setPassword(passwordEncoder.encode("password123"));
        recUser1.setRole(Role.RECRUITER);
        userRepository.save(recUser1);

        RecruiterProfile recProfile1 = new RecruiterProfile(
                recUser1, abcTech, "Lead University Talent Acquisition", "sarah.j@abctech.com", "+91 98765 43210"
        );
        recruiterProfileRepository.save(recProfile1);

        User recUser2 = new User();
        recUser2.setEmail("recruiter@apexcloud.io");
        recUser2.setFullName("David Miller");
        recUser2.setPassword(passwordEncoder.encode("password123"));
        recUser2.setRole(Role.RECRUITER);
        userRepository.save(recUser2);

        RecruiterProfile recProfile2 = new RecruiterProfile(
                recUser2, apexCloud, "Head of Campus Hiring", "david.m@apexcloud.io", "+91 98765 43211"
        );
        recruiterProfileRepository.save(recProfile2);

        // 5. Students
        // Student 1: Rahul Sharma (High CGPA, CSE, Eligible for ABC Tech & Apex Cloud)
        User sUser1 = new User();
        sUser1.setEmail("rahul.sharma@placepilot.edu");
        sUser1.setFullName("Rahul Sharma");
        sUser1.setPassword(passwordEncoder.encode("password123"));
        sUser1.setRole(Role.STUDENT);
        userRepository.save(sUser1);

        StudentProfile sProfile1 = new StudentProfile();
        sProfile1.setUser(sUser1);
        sProfile1.setRollNumber("21CS101");
        sProfile1.setBranch("CSE");
        sProfile1.setCgpa(8.85);
        sProfile1.setGraduationYear(2027);
        sProfile1.setActiveBacklogs(0);
        sProfile1.setTotalBacklogs(0);
        sProfile1.setPhone("+91 91234 56780");
        sProfile1.setBio("Passionate Full Stack engineer with strong foundation in Java, Spring Boot, React, and distributed systems.");
        sProfile1.setLinkedInUrl("https://linkedin.com/in/rahul-sharma-demo");
        sProfile1.setGithubUrl("https://github.com/rahul-sharma-demo");
        sProfile1.setResumeText(
                "RAHUL SHARMA - Full Stack Developer\n" +
                "Email: rahul.sharma@placepilot.edu | Roll: 21CS101 | Branch: CSE | CGPA: 8.85 (Batch 2027)\n" +
                "Technical Skills: Java, Spring Boot, React, TypeScript, PostgreSQL, Docker, Git, REST APIs, Data Structures, Algorithms.\n" +
                "Projects:\n" +
                "- Distributed Placement Portal: Architected microservices backend with Spring Boot & PostgreSQL serving 10,000+ simulated requests.\n" +
                "- Real-time Collaborative Canvas: Developed reactive canvas using React, WebSockets, and Redis pub/sub.\n" +
                "Achievements: 4-star LeetCode problem solver (500+ solved). University Hackathon Winner 2025."
        );
        sProfile1.setResumeOriginalFilename("Rahul_Sharma_Resume.pdf");
        sProfile1.setResumeUrl("/uploads/resumes/Rahul_Sharma_Resume.pdf");
        sProfile1.setResumeUploadedAt(LocalDateTime.now().minusDays(5));
        sProfile1 = studentProfileRepository.save(sProfile1);

        studentSkillRepository.save(new StudentSkill(sProfile1, java, "Advanced"));
        studentSkillRepository.save(new StudentSkill(sProfile1, spring, "Advanced"));
        studentSkillRepository.save(new StudentSkill(sProfile1, react, "Intermediate"));
        studentSkillRepository.save(new StudentSkill(sProfile1, ts, "Intermediate"));
        studentSkillRepository.save(new StudentSkill(sProfile1, postgres, "Advanced"));
        studentSkillRepository.save(new StudentSkill(sProfile1, docker, "Intermediate"));
        studentSkillRepository.save(new StudentSkill(sProfile1, dsa, "Advanced"));

        // Student 2: Ananya Patel (IT, High CGPA, Cloud & Python)
        User sUser2 = new User();
        sUser2.setEmail("ananya.patel@placepilot.edu");
        sUser2.setFullName("Ananya Patel");
        sUser2.setPassword(passwordEncoder.encode("password123"));
        sUser2.setRole(Role.STUDENT);
        userRepository.save(sUser2);

        StudentProfile sProfile2 = new StudentProfile();
        sProfile2.setUser(sUser2);
        sProfile2.setRollNumber("21IT204");
        sProfile2.setBranch("IT");
        sProfile2.setCgpa(8.20);
        sProfile2.setGraduationYear(2027);
        sProfile2.setActiveBacklogs(0);
        sProfile2.setTotalBacklogs(0);
        sProfile2.setPhone("+91 91234 56781");
        sProfile2.setBio("Cloud Native & DevOps enthusiast focusing on Kubernetes and AWS automation.");
        sProfile2 = studentProfileRepository.save(sProfile2);

        studentSkillRepository.save(new StudentSkill(sProfile2, python, "Advanced"));
        studentSkillRepository.save(new StudentSkill(sProfile2, docker, "Advanced"));
        studentSkillRepository.save(new StudentSkill(sProfile2, aws, "Intermediate"));
        studentSkillRepository.save(new StudentSkill(sProfile2, k8s, "Intermediate"));

        // Student 3: Vikram Singh (ECE, CGPA 6.90, 1 Backlog - Demonstrates Ineligibility Engine!)
        User sUser3 = new User();
        sUser3.setEmail("vikram.singh@placepilot.edu");
        sUser3.setFullName("Vikram Singh");
        sUser3.setPassword(passwordEncoder.encode("password123"));
        sUser3.setRole(Role.STUDENT);
        userRepository.save(sUser3);

        StudentProfile sProfile3 = new StudentProfile();
        sProfile3.setUser(sUser3);
        sProfile3.setRollNumber("21EC315");
        sProfile3.setBranch("ECE");
        sProfile3.setCgpa(6.90);
        sProfile3.setGraduationYear(2027);
        sProfile3.setActiveBacklogs(1);
        sProfile3.setTotalBacklogs(2);
        sProfile3.setPhone("+91 91234 56782");
        sProfile3.setBio("Embedded Systems and C++ developer aiming for IoT software roles.");
        sProfile3 = studentProfileRepository.save(sProfile3);

        studentSkillRepository.save(new StudentSkill(sProfile3, cpp, "Intermediate"));
        studentSkillRepository.save(new StudentSkill(sProfile3, python, "Intermediate"));

        // Student 4: General Student Login for instant one-click testing
        User sUserDemo = new User();
        sUserDemo.setEmail("student@placepilot.edu");
        sUserDemo.setFullName("Aditya Verma");
        sUserDemo.setPassword(passwordEncoder.encode("password123"));
        sUserDemo.setRole(Role.STUDENT);
        userRepository.save(sUserDemo);

        StudentProfile sProfileDemo = new StudentProfile();
        sProfileDemo.setUser(sUserDemo);
        sProfileDemo.setRollNumber("21CS001");
        sProfileDemo.setBranch("CSE");
        sProfileDemo.setCgpa(8.40);
        sProfileDemo.setGraduationYear(2027);
        sProfileDemo.setActiveBacklogs(0);
        sProfileDemo.setTotalBacklogs(0);
        sProfileDemo.setPhone("+91 90000 11111");
        sProfileDemo.setBio("Aspiring Software Development Engineer specializing in Java ecosystem and modern web frameworks.");
        sProfileDemo.setResumeText(
                "ADITYA VERMA - SDE Candidate\n" +
                "Email: student@placepilot.edu | Roll: 21CS001 | Branch: CSE | CGPA: 8.40 | Batch: 2027\n" +
                "Skills: Java, Spring Boot, React, SQL, PostgreSQL, Git, Docker, REST API, System Design.\n" +
                "Projects:\n" +
                "- Smart Placement Management System: Built Spring Boot REST APIs with JWT security and responsive React frontend.\n" +
                "- AI Resume Analyzer Engine: Implemented ATS scoring algorithm and skill keyword extraction."
        );
        sProfileDemo.setResumeOriginalFilename("Aditya_Verma_Resume.pdf");
        sProfileDemo.setResumeUrl("/uploads/resumes/Aditya_Verma_Resume.pdf");
        sProfileDemo.setResumeUploadedAt(LocalDateTime.now().minusDays(2));
        sProfileDemo = studentProfileRepository.save(sProfileDemo);

        studentSkillRepository.save(new StudentSkill(sProfileDemo, java, "Advanced"));
        studentSkillRepository.save(new StudentSkill(sProfileDemo, spring, "Advanced"));
        studentSkillRepository.save(new StudentSkill(sProfileDemo, react, "Intermediate"));
        studentSkillRepository.save(new StudentSkill(sProfileDemo, postgres, "Intermediate"));

        // 6. Placement Drives
        // Drive 1: ABC Technologies (The exact prompt example!)
        // Company: ABC Technologies
        // Requirements: Min CGPA: 7.5, Branches: CSE, IT, ECE, No active backlogs (0), Grad year: 2027
        PlacementDrive drive1 = new PlacementDrive();
        drive1.setTitle("Software Development Engineer (SDE-1) - Campus 2027");
        drive1.setRoleName("Software Development Engineer");
        drive1.setCompany(abcTech);
        drive1.setJobDescription(
                "Join ABC Technologies as an SDE-1 building enterprise cloud platforms. " +
                "You will work with distributed microservices, reactive user interfaces, and automated CI/CD pipelines."
        );
        drive1.setJobLocation("Bengaluru / Hyderabad (Hybrid)");
        drive1.setPackageLpa(14.5);
        drive1.setMinCgpa(7.5);
        drive1.setEligibleBranches("CSE, IT, ECE");
        drive1.setMaxBacklogsAllowed(0);
        drive1.setGraduationYear(2027);
        drive1.setRequiredSkills("Java, Spring Boot, React, PostgreSQL, Docker, Git");
        drive1.setDriveDate(LocalDate.now().plusDays(15));
        drive1.setApplicationDeadline(LocalDateTime.now().plusDays(10));
        drive1.setStatus("ACTIVE");
        drive1 = driveRepository.save(drive1);

        // Drive 2: Apex Cloud Systems
        PlacementDrive drive2 = new PlacementDrive();
        drive2.setTitle("Cloud & DevOps Engineer - Grad Batch 2027");
        drive2.setRoleName("Cloud Systems Engineer");
        drive2.setCompany(apexCloud);
        drive2.setJobDescription(
                "Apex Cloud Systems is seeking enthusiastic cloud engineers to architect Kubernetes clusters, " +
                "infrastructure-as-code pipelines, and high-availability observability stacks."
        );
        drive2.setJobLocation("Hyderabad / Pune");
        drive2.setPackageLpa(18.0);
        drive2.setMinCgpa(8.0);
        drive2.setEligibleBranches("CSE, IT");
        drive2.setMaxBacklogsAllowed(0);
        drive2.setGraduationYear(2027);
        drive2.setRequiredSkills("Docker, Kubernetes, AWS, Python, Linux, CI/CD");
        drive2.setDriveDate(LocalDate.now().plusDays(20));
        drive2.setApplicationDeadline(LocalDateTime.now().plusDays(12));
        drive2.setStatus("ACTIVE");
        drive2 = driveRepository.save(drive2);

        // Drive 3: FinEdge Capital (Quantitative / Full Stack)
        PlacementDrive drive3 = new PlacementDrive();
        drive3.setTitle("FinTech Platform Engineer");
        drive3.setRoleName("Platform Software Engineer");
        drive3.setCompany(finEdge);
        drive3.setJobDescription(
                "Design and maintain ultra-low latency transaction processing platforms and financial risk analytical engines."
        );
        drive3.setJobLocation("Mumbai (On-site)");
        drive3.setPackageLpa(22.5);
        drive3.setMinCgpa(8.5);
        drive3.setEligibleBranches("CSE, IT");
        drive3.setMaxBacklogsAllowed(0);
        drive3.setGraduationYear(2027);
        drive3.setRequiredSkills("Java, C++, Spring Boot, Redis, Kafka, System Design");
        drive3.setDriveDate(LocalDate.now().plusDays(25));
        drive3.setApplicationDeadline(LocalDateTime.now().plusDays(18));
        drive3.setStatus("ACTIVE");
        drive3 = driveRepository.save(drive3);

        // 7. Seed Applications with History Timelines
        // Application 1: Rahul Sharma applied to ABC Technologies -> SHORTLISTED
        Application app1 = new Application(sProfile1, drive1);
        app1.setStatus(ApplicationStatus.SHORTLISTED);
        app1.setMatchScore(92);
        app1.setMatchExplanation("Candidate possesses 6/6 core skills: Java, Spring Boot, React, PostgreSQL, Docker, Git. Strong academic profile.");
        app1 = applicationRepository.save(app1);

        ApplicationHistory h1_1 = new ApplicationHistory(app1, null, ApplicationStatus.APPLIED, "Application submitted", "Rahul Sharma");
        ApplicationHistory h1_2 = new ApplicationHistory(app1, ApplicationStatus.APPLIED, ApplicationStatus.UNDER_REVIEW, "Profile screened by HR", "Sarah Jenkins");
        ApplicationHistory h1_3 = new ApplicationHistory(app1, ApplicationStatus.UNDER_REVIEW, ApplicationStatus.SHORTLISTED, "Shortlisted for Technical Rounds", "Sarah Jenkins");
        historyRepository.saveAll(List.of(h1_1, h1_2, h1_3));

        // Application 2: Ananya Patel applied to Apex Cloud Systems -> INTERVIEW_SCHEDULED
        Application app2 = new Application(sProfile2, drive2);
        app2.setStatus(ApplicationStatus.INTERVIEW_SCHEDULED);
        app2.setMatchScore(88);
        app2.setMatchExplanation("Strong alignment in Docker, AWS, and Python. CGPA meets 8.0 cutoff.");
        app2 = applicationRepository.save(app2);

        ApplicationHistory h2_1 = new ApplicationHistory(app2, null, ApplicationStatus.APPLIED, "Application submitted", "Ananya Patel");
        ApplicationHistory h2_2 = new ApplicationHistory(app2, ApplicationStatus.APPLIED, ApplicationStatus.SHORTLISTED, "Shortlisted based on Cloud expertise", "David Miller");
        ApplicationHistory h2_3 = new ApplicationHistory(app2, ApplicationStatus.SHORTLISTED, ApplicationStatus.INTERVIEW_SCHEDULED, "Round 1 Technical scheduled", "David Miller");
        historyRepository.saveAll(List.of(h2_1, h2_2, h2_3));

        InterviewSchedule int1 = new InterviewSchedule(
                app2, "Round 1: System Architecture & Cloud",
                LocalDateTime.now().plusDays(3).withHour(14).withMinute(0),
                "https://meet.google.com/xyz-demo-meet",
                "Google Meet",
                "Prepare for deep dive into Docker container lifecycles and Kubernetes networking."
        );
        interviewRepository.save(int1);

        // 8. Placement Announcements
        announcementRepository.save(new PlacementAnnouncement(
                "ABC Technologies Campus Drive Scheduled",
                "ABC Technologies will commence their 2027 placement drive on 15th of this month. All eligible students (CSE, IT, ECE with CGPA >= 7.5 and 0 active backlogs) are requested to verify their profiles and submit applications before the deadline.",
                "ALL", true, "Dr. Robert Vance"
        ));

        announcementRepository.save(new PlacementAnnouncement(
                "AI Resume Optimization & Mock Interview Sessions Open",
                "PlacePilot's AI Resume Analyzer and Mock Interview module are now live. Students are advised to run an ATS audit on their uploaded resumes and complete at least one practice mock interview prior to screening rounds.",
                "STUDENTS", false, "Dr. Robert Vance"
        ));

        System.out.println(">>> PlacePilot Initializer Completed Successfully!");
        System.out.println("    Default Accounts:");
        System.out.println("    - Student: student@placepilot.edu / password123");
        System.out.println("    - TPO: tpo@placepilot.edu / password123");
        System.out.println("    - Recruiter: recruiter@abctech.com / password123");
    }
}

