import apiClient from './client';
import { StudentProfile } from '../types';

export const studentApi = {
  getProfile: async (): Promise<StudentProfile> => {
    const res = await apiClient.get<StudentProfile>('/student/profile');
    return res.data;
  },

  updateProfile: async (data: Partial<StudentProfile>): Promise<StudentProfile> => {
    const res = await apiClient.put<StudentProfile>('/student/profile', data);
    return res.data;
  },

  addSkill: async (skill: string, level: string = 'Intermediate'): Promise<StudentProfile> => {
    const res = await apiClient.post<StudentProfile>('/student/skills', { skill, level });
    return res.data;
  },

  removeSkill: async (skillId: number): Promise<StudentProfile> => {
    const res = await apiClient.delete<StudentProfile>(`/student/skills/${skillId}`);
    return res.data;
  },

  uploadResume: async (file: File): Promise<StudentProfile> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<StudentProfile>('/student/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};

