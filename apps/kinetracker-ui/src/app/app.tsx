import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { MetricCards } from '../components/MetricCards';
import { ExerciseCard } from '../components/ExerciseCard';
import { LoggingModal } from '../components/LoggingModal';
import { CreateRoutineModal } from '../components/CreateRoutineModal';
import {
  createRoutine,
  createWorkoutLog,
  fetchExercises,
  fetchRoutines,
  fetchWorkoutLogs,
  initialUser,
} from '../services/api';
import { Exercise, Routine, User, WorkoutLog } from '../types';

export function App() {
  const [user] = useState<User>(initialUser);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [activeTab, setActiveTab] = useState<string>('hoy');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showCreateRoutineModal, setShowCreateRoutineModal] = useState<boolean>(false);
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('Todos');

  // Load initial data from API (or fallback)
  useEffect(() => {
    async function loadData() {
      const [r, e, l] = await Promise.all([
        fetchRoutines(),
        fetchExercises(),
        fetchWorkoutLogs(),
      ]);
      setRoutines(r);
      setExercises(e);
      setLogs(l);
    }
    loadData();
  }, []);

  const currentRoutine = routines[0] || {
    id: 'default-routine',
    user_id: user.id,
    name: 'Sesión de Hoy: Día 1 — Empuje e Hipertrofia',
    description:
      'Enfoque principal en tensión mecánica alta en press con barra y tempo controlado concéntrico. Asegura 2-3 min de descanso en series pesadas.',
    frequency_days: 4,
  };

  // Metrics computation
  const todayLogs = logs.filter((l) => l.log_date === new Date().toISOString().split('T')[0]);
  const completedExercisesCount = exercises.filter((e) => {
    const exerciseLogs = todayLogs.filter((l) => l.exercise_id === e.id);
    return exerciseLogs.length >= e.target_sets;
  }).length;

  const totalVolumeKg = todayLogs.reduce((acc, log) => acc + log.weight_used * log.reps_completed, 0);

  const handleSaveLog = async (logData: Omit<WorkoutLog, 'id'>) => {
    const saved = await createWorkoutLog(logData);
    setLogs((prev) => [...prev, saved]);
  };

  const handleCreateRoutine = async (routineData: Omit<Routine, 'id'>) => {
    const created = await createRoutine(routineData);
    setRoutines((prev) => [...prev, created]);
  };

  const muscleGroups = ['Todos', 'Pecho', 'Cuádriceps', 'Hombros', 'Espalda', 'Bíceps', 'Tríceps'];
  const filteredExercises =
    selectedMuscleFilter === 'Todos'
      ? exercises
      : exercises.filter((e) => e.target_muscle.toLowerCase() === selectedMuscleFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col relative selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Navbar */}
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickLog={() => {
          if (exercises.length > 0) {
            setSelectedExercise(exercises[0]);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="w-full pt-16 bg-surface min-h-[calc(100vh-64px)] pb-space-2xl">
        <div className="flex flex-col w-full relative">
          {/* Subtle Ambient Glow Orbs from DESIGN.md */}
          <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[140px] pointer-events-none -z-0" />
          <div className="absolute top-80 right-10 w-80 h-80 bg-secondary-container/10 rounded-full blur-[120px] pointer-events-none -z-0" />

          <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl flex flex-col gap-space-xl z-10">
            {/* TAB 1: HOY (MI RUTINA) */}
            {activeTab === 'hoy' && (
              <>
                {/* Top Action Bar & Page Intent */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-surface-container-high text-primary font-label text-xs uppercase tracking-wider font-bold border border-primary/20">
                      <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                      EN VIVO • SESIÓN ACTIVA
                    </span>
                    <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-label text-xs font-semibold">
                      <span className="material-symbols-outlined text-[15px] text-secondary">tune</span>
                      Frecuencia: {currentRoutine.frequency_days} Días / Semana
                    </span>
                    <span className="text-body text-xs text-on-surface-variant/80 hidden sm:inline">
                      • Sesión 1 de {currentRoutine.frequency_days} completando el microciclo
                    </span>
                  </div>

                  <div className="flex items-center gap-space-sm">
                    <button
                      onClick={() => setShowCreateRoutineModal(true)}
                      type="button"
                      className="group flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label text-sm transition-all duration-200 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary group-hover:rotate-90 transition-transform duration-300">
                        add_circle
                      </span>
                      <span>Crear Nueva Rutina</span>
                    </button>
                  </div>
                </div>

                {/* Hero Routine Banner */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg bg-surface-container-low rounded-xl p-space-lg border border-surface-container-high/40 relative overflow-hidden shadow-sm">
                  <div className="flex flex-col gap-space-xs z-10">
                    <div className="flex items-center gap-space-sm text-primary font-label text-xs uppercase tracking-widest font-extrabold">
                      <span>PROGRAMA HIPERTROFIA 2026</span>
                      <span className="text-on-surface-variant/40">/</span>
                      <span>BLOQUE A • FASE DE FUERZA</span>
                    </div>
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                      {currentRoutine.name}
                    </h1>
                    <p className="font-body text-sm text-on-surface-variant max-w-2xl">
                      {currentRoutine.description}
                    </p>
                  </div>

                  {/* Volume Progress Bar */}
                  <div className="flex flex-col gap-space-xs lg:min-w-[260px] z-10 bg-surface-container/60 p-space-md rounded-lg border border-surface-container-high/40">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-on-surface-variant">Volumen de Sesión</span>
                      <span className="font-headline text-sm text-primary font-bold">
                        {exercises.length > 0
                          ? Math.round((completedExercisesCount / exercises.length) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-secondary to-primary-container h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            exercises.length > 0
                              ? Math.round((completedExercisesCount / exercises.length) * 100)
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="font-label text-[11px] text-on-surface-variant/70 text-right">
                      {completedExercisesCount} de {exercises.length} completados
                    </span>
                  </div>

                  {/* Background decoration watermark */}
                  <span className="material-symbols-outlined absolute -bottom-10 right-4 text-[180px] text-surface-container-highest/15 select-none pointer-events-none -z-0">
                    fitness_center
                  </span>
                </div>

                {/* KPI Metrics */}
                <MetricCards
                  completedExercises={completedExercisesCount}
                  totalExercises={exercises.length}
                  totalVolumeKg={totalVolumeKg}
                  sessionTimeMin="42:15"
                />

                {/* Exercises List */}
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <h2 className="font-headline text-xl font-bold text-on-surface flex items-center gap-space-xs">
                      <span>Ejercicios Programados</span>
                      <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label text-xs font-semibold">
                        {exercises.length} en rutina
                      </span>
                    </h2>
                    <span className="font-body text-xs text-on-surface-variant hidden sm:inline">
                      Haz clic en cualquier tarjeta para registrar series con sobrecarga progresiva
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-space-md">
                    {exercises.map((exercise) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        logs={todayLogs}
                        onSelect={(ex) => setSelectedExercise(ex)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: CREAR RUTINA */}
            {activeTab === 'crear-rutina' && (
              <div className="flex flex-col gap-space-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-headline text-2xl font-bold text-on-surface">
                      Gestor de Rutinas y Frecuencias
                    </h1>
                    <p className="font-body text-sm text-on-surface-variant">
                      Configura divisiones semanales de entrenamiento y sobrecarga progresiva
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCreateRoutineModal(true)}
                    type="button"
                    className="flex items-center gap-1.5 px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label text-sm font-bold shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Nueva Rutina
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {routines.map((routine) => (
                    <div
                      key={routine.id}
                      className="bg-surface-container rounded-xl p-space-lg border border-surface-container-high/50 flex flex-col justify-between gap-space-md"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="px-space-sm py-0.5 rounded bg-primary-container/20 text-primary font-label text-xs font-bold uppercase">
                            Frecuencia: {routine.frequency_days} Días
                          </span>
                          <span className="text-xs text-on-surface-variant font-semibold">
                            Día {routine.day_of_week || 1}
                          </span>
                        </div>
                        <h3 className="font-headline text-xl font-bold text-on-surface">
                          {routine.name}
                        </h3>
                        <p className="font-body text-xs text-on-surface-variant">
                          {routine.description || 'Sin descripción'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-space-sm border-t border-surface-container-high/40">
                        <span className="text-xs text-secondary font-semibold">
                          {exercises.filter((e) => e.routine_id === routine.id).length} Ejercicios vinculados
                        </span>
                        <button
                          onClick={() => setActiveTab('hoy')}
                          type="button"
                          className="px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-xs font-bold text-on-surface cursor-pointer"
                        >
                          Iniciar Sesión
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CATÁLOGO DE EJERCICIOS */}
            {activeTab === 'ejercicios' && (
              <div className="flex flex-col gap-space-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                  <div>
                    <h1 className="font-headline text-2xl font-bold text-on-surface">
                      Catálogo Biomecánico de Ejercicios
                    </h1>
                    <p className="font-body text-sm text-on-surface-variant">
                      Consulta ejercicios con especificaciones de series, repeticiones y tiempo de descanso
                    </p>
                  </div>
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap items-center gap-space-xs">
                  {muscleGroups.map((muscle) => (
                    <button
                      key={muscle}
                      onClick={() => setSelectedMuscleFilter(muscle)}
                      type="button"
                      className={`px-space-md py-1.5 rounded-full font-label text-xs font-bold transition-all cursor-pointer ${
                        selectedMuscleFilter === muscle
                          ? 'bg-primary-container text-on-primary-container shadow-md'
                          : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {muscle}
                    </button>
                  ))}
                </div>

                {/* Filtered Exercise Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise)}
                      className="bg-surface-container rounded-xl overflow-hidden border border-surface-container-high/40 shadow-sm hover:border-primary/50 transition-all cursor-pointer flex flex-col"
                    >
                      <div className="h-40 relative overflow-hidden">
                        <img
                          alt={exercise.name}
                          src={exercise.image_url}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/80 text-primary text-xs font-bold uppercase">
                          {exercise.target_muscle}
                        </span>
                      </div>
                      <div className="p-space-md flex-1 flex flex-col justify-between gap-space-sm">
                        <div>
                          <h3 className="font-headline text-lg font-bold text-on-surface">
                            {exercise.name}
                          </h3>
                          <p className="font-body text-xs text-on-surface-variant mt-1 line-clamp-2">
                            {exercise.notes}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-high/40 text-xs font-bold text-secondary">
                          <span>{exercise.target_sets} Series × {exercise.target_reps_min}-{exercise.target_reps_max}</span>
                          <span className="text-primary">{exercise.target_weight} kg</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: HISTORIAL DE REGISTROS */}
            {activeTab === 'historial' && (
              <div className="flex flex-col gap-space-lg">
                <div>
                  <h1 className="font-headline text-2xl font-bold text-on-surface">
                    Historial de Registros Diarios
                  </h1>
                  <p className="font-body text-sm text-on-surface-variant">
                    Registro de series, sobrecargas progresivas y récords personales almacenados
                  </p>
                </div>

                <div className="bg-surface-container rounded-xl border border-surface-container-high/50 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-surface-container-high text-on-surface-variant font-label text-xs uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Fecha</th>
                          <th className="py-3 px-4">Ejercicio</th>
                          <th className="py-3 px-4 text-center">Serie</th>
                          <th className="py-3 px-4 text-right">Peso (kg)</th>
                          <th className="py-3 px-4 text-right">Reps</th>
                          <th className="py-3 px-4 text-center">RPE</th>
                          <th className="py-3 px-4 text-center">Récord (PR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high/40">
                        {logs.map((log) => {
                          const ex = exercises.find((e) => e.id === log.exercise_id);
                          return (
                            <tr key={log.id} className="hover:bg-surface-container-high/30 transition-colors">
                              <td className="py-3 px-4 text-on-surface-variant font-mono text-xs">
                                {log.log_date}
                              </td>
                              <td className="py-3 px-4 font-bold text-on-surface">
                                {ex?.name || 'Ejercicio'}
                              </td>
                              <td className="py-3 px-4 text-center font-bold text-primary">
                                #{log.set_number}
                              </td>
                              <td className="py-3 px-4 text-right font-bold text-on-surface tabular-nums">
                                {log.weight_used} kg
                              </td>
                              <td className="py-3 px-4 text-right font-bold text-secondary tabular-nums">
                                {log.reps_completed}
                              </td>
                              <td className="py-3 px-4 text-center text-xs text-on-surface-variant font-semibold">
                                {log.rpe ? `@ ${log.rpe}` : '—'}
                              </td>
                              <td className="py-3 px-4 text-center">
                                {log.is_personal_record ? (
                                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary text-xs font-bold">
                                    PR 🔥
                                  </span>
                                ) : (
                                  <span className="text-on-surface-variant/40">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Logging Modal */}
      {selectedExercise && (
        <LoggingModal
          exercise={selectedExercise}
          routineId={currentRoutine.id}
          userId={user.id}
          existingLogs={todayLogs}
          onClose={() => setSelectedExercise(null)}
          onSaveLog={handleSaveLog}
        />
      )}

      {/* Create Routine Modal */}
      {showCreateRoutineModal && (
        <CreateRoutineModal
          userId={user.id}
          onClose={() => setShowCreateRoutineModal(false)}
          onCreate={handleCreateRoutine}
        />
      )}
    </div>
  );
}

export default App;
