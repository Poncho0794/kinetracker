import { Exercise, Routine, User, WorkoutLog } from '../types';

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) ||
  (typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1'
    ? '/api'
    : 'http://localhost:3000/api');

export const initialUser: User = {
  id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  email: 'atleta@kinetracker.app',
  name: 'Alfonso Banda',
  avatar_url:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBxcVAi7b1BZ8MgF9e5WwLW0vDPcgGwiElR73LaZzjvBtK6eYi9jU6NFfAVKAqMGcvljpaNEhO-UdDqrydG-hwVTYEjfU6E4tRmg2dqSvP72zzaqmeoh0WrSM_MTm_n8qjUE8NWYAJJxYQaio5KcafsJ_LTCdhV1lKcVPTxt-jYul75Hg9UiHlUBHk7vbViT2ZR8XMjNZPeeL14v4Xe0GIEmg92JJJZypdKWyy7d594aaLDXh8ErZJU',
  weekly_goal_days: 4,
};

export const initialRoutines: Routine[] = [
  {
    id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Día 1 — Empuje e Hipertrofia',
    description:
      'Enfoque principal en tensión mecánica alta en press con barra y tempo controlado concéntrico. Asegura 2-3 min de descanso en series pesadas.',
    day_of_week: 1,
    frequency_days: 4,
  },
];

export const initialExercises: Exercise[] = [
  {
    id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    name: 'Press de Banca Plano con Barra',
    target_muscle: 'Pecho',
    secondary_muscles: ['Tríceps', 'Deltoides Frontal'],
    target_sets: 4,
    target_reps_min: 8,
    target_reps_max: 10,
    target_weight: 85.0,
    rest_seconds: 120,
    notes: 'Pausa técnica de 1 seg en pecho • Agarre ligeramente fuera del ancho de hombros',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDm9kGEUoRtnp3Y4UxpgtSmI_qM2SuFNXm9A8EEtxjBn-ofqM0DH9ouUTB0Mafo1MF0ShU3cNGtRCdHwahneyowYylJLKwBSSyFNaFI4mjSpzhyd6X4nCuvsa6FdS5jbgjhArpqVliKFAE9quuF1s7W0kW_qI-kQGRT1LzFy9k_pCD64aHqXropLunD1a9mQkSo2DTloliXJK7Isng8UYlhteY2p8FHBnPN194attUjU70384tVJGEU',
    order_index: 1,
  },
  {
    id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    name: 'Sentadilla Trasera con Barra',
    target_muscle: 'Cuádriceps',
    secondary_muscles: ['Glúteos', 'Core'],
    target_sets: 4,
    target_reps_min: 6,
    target_reps_max: 8,
    target_weight: 110.0,
    rest_seconds: 150,
    notes: 'Profundidad paralela sólida • Barra alta con respiración diafragmática Valsalva',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGM7wu9RZssz5EkK6yVKLZ_R1O16WkMRt39s0QyvMgC9dZNsxZ7vQgLnJ0H4HL0dwTA_4cWo23PUkBXWxclxfBrMr_XRSHD07JhnA5_LvnAArNn2eU2of_ysiYsKvyQ6hhuEjnggoUH7WGHNfF4rYF4CEtCscVHwKCEyntaKrnS5NtXcdMr520d83oTJGPRhbGOhxYqHXKy_5nomT_xHfrNXMyKsSbys7Z4okbYt-WIbNUzvgFR0nr',
    order_index: 2,
  },
  {
    id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    name: 'Press Militar Sentado con Mancuernas',
    target_muscle: 'Hombros',
    secondary_muscles: ['Deltoides Lateral', 'Estabilizadores'],
    target_sets: 3,
    target_reps_min: 10,
    target_reps_max: 12,
    target_weight: 24.0,
    rest_seconds: 90,
    notes: 'Banco a 75° para protección acromial • Trayectoria ligeramente curva natural',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgkFTCnkaNNDetryekLiFWdie5ipHZbOYAVSFUYYzRasWRDXhjAoRNe2B2aHxPS04LfNLZNWQ5bWVbw-x4RtIlxEZpfLciYXEm7ogJgekl1Pgs_mEwX8CZPyScTXxdiuivW8bTCWQfpdRG6AbL6OmEay4t52YdtksMw26959De1JECrfxpgEwMpMAKOB2pn2vtZF0ZZhr5UM0IY1Jd3CRG28mrNJXS4QH9ufqkfeTR_nLKpzTWm_o',
    order_index: 3,
  },
];

export const initialLogs: WorkoutLog[] = [
  {
    id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a41',
    user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    exercise_id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    set_number: 1,
    reps_completed: 10,
    weight_used: 82.5,
    rpe: 8.0,
    is_personal_record: false,
    log_date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a42',
    user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    exercise_id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    set_number: 2,
    reps_completed: 9,
    weight_used: 85.0,
    rpe: 8.5,
    is_personal_record: false,
    log_date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a43',
    user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    exercise_id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    set_number: 3,
    reps_completed: 8,
    weight_used: 87.5,
    rpe: 9.0,
    is_personal_record: true,
    log_date: new Date().toISOString().split('T')[0],
  },
];

export async function fetchRoutines(): Promise<Routine[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/routines`);
    if (res.ok) return await res.json();
  } catch {
    // API server might not be running in isolated test/preview mode
  }
  return initialRoutines;
}

export async function fetchExercises(routineId?: string): Promise<Exercise[]> {
  try {
    const url = routineId ? `${API_BASE_URL}/exercises?routineId=${routineId}` : `${API_BASE_URL}/exercises`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }
  return routineId ? initialExercises.filter((e) => e.routine_id === routineId) : initialExercises;
}

export async function fetchWorkoutLogs(date?: string): Promise<WorkoutLog[]> {
  try {
    const url = date ? `${API_BASE_URL}/workout-logs?date=${date}` : `${API_BASE_URL}/workout-logs`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }
  return initialLogs;
}

export async function createWorkoutLog(log: Omit<WorkoutLog, 'id'>): Promise<WorkoutLog> {
  try {
    const res = await fetch(`${API_BASE_URL}/workout-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }
  return {
    id: `log-${Date.now()}`,
    ...log,
  };
}

export async function createRoutine(routine: Omit<Routine, 'id'>): Promise<Routine> {
  try {
    const res = await fetch(`${API_BASE_URL}/routines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(routine),
    });
    if (res.ok) return await res.json();
  } catch {
    // Fallback
  }
  return {
    id: `routine-${Date.now()}`,
    ...routine,
  };
}
