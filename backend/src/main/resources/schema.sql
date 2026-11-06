-- ===================================================================
-- PlacePilot PostgreSQL Database Schema
-- Normalized relational schema with constraints, indexes, and FKs
-- ===================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    website VARCHAR(255),
    industry VARCHAR(80),
    description TEXT,
    logo_url VARCHAR(255),
    location VARCHAR(100),
    approved BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);

-- 3. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    branch VARCHAR(50) NOT NULL,
    cgpa NUMERIC(4,2) NOT NULL CHECK (cgpa >= 0.0 AND cgpa <= 10.0),
    graduation_year INT NOT NULL,
    active_backlogs INT NOT NULL DEFAULT 0 CHECK (active_backlogs >= 0),
    total_backlogs INT NOT NULL DEFAULT 0,
    phone VARCHAR(20),
    bio TEXT,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    resume_url VARCHAR(255),
    resume_original_filename VARCHAR(255),
    resume_text TEXT,
    resume_uploaded_at TIMESTAMP,
    verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_student_branch ON student_profiles(branch);
CREATE INDEX IF NOT EXISTS idx_student_cgpa ON student_profiles(cgpa);
CREATE INDEX IF NOT EXISTS idx_student_grad_year ON student_profiles(graduation_year);

-- 4. Recruiter Profiles Table
CREATE TABLE IF NOT EXISTS recruiter_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_id BIGINT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    designation VARCHAR(100) NOT NULL,
    work_email VARCHAR(120),
    phone VARCHAR(20),
    approved BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    category VARCHAR(60)
);

CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);

-- 6. Student Skills Table
CREATE TABLE IF NOT EXISTS student_skills (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(30) DEFAULT 'Intermediate',
    CONSTRAINT uq_student_skill UNIQUE (student_profile_id, skill_id)
);

-- 7. Placement Drives Table
CREATE TABLE IF NOT EXISTS placement_drives (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    company_id BIGINT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    job_description TEXT NOT NULL,
    job_location VARCHAR(100),
    package_lpa NUMERIC(6,2) NOT NULL,
    min_cgpa NUMERIC(4,2) NOT NULL,
    eligible_branches VARCHAR(200) NOT NULL,
    max_backlogs_allowed INT NOT NULL DEFAULT 0,
    graduation_year INT NOT NULL,
    required_skills TEXT,
    drive_date DATE,
    application_deadline TIMESTAMP,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_drives_status ON placement_drives(status);
CREATE INDEX IF NOT EXISTS idx_drives_company ON placement_drives(company_id);

-- 8. Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    placement_drive_id BIGINT NOT NULL REFERENCES placement_drives(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL DEFAULT 'APPLIED',
    match_score INT,
    match_explanation TEXT,
    notes TEXT,
    applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT uq_student_drive UNIQUE (student_profile_id, placement_drive_id)
);

CREATE INDEX IF NOT EXISTS idx_app_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_app_student ON applications(student_profile_id);
CREATE INDEX IF NOT EXISTS idx_app_drive ON applications(placement_drive_id);

-- 9. Application History Table (Audit Trail)
CREATE TABLE IF NOT EXISTS application_history (
    id BIGSERIAL PRIMARY KEY,
    application_id BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    from_status VARCHAR(30),
    to_status VARCHAR(30) NOT NULL,
    remarks TEXT,
    updated_by VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_history_app ON application_history(application_id);

-- 10. Interview Schedules Table
CREATE TABLE IF NOT EXISTS interview_schedules (
    id BIGSERIAL PRIMARY KEY,
    application_id BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    round_name VARCHAR(100) NOT NULL,
    scheduled_time TIMESTAMP NOT NULL,
    meeting_link VARCHAR(255),
    location VARCHAR(150),
    instructions TEXT,
    interviewer_feedback TEXT,
    result VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 11. Mock Interview Sessions Table
CREATE TABLE IF NOT EXISTS mock_interview_sessions (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    target_role VARCHAR(100) NOT NULL,
    overall_score INT,
    overall_feedback TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 12. Mock Interview Answers Table
CREATE TABLE IF NOT EXISTS mock_interview_answers (
    id BIGSERIAL PRIMARY KEY,
    session_id BIGINT NOT NULL REFERENCES mock_interview_sessions(id) ON DELETE CASCADE,
    question_number INT NOT NULL,
    question_text TEXT NOT NULL,
    question_category VARCHAR(50),
    student_answer TEXT,
    score INT,
    feedback TEXT,
    improvement_suggestions TEXT,
    model_answer TEXT
);

-- 13. AI Analysis Results Table
CREATE TABLE IF NOT EXISTS ai_analysis_results (
    id BIGSERIAL PRIMARY KEY,
    student_profile_id BIGINT REFERENCES student_profiles(id) ON DELETE CASCADE,
    placement_drive_id BIGINT REFERENCES placement_drives(id) ON DELETE CASCADE,
    analysis_type VARCHAR(50) NOT NULL,
    score INT,
    summary TEXT,
    details_json TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    link VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- 15. Placement Announcements Table
CREATE TABLE IF NOT EXISTS placement_announcements (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    target_audience VARCHAR(30) NOT NULL DEFAULT 'ALL',
    pinned BOOLEAN NOT NULL DEFAULT FALSE,
    author_name VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

