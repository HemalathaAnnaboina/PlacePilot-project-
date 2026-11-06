import apiClient from './client';
import { PlacementAnnouncement, StudentProfile } from '../types';

export const tpoApi = {
  getStats: async (): Promise<any> => {
    const res = await apiClient.get('/tpo/stats');
    return res.data;
  },

  getStudents: async (): Promise<StudentProfile[]> => {
    const res = await apiClient.get<StudentProfile[]>('/tpo/students');
    return res.data;
  },

  verifyStudent: async (studentId: number, verified: boolean): Promise<StudentProfile> => {
    const res = await apiClient.patch<StudentProfile>(`/tpo/students/${studentId}/verify`, { verified });
    return res.data;
  },

  getRecruiters: async (): Promise<any[]> => {
    const res = await apiClient.get<any[]>('/tpo/recruiters');
    return res.data;
  },

  approveRecruiter: async (recruiterId: number, approved: boolean): Promise<void> => {
    await apiClient.patch(`/tpo/recruiters/${recruiterId}/approve`, { approved });
  },

  createAnnouncement: async (data: {
    title: string;
    content: string;
    targetAudience?: string;
    pinned?: boolean;
  }): Promise<PlacementAnnouncement> => {
    const res = await apiClient.post<PlacementAnnouncement>('/tpo/announcements', data);
    return res.data;
  },

  getAnnouncements: async (audience?: string): Promise<PlacementAnnouncement[]> => {
    const res = await apiClient.get<PlacementAnnouncement[]>(
      `/tpo/announcements${audience ? `?audience=${audience}` : ''}`
    );
    return res.data;
  },
};

