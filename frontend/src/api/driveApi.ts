import apiClient from './client';
import { EligibilityResult, PlacementDrive } from '../types';

export const driveApi = {
  getAllDrives: async (): Promise<PlacementDrive[]> => {
    const res = await apiClient.get<PlacementDrive[]>('/drives');
    return res.data;
  },

  getActiveDrives: async (): Promise<PlacementDrive[]> => {
    const res = await apiClient.get<PlacementDrive[]>('/drives/active');
    return res.data;
  },

  getDrivesForStudent: async (): Promise<PlacementDrive[]> => {
    const res = await apiClient.get<PlacementDrive[]>('/drives/student');
    return res.data;
  },

  getDriveById: async (id: number): Promise<PlacementDrive> => {
    const res = await apiClient.get<PlacementDrive>(`/drives/${id}`);
    return res.data;
  },

  checkEligibility: async (driveId: number): Promise<EligibilityResult> => {
    const res = await apiClient.get<EligibilityResult>(`/drives/${driveId}/eligibility`);
    return res.data;
  },

  createDrive: async (data: any): Promise<PlacementDrive> => {
    const res = await apiClient.post<PlacementDrive>('/drives', data);
    return res.data;
  },

  updateDrive: async (id: number, data: any): Promise<PlacementDrive> => {
    const res = await apiClient.put<PlacementDrive>(`/drives/${id}`, data);
    return res.data;
  },
};

