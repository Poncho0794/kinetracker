export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  weekly_goal_days: number;
}

export interface Routine {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  day_of_week?: number;
  frequency_days: number;
}

export interface Exercise {
  id: string;
  routine_id: string;
  name: string;
  target_muscle: string;
  secondary_muscles: string[];
  target_sets: number;
  target_reps_min: number;
  target_reps_max: number;
  target_weight: number;
  rest_seconds: number;
  notes?: string;
  image_url?: string;
  order_index: number;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  routine_id: string;
  exercise_id: string;
  set_number: number;
  reps_completed: number;
  weight_used: number;
  rpe?: number;
  is_personal_record: boolean;
  log_date: string;
  notes?: string;
}
