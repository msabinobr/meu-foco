import { useState, useEffect } from 'react';

type NotificationType = 'success' | 'warning' | 'info' | 'reminder' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  actionUrl?: string;
}

type NotificationListener = (notifications: Notification[]) => void;

declare global {
  interface Window {
    Notification: {
      permission: 'granted' | 'denied' | 'default';
      requestPermission(): Promise<'granted' | 'denied' | 'default'>;
      new(title: string, options?: NotificationOptions): globalThis.Notification;
    };
  }
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private listeners: NotificationListener[] = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        this.notifications = JSON.parse(savedNotifications).map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt)
        }));
      }
    }
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  addListener(listener: NotificationListener): () => void {
    this.listeners.push(listener);
    listener([...this.notifications]);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  add(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      read: false
    };

    this.notifications.unshift(newNotification);
    this.saveToStorage();
    this.notifyListeners();

    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (window.Notification.permission === 'granted') {
        const systemNotification = new window.Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico'
        });

        if (notification.actionUrl) {
          systemNotification.onclick = () => {
            window.open(notification.actionUrl);
          };
        }
      }
    }

    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
      this.saveToStorage();
    }

    return newNotification;
  }

  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.saveToStorage();
    this.notifyListeners();
  }

  remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  clear(): void {
    this.notifications = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  async requestPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      console.warn('Este navegador não suporta notificações do sistema');
      return false;
    }

    if (window.Notification.permission === 'default') {
      const permission = await window.Notification.requestPermission();
      return permission === 'granted';
    }

    return window.Notification.permission === 'granted';
  }

  success(title: string, message: string, actionUrl?: string): Notification {
    return this.add({ type: 'success', title, message, actionUrl });
  }

  warning(title: string, message: string, actionUrl?: string): Notification {
    return this.add({ type: 'warning', title, message, actionUrl });
  }

  info(title: string, message: string, actionUrl?: string): Notification {
    return this.add({ type: 'info', title, message, actionUrl });
  }

  reminder(title: string, message: string, actionUrl?: string): Notification {
    return this.add({ type: 'reminder', title, message, actionUrl });
  }
}

export const notificationService = NotificationService.getInstance();

export function useNotification() {
  const [notificationService] = useState(() => NotificationService.getInstance());

  const notify = ({
    type,
    message,
    description,
    actionUrl,
  }: {
    type: NotificationType;
    message: string;
    description?: string;
    actionUrl?: string;
  }) => {
    notificationService.addNotification({
      type,
      title: message,
      message: description || '',
      actionUrl,
    });
  };

  return notify;
}
