import { supabase } from './supabase';
import { Task, PomodoroSession, WellBeingEntry, DiaryEntry, UserProfile, DailyStats, WeeklyGoal } from './types';

// Tasks
export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateTask(id: number, task: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .update(task)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteTask(id: number) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function getTasks(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Pomodoro Sessions
export async function createPomodoroSession(session: Omit<PomodoroSession, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .insert(session)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updatePomodoroSession(id: number, session: Partial<PomodoroSession>) {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .update(session)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getPomodoroSessions(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
}

// Metrics & Stats
export async function updateDailyStats(userId: string, stats: Partial<DailyStats>) {
  const today = new Date().toISOString().split('T')[0];
  const { data: existingStats } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  if (existingStats) {
    const { data, error } = await supabase
      .from('daily_stats')
      .update({
        ...stats,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingStats.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('daily_stats')
      .insert({
        user_id: userId,
        date: today,
        ...stats,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Calculate aggregated metrics
export async function calculateUserStats(userId: string, days: number = 7) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data: stats, error } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) throw error;

  const totals = {
    totalFocusMinutes: 0,
    totalTasksCompleted: 0,
    totalBreathingSessions: 0,
    averageMood: 0,
    streakDays: 0,
    bestDay: null as string | null,
    bestDayMinutes: 0
  };

  if (!stats?.length) return totals;

  // Calculate totals and find best day
  stats.forEach((day) => {
    totals.totalFocusMinutes += day.focus_minutes || 0;
    totals.totalTasksCompleted += day.tasks_completed || 0;
    totals.totalBreathingSessions += day.breathing_sessions || 0;
    totals.averageMood += day.mood_score || 0;

    if (day.focus_minutes > totals.bestDayMinutes) {
      totals.bestDayMinutes = day.focus_minutes;
      totals.bestDay = day.date;
    }
  });

  // Calculate streak
  let currentStreak = 0;
  for (let i = stats.length - 1; i >= 0; i--) {
    if (stats[i].focus_minutes > 0 || stats[i].tasks_completed > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  totals.streakDays = currentStreak;
  totals.averageMood = totals.averageMood / stats.length;

  return totals;
}

// Weekly Goals
export async function createWeeklyGoal(goal: Omit<WeeklyGoal, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('weekly_goals')
    .insert(goal)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateWeeklyGoal(id: number, goal: Partial<WeeklyGoal>) {
  const { data, error } = await supabase
    .from('weekly_goals')
    .update(goal)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getActiveWeeklyGoals(userId: string) {
  const { data, error } = await supabase
    .from('weekly_goals')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', false)
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true });
  
  if (error) throw error;
  return data;
}

// Wellbeing Entries
export async function createWellBeingEntry(entry: Omit<WellBeingEntry, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('wellbeing_entries')
    .insert(entry)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getWellBeingEntries(userId: string, limit = 7) {
  const { data, error } = await supabase
    .from('wellbeing_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
}

// Diary Entries
export async function createDiaryEntry(entry: Omit<DiaryEntry, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('diary_entries')
    .insert(entry)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateDiaryEntry(id: number, entry: Partial<DiaryEntry>) {
  const { data, error } = await supabase
    .from('diary_entries')
    .update(entry)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getDiaryEntries(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
}

// User Profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = não encontrado
  return data;
}

export async function createUserProfile(profile: Omit<UserProfile, 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(profile)
    .eq('user_id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
