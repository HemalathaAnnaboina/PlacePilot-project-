import apiClient from './client';
import {
  AiResumeAnalysis,
  JobMatchResult,
  MockInterviewEvaluation,
  MockInterviewQuestions,
  SkillGapAnalysis,
  TpoInsights,
} from '../types';

export const aiApi = {
  analyzeResume: async (jobId?: number): Promise<AiResumeAnalysis> => {
    const res = await apiClient.post<AiResumeAnalysis>(
      `/ai/resume/analyze${jobId ? `?jobId=${jobId}` : ''}`
    );
    return res.data;
  },

  getJobMatch: async (driveId: number): Promise<JobMatchResult> => {
    const res = await apiClient.get<JobMatchResult>(`/ai/job-match/${driveId}`);
    return res.data;
  },

  getSkillGap: async (role: string): Promise<SkillGapAnalysis> => {
    const res = await apiClient.get<SkillGapAnalysis>(`/ai/skill-gap?role=${encodeURIComponent(role)}`);
    return res.data;
  },

  generateMockQuestions: async (role: string): Promise<MockInterviewQuestions> => {
    const res = await apiClient.post<MockInterviewQuestions>('/ai/mock-interview/generate', { role });
    return res.data;
  },

  evaluateMockInterview: async (sessionId: number, answers: { questionNumber: number; studentAnswer: string }[]): Promise<MockInterviewEvaluation> => {
    const res = await apiClient.post<MockInterviewEvaluation>('/ai/mock-interview/evaluate', {
      sessionId,
      answers,
    });
    return res.data;
  },

  getTpoInsights: async (): Promise<TpoInsights> => {
    const res = await apiClient.get<TpoInsights>('/ai/tpo-insights');
    return res.data;
  },
};

