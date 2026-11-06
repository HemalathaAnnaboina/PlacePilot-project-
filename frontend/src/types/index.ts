export type Role = 'STUDENT' | 'TPO' | 'RECRUITER';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  studentProfileId?: number;
  recruiterProfileId?: number;
  companyId?: number;
  companyName?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  fullName: string;
  role: Role;
  studentProfileId?: number;
  recruiterProfileId?: number;
  companyId?: number;
  companyName?: string;
}

export interface SkillItem {
  id: number;
  name: string;
  category: string;
  proficiencyLevel: string;
}

export interface StudentProfile {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  rollNumber: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  activeBacklogs: number;
  totalBacklogs: number;
  phone?: string;
  bio?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  resumeOriginalFilename?: string;
  resumeUploadedAt?: string;
  verified: boolean;
  skills: SkillItem[];
}

export interface Company {
  id: number;
  name: string;
  website?: string;
  industry?: string;
  description?: string;
  logoUrl?: string;
  location?: string;
  approved: boolean;
  createdAt: string;
}

export interface PlacementDrive {
  id: number;
  title: string;
  roleName: string;
  companyId: number;
  companyName: string;
  companyLogo?: string;
  companyIndustry?: string;
  jobDescription: string;
  jobLocation: string;
  packageLpa: number;
  minCgpa: number;
  eligibleBranches: string;
  maxBacklogsAllowed: number;
  graduationYear: number;
  requiredSkills: string;
  driveDate?: string;
  applicationDeadline?: string;
  status: 'ACTIVE' | 'DRAFT' | 'CLOSED';
  totalApplicants: number;
  createdAt: string;
  userApplied?: boolean;
  userApplicationStatus?: string;
  userEligible?: boolean;
  userEligibilityReason?: string;
  matchScore?: number;
}

export type ApplicationStatus =
  | 'APPLIED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'SELECTED'
  | 'REJECTED';

export interface ApplicationHistoryItem {
  id: number;
  fromStatus?: ApplicationStatus;
  toStatus: ApplicationStatus;
  remarks?: string;
  updatedBy?: string;
  createdAt: string;
}

export interface InterviewSchedule {
  id: number;
  applicationId: number;
  roundName: string;
  scheduledTime: string;
  meetingLink?: string;
  location?: string;
  instructions?: string;
  interviewerFeedback?: string;
  result?: string;
  createdAt: string;
}

export interface Application {
  id: number;
  studentProfileId: number;
  studentName: string;
  studentEmail: string;
  studentRollNumber: string;
  studentBranch: string;
  studentCgpa: number;
  studentBacklogs: number;
  resumeUrl?: string;
  placementDriveId: number;
  driveTitle: string;
  roleName: string;
  companyId: number;
  companyName: string;
  companyLogo?: string;
  status: ApplicationStatus;
  matchScore?: number;
  matchExplanation?: string;
  notes?: string;
  appliedAt: string;
  updatedAt?: string;
  history: ApplicationHistoryItem[];
  interviews: InterviewSchedule[];
}

export interface CriterionDetail {
  criterionName: string;
  passed: boolean;
  studentValue: string;
  requiredValue: string;
  message: string;
}

export interface EligibilityResult {
  eligible: boolean;
  status: 'ELIGIBLE' | 'NOT_ELIGIBLE';
  driveTitle: string;
  companyName: string;
  criteria: CriterionDetail[];
  ineligibilityReasons: string[];
  summaryMessage: string;
}

export interface BulletPointSuggestion {
  original: string;
  suggested: string;
  reason: string;
}

export interface AiResumeAnalysis {
  overallScore: number;
  atsCompatibilityScore: number;
  impactScore: number;
  executiveSummary: string;
  identifiedSkills: string[];
  detectedEducation: string[];
  detectedProjects: string[];
  detectedExperience: string[];
  keyStrengths: string[];
  areasOfImprovement: string[];
  recommendedKeywords: string[];
  bulletPointImprovements: BulletPointSuggestion[];
}

export interface JobMatchResult {
  placementDriveId: number;
  jobTitle: string;
  companyName: string;
  matchScore: number;
  matchTier: string;
  matchExplanation: string;
  matchingSkills: string[];
  missingSkills: string[];
  matchStrengths: string[];
  actionableRecommendations: string[];
}

export interface LearningModule {
  skillName: string;
  priority: string;
  estimatedTimeToLearn: string;
  keyTopics: string[];
  recommendedResources: string[];
  practicalProjectIdea: string;
}

export interface SkillGapAnalysis {
  targetRole: string;
  currentReadinessPercentage: number;
  currentSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  learningRoadmap: LearningModule[];
  personalizedAdvice: string[];
}

export interface MockQuestionItem {
  questionNumber: number;
  questionText: string;
  category: string;
  tips: string;
}

export interface MockInterviewQuestions {
  sessionId: number;
  targetRole: string;
  questions: MockQuestionItem[];
}

export interface QuestionReview {
  questionNumber: number;
  questionText: string;
  category: string;
  studentAnswer: string;
  score: number;
  feedback: string;
  improvementSuggestions: string;
  modelAnswer: string;
}

export interface MockInterviewEvaluation {
  sessionId: number;
  targetRole: string;
  overallScore: number;
  overallFeedback: string;
  questionReviews: QuestionReview[];
  topStrengths: string[];
  prioritizedImprovements: string[];
}

export interface SkillDemandInsight {
  skillName: string;
  driveCount: number;
  percentageDemand: number;
  trend: 'RISING' | 'HIGH' | 'STEADY';
}

export interface BranchReadinessInsight {
  branch: string;
  totalStudents: number;
  eligibleStudents: number;
  averageCgpa: number;
  readinessScore: number;
}

export interface TpoInsights {
  totalRegisteredStudents: number;
  totalDrivesConducted: number;
  totalApplicationsSubmitted: number;
  totalStudentsPlaced: number;
  overallPlacementRate: number;
  averagePackageLpa: number;
  highestPackageLpa: number;
  topInDemandSkills: SkillDemandInsight[];
  branchReadinessMetrics: BranchReadinessInsight[];
  keyTrends: string[];
  strategicRecommendations: string[];
  applicationFunnel: Record<string, number>;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface PlacementAnnouncement {
  id: number;
  title: string;
  content: string;
  targetAudience: string;
  pinned: boolean;
  authorName: string;
  createdAt: string;
}

