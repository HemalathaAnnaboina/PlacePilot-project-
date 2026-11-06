import apiClient from './client';
import { AuthResponse } from '../types';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return res.data;
  },

  registerStudent: async (data: {
    fullName: string;
    email: string;
    password: string;
    rollNumber: string;
    branch: string;
    cgpa: number;
    graduationYear: number;
    activeBacklogs?: number;
    phone?: string;
    skills?: string[];
  }): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/register/student', data);
    return res.data;
  },

  registerRecruiter: async (data: {
    fullName: string;
    email: string;
    password: string;
    companyName: string;
    companyWebsite?: string;
    industry?: string;
    companyDescription?: string;
    companyLocation?: string;
    designation: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/register/recruiter', data);
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
};

