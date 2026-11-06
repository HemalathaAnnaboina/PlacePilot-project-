import apiClient from './client';
import { Notification } from '../types';

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const res = await apiClient.get<Notification[]>('/notifications');
    return res.data;
  },

  getUnreadCount: async (): Promise<number> => {
    const res = await apiClient.get<{ unreadCount: number }>('/notifications/unread-count');
    return res.data.unreadCount;
  },

  markAsRead: async (id: number): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.post('/notifications/read-all');
  },
};

