-- =============================================================================
-- KineTracker Relational Database Schema for Supabase / PostgreSQL
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean up existing tables if recreating
DROP TABLE IF EXISTS workout_logs CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS routines CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- -----------------------------------------------------------------------------
-- 1. USERS (Usuarios)
-- -----------------------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    weekly_goal_days INTEGER NOT NULL DEFAULT 4,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 2. ROUTINES (Rutinas)
-- 1:N with Users (Un usuario tiene muchas rutinas)
-- -----------------------------------------------------------------------------
CREATE TABLE routines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Lunes, 7=Domingo
    frequency_days INTEGER NOT NULL DEFAULT 4,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 3. EXERCISES (Ejercicios)
-- 1:N with Routines (Una rutina tiene muchos ejercicios)
-- -----------------------------------------------------------------------------
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target_muscle TEXT NOT NULL,
    secondary_muscles TEXT[] DEFAULT '{}',
    target_sets INTEGER NOT NULL DEFAULT 4,
    target_reps_min INTEGER NOT NULL DEFAULT 8,
    target_reps_max INTEGER NOT NULL DEFAULT 10,
    target_weight NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    rest_seconds INTEGER NOT NULL DEFAULT 90,
    notes TEXT,
    image_url TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 4. WORKOUT_LOGS (Registros de ejercicios realizados por día)
-- Registra cada serie, repeticiones, peso y fecha
-- -----------------------------------------------------------------------------
CREATE TABLE workout_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL CHECK (set_number > 0),
    reps_completed INTEGER NOT NULL CHECK (reps_completed >= 0),
    weight_used NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    rpe NUMERIC(3, 1) CHECK (rpe >= 1.0 AND rpe <= 10.0),
    is_personal_record BOOLEAN NOT NULL DEFAULT false,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- Indexes for High Performance Queries
-- -----------------------------------------------------------------------------
CREATE INDEX idx_routines_user_id ON routines(user_id);
CREATE INDEX idx_exercises_routine_id ON exercises(routine_id);
CREATE INDEX idx_workout_logs_user_date ON workout_logs(user_id, log_date);
CREATE INDEX idx_workout_logs_exercise ON workout_logs(exercise_id, log_date);
CREATE INDEX idx_workout_logs_routine ON workout_logs(routine_id, log_date);

-- -----------------------------------------------------------------------------
-- Automated updated_at Trigger
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER update_routines_timestamp
    BEFORE UPDATE ON routines
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER update_exercises_timestamp
    BEFORE UPDATE ON exercises
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- -----------------------------------------------------------------------------
-- Seed Data: Sample Demo Data according to Stitch Design System
-- -----------------------------------------------------------------------------
INSERT INTO users (id, email, name, avatar_url, weekly_goal_days)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'atleta@kinetracker.app',
    'Alfonso Banda',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBxcVAi7b1BZ8MgF9e5WwLW0vDPcgGwiElR73LaZzjvBtK6eYi9jU6NFfAVKAqMGcvljpaNEhO-UdDqrydG-hwVTYEjfU6E4tRmg2dqSvP72zzaqmeoh0WrSM_MTm_n8qjUE8NWYAJJxYQaio5KcafsJ_LTCdhV1lKcVPTxt-jYul75Hg9UiHlUBHk7vbViT2ZR8XMjNZPeeL14v4Xe0GIEmg92JJJZypdKWyy7d594aaLDXh8ErZJU',
    4
) ON CONFLICT (email) DO NOTHING;

INSERT INTO routines (id, user_id, name, description, day_of_week, frequency_days)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Día 1 — Empuje e Hipertrofia',
    'Enfoque principal en tensión mecánica alta en press con barra y tempo controlado concéntrico. Asegura 2-3 min de descanso en series pesadas.',
    1,
    4
) ON CONFLICT (id) DO NOTHING;

INSERT INTO exercises (id, routine_id, name, target_muscle, secondary_muscles, target_sets, target_reps_min, target_reps_max, target_weight, rest_seconds, notes, image_url, order_index)
VALUES 
(
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Press de Banca Plano con Barra',
    'Pecho',
    ARRAY['Tríceps', 'Deltoides Frontal'],
    4, 8, 10, 85.00, 120,
    'Pausa técnica de 1 seg en pecho • Agarre ligeramente fuera del ancho de hombros',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDm9kGEUoRtnp3Y4UxpgtSmI_qM2SuFNXm9A8EEtxjBn-ofqM0DH9ouUTB0Mafo1MF0ShU3cNGtRCdHwahneyowYylJLKwBSSyFNaFI4mjSpzhyd6X4nCuvsa6FdS5jbgjhArpqVliKFAE9quuF1s7W0kW_qI-kQGRT1LzFy9k_pCD64aHqXropLunD1a9mQkSo2DTloliXJK7Isng8UYlhteY2p8FHBnPN194attUjU70384tVJGEU',
    1
),
(
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Sentadilla Trasera con Barra',
    'Cuádriceps',
    ARRAY['Glúteos', 'Core'],
    4, 6, 8, 110.00, 150,
    'Profundidad paralela sólida • Barra alta con respiración diafragmática Valsalva',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGM7wu9RZssz5EkK6yVKLZ_R1O16WkMRt39s0QyvMgC9dZNsxZ7vQgLnJ0H4HL0dwTA_4cWo23PUkBXWxclxfBrMr_XRSHD07JhnA5_LvnAArNn2eU2of_ysiYsKvyQ6hhuEjnggoUH7WGHNfF4rYF4CEtCscVHwKCEyntaKrnS5NtXcdMr520d83oTJGPRhbGOhxYqHXKy_5nomT_xHfrNXMyKsSbys7Z4okbYt-WIbNUzvgFR0nr',
    2
),
(
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Press Militar Sentado con Mancuernas',
    'Hombros',
    ARRAY['Deltoides Lateral', 'Estabilizadores'],
    3, 10, 12, 24.00, 90,
    'Banco a 75° para protección acromial • Trayectoria ligeramente curva natural',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgkFTCnkaNNDetryekLiFWdie5ipHZbOYAVSFUYYzRasWRDXhjAoRNe2B2aHxPS04LfNLZNWQ5bWVbw-x4RtIlxEZpfLciYXEm7ogJgekl1Pgs_mEwX8CZPyScTXxdiuivW8bTCWQfpdRG6AbL6OmEay4t52YdtksMw26959De1JECrfxpgEwMpMAKOB2pn2vtZF0ZZhr5UM0IY1Jd3CRG28mrNJXS4QH9ufqkfeTR_nLKpzTWm_o',
    3
) ON CONFLICT (id) DO NOTHING;

-- Initial logs for today's session
INSERT INTO workout_logs (user_id, routine_id, exercise_id, set_number, reps_completed, weight_used, rpe, is_personal_record, log_date)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 1, 10, 82.50, 8.0, false, CURRENT_DATE),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 2, 9, 85.00, 8.5, false, CURRENT_DATE),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 3, 8, 87.50, 9.0, true, CURRENT_DATE);
