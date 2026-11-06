import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Landing & Auth Pages
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { StudentRegisterPage } from './pages/auth/StudentRegisterPage';
import { RecruiterRegisterPage } from './pages/auth/RecruiterRegisterPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentDrivesPage } from './pages/student/StudentDrivesPage';
import { StudentApplicationsPage } from './pages/student/StudentApplicationsPage';
import { StudentResumeAnalyzerPage } from './pages/student/StudentResumeAnalyzerPage';
import { StudentSkillGapPage } from './pages/student/StudentSkillGapPage';
import { StudentMockInterviewPage } from './pages/student/StudentMockInterviewPage';

// TPO Pages
import { TpoDashboard } from './pages/tpo/TpoDashboard';
import { TpoDrivesPage } from './pages/tpo/TpoDrivesPage';
import { TpoStudentsPage } from './pages/tpo/TpoStudentsPage';
import { TpoRecruitersPage } from './pages/tpo/TpoRecruitersPage';
import { TpoApplicationsPage } from './pages/tpo/TpoApplicationsPage';
import { TpoAiInsightsPage } from './pages/tpo/TpoAiInsightsPage';
import { TpoAnnouncementsPage } from './pages/tpo/TpoAnnouncementsPage';

// Recruiter Pages
import { RecruiterDashboard } from './pages/recruiter/RecruiterDashboard';
import { RecruiterCompanyPage } from './pages/recruiter/RecruiterCompanyPage';
import { RecruiterDrivesPage } from './pages/recruiter/RecruiterDrivesPage';
import { RecruiterApplicantsPage } from './pages/recruiter/RecruiterApplicantsPage';

// Role Guard Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('STUDENT' | 'TPO' | 'RECRUITER')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their own dashboard
    if (user.role === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
    if (user.role === 'TPO') return <Navigate to="/tpo/dashboard" replace />;
    if (user.role === 'RECRUITER') return <Navigate to="/recruiter/dashboard" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/student" element={<StudentRegisterPage />} />
            <Route path="/register/recruiter" element={<RecruiterRegisterPage />} />

            {/* Student Protected Portal */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfilePage />} />
              <Route path="drives" element={<StudentDrivesPage />} />
              <Route path="applications" element={<StudentApplicationsPage />} />
              <Route path="resume-analyzer" element={<StudentResumeAnalyzerPage />} />
              <Route path="skill-gap" element={<StudentSkillGapPage />} />
              <Route path="mock-interview" element={<StudentMockInterviewPage />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* TPO Protected Portal */}
            <Route
              path="/tpo"
              element={
                <ProtectedRoute allowedRoles={['TPO']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<TpoDashboard />} />
              <Route path="drives" element={<TpoDrivesPage />} />
              <Route path="students" element={<TpoStudentsPage />} />
              <Route path="recruiters" element={<TpoRecruitersPage />} />
              <Route path="applications" element={<TpoApplicationsPage />} />
              <Route path="ai-insights" element={<TpoAiInsightsPage />} />
              <Route path="announcements" element={<TpoAnnouncementsPage />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Recruiter Protected Portal */}
            <Route
              path="/recruiter"
              element={
                <ProtectedRoute allowedRoles={['RECRUITER']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<RecruiterDashboard />} />
              <Route path="company" element={<RecruiterCompanyPage />} />
              <Route path="drives" element={<RecruiterDrivesPage />} />
              <Route path="applicants" element={<RecruiterApplicantsPage />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;

