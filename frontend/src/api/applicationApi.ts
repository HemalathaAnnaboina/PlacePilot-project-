import apiClient from './client';
import { Application, ApplicationStatus, InterviewSchedule } from '../types';

export const applicationApi = {
  apply: async (placementDriveId: number, notes?: string): Promise<Application> => {
    const res = await apiClient.post<Application>('/applications/apply', { placementDriveId, notes });
    return res.data;
  },

  updateStatus: async (applicationId: number, status: ApplicationStatus, remarks?: string): Promise<Application> => {
    const res = await apiClient.patch<Application>(`/applications/${applicationId}/status`, { status, remarks });
    return res.data;
  },

  scheduleInterview: async (
    applicationId: number,
    data: {
      roundName: string;
      scheduledTime: string;
      meetingLink?: string;
      location?: string;
      instructions?: string;
    }
  ): Promise<InterviewSchedule> => {
    const res = await apiClient.post<InterviewSchedule>(`/applications/${applicationId}/interviews`, data);
    return res.data;
  },

  getMyApplications: async (): Promise<Application[]> => {
    const res = await apiClient.get<Application[]>('/applications/my');
    return res.data;
  },

  getDriveApplicants: async (driveId: number): Promise<Application[]> => {
    const res = await apiClient.get<Application[]>(`/applications/drive/${driveId}`);
    return res.data;
  },

  getAllApplications: async (): Promise<Application[]> => {
    const res = await apiClient.get<Application[]>('/applications/all');
    return res.data;
  },

  getApplicationById: async (id: number): Promise<Application> => {
    const res = await apiClient.get<Application>(`/applications/${id}`);
    return res.data;
  },
};

