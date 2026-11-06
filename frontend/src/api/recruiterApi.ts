import apiClient from './client';
import { Application, Company, PlacementDrive } from '../types';

export const recruiterApi = {
  getProfile: async (): Promise<any> => {
    const res = await apiClient.get('/recruiter/profile');
    return res.data;
  },

  updateCompany: async (companyId: number, data: Partial<Company>): Promise<Company> => {
    const res = await apiClient.put<Company>(`/recruiter/company/${companyId}`, data);
    return res.data;
  },

  getMyDrives: async (): Promise<PlacementDrive[]> => {
    const res = await apiClient.get<PlacementDrive[]>('/recruiter/drives');
    return res.data;
  },

  getDriveApplicants: async (driveId: number): Promise<Application[]> => {
    const res = await apiClient.get<Application[]>(`/recruiter/drives/${driveId}/applicants`);
    return res.data;
  },
};

