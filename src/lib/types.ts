import { User } from '@supabase/supabase-js';

export interface Task {
  id: number;
  user_id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface PomodoroSession {
  id: number;
  user_id: string;
  started_at: string;
  ended_at?: string;
  duration: number; // em minutos
  task_id?: number;
  was_completed: boolean;
  interruption_count: number;
  notes?: string;
  created_at: string;
}

export interface WellBeingEntry {
  id: number;
  user_id: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  energy_level: number; // 1-5
  focus_level: number; // 1-5
  anxiety_level: number; // 1-5
  sleep_hours?: number;
  meditation_minutes?: number;
  exercise_minutes?: number;
  notes?: string;
  created_at: string;
}

export interface DiaryEntry {
  id: number;
  user_id: string;
  content: string;
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  tags?: string[];
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'achievement';
  requirements: {
    type: 'pomodoros' | 'tasks' | 'meditation' | 'exercise' | 'custom';
    target: number;
    current?: number;
  };
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  created_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  points: number;
  requirements: {
    type: string;
    target: number;
  };
  created_at: string;
}

export interface UserAchievement {
  id: number;
  user_id: string;
  achievement_id: number;
  progress: number;
  completed: boolean;
  completed_at?: string;
  created_at: string;
}

export interface AIConversation {
  id: number;
  user_id: string;
  messages: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  title?: string;
  context?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  preferences: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    notifications?: {
      pomodoro: boolean;
      tasks: boolean;
      challenges: boolean;
      wellbeing: boolean;
    };
    pomodoro_settings?: {
      work_duration: number;
      break_duration: number;
      long_break_duration: number;
      sessions_until_long_break: number;
    };
  };
  points: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface DailyStats {
  id: number;
  user_id: string;
  date: string;
  completed_tasks: number;
  completed_pomodoros: number;
  total_focus_time: number; // em minutos
  interruptions: number;
  mood_average?: number;
  focus_average?: number;
  points_earned: number;
  created_at: string;
  updated_at: string;
}

export interface WeeklyGoal {
  id: number;
  user_id: string;
  title: string;
  description?: string;
  target: number;
  current: number;
  type: 'pomodoros' | 'tasks' | 'meditation' | 'exercise' | 'custom';
  start_date: string;
  end_date: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}
