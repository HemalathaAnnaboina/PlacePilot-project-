# PlacePilot — AI-Powered Smart College Placement Management System

PlacePilot is a centralized, intelligent college placement platform connecting Students, Training and Placement Officers (TPOs), and Recruiters. The platform automates placement lifecycle management, enforces rule-based deterministic eligibility criteria, and leverages AI engines to empower students with resume audits, career roadmaps, job matching explanations, and mock interviews.

---

## 🚀 Live Deployment on Embarko

The frontend application is permanently claimed and deployed to **Embarko**:

- **Live URL:** [https://placepilot.embarko.app](https://placepilot.embarko.app)
- **Embarko App ID:** `cmw11fplh04rnw56w66wqdt4c`
- **Deployment Status:** `live` (Permanently claimed)

### 📋 Architectural Compatibility with Embarko
- **Frontend (React + Vite SPA):** Natively built and served by Embarko's Railpack builder as a high-performance single-page application with full client-side routing.
- **Backend (Spring Boot + PostgreSQL):** Embarko's runtime uses Railpack, which operates single-process containers with a strict 256MB memory cap designed for Node/Python/Go/Ruby/PHP/Rust/Static manifests with SQLite storage under `DATA_DIR`. Standard enterprise Java Spring Boot + PostgreSQL architectures require external cloud deployment (such as Railway, Render, or a dedicated VPS) or microservice decomposition, connecting directly to the Embarko-hosted frontend via CORS.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Axios |
| **Backend** | Java Spring Boot 3.3.5 (Java 21/23), Spring Data JPA, Hibernate |
| **Security & Auth** | Spring Security 6, JJWT (HMAC-SHA256), BCrypt Password Hashing, RBAC |
| **Database** | PostgreSQL (Production) / H2 in PostgreSQL-compatibility mode (Development) |
| **Document Processing** | Apache PDFBox (Secure resume text extraction) |
| **AI Integration** | Deterministic heuristics engine with secure backend LLM API proxy (Gemini / OpenAI compatible) |

---

## 👥 User Roles & Demo Credentials

PlacePilot includes seeded accounts and comprehensive mock placement data for immediate testing:

| Role | Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **Student** | `student@placepilot.edu` | `password123` | Profile management, resume upload & AI audit, eligibility checks, drive applications, AI mock interviews |
| **TPO / Admin** | `tpo@placepilot.edu` | `password123` | College placement statistics, student/recruiter directory, drive creation & criteria definition, funnel analytics |
| **Recruiter** | `recruiter@abctech.com` | `password123` | Company profile, drive postings, applicant pipeline review, shortlisting, candidate interview scheduling |

---

## 🎯 Key Functional Modules

### 1. Deterministic Rule-Based Placement Eligibility Engine
- Accurately computes student eligibility against drive criteria:
  - **CGPA Cutoff:** Profile CGPA vs minimum CGPA.
  - **Permitted Branches:** Branch code verification (`CSE`, `IT`, `ECE`, etc.).
  - **Backlog Restrictions:** Maximum active backlogs allowed.
  - **Graduation Year:** Batch verification.
- Returns exact itemized lists of passed criteria and failed disqualification reasons.

### 2. 5-Stage Recruitment Funnel
- Applications progress transparently through audited stages:
  1. `Applied`
  2. `Under Review`
  3. `Shortlisted`
  4. `Interview Scheduled`
  5. `Selected` / `Rejected`
- Complete timestamped audit history tracked per applicant.

### 3. AI-Powered Preparation & Insights Suite
- **AI Resume Analyzer:** Extracts text from uploaded PDF resumes using Apache PDFBox, checks for contact info, skills, education, and calculates an ATS readability score with missing keyword suggestions.
- **Smart Job Matcher:** Analyzes technical skills against required competencies and generates an intuitive match score with skill gap highlights.
- **AI Skill Gap Analyzer:** Categorizes missing skills into High/Medium/Low priority and generates a structured learning roadmap.
- **AI Mock Interview Simulator:** Generates role-specific behavioral and technical questions, evaluates submitted answers across 4 evaluation rubrics, and offers constructive feedback.
- **AI Placement Insights:** Aggregates college-wide placement readiness, identifies top required skills across active recruiters, and summarizes placement metrics for TPO leadership.

---

## 💻 Local Development Setup

### Prerequisites
- Java JDK 21 or later (`java --version`)
- Node.js 18+ and npm (`npm --version`)
- Maven 3.8+ (A preconfigured `mvnw.cmd` wrapper is included in `backend/`)

### Backend Setup
```bash
cd backend
# Compile and build backend JAR with bundled dependencies
.\mvnw.cmd package -DskipTests

# Run Spring Boot backend
java -jar target/placepilot-backend-1.0.0.jar
```
- API starts at `http://localhost:8080`
- Swagger OpenAPI documentation: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON Spec: `http://localhost:8080/v3/api-docs`

### Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Build production bundle
npm run build
```
- Frontend dev server starts at `http://localhost:5173`

---

## 🔒 Security Best Practices
- **No Hardcoded Secrets:** JWT secrets and AI keys are injected via environment variables (`JWT_SECRET`, `AI_API_KEY`).
- **Sanitized Uploads:** Resume uploads are validated for MIME type (`application/pdf`), file size (capped at 10MB), and sanitized filenames.
- **CORS Protection:** Configured in `SecurityConfig` to restrict cross-origin requests to trusted local and Embarko hosts.

