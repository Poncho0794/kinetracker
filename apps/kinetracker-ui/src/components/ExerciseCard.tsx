import React from 'react';
import { Exercise, WorkoutLog } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  logs: WorkoutLog[];
  onSelect: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  logs,
  onSelect,
}) => {
  const completedSets = logs.filter((l) => l.exercise_id === exercise.id).length;
  const isComplete = completedSets >= exercise.target_sets;
  const inProgress = completedSets > 0 && !isComplete;

  const lastLog = logs.filter((l) => l.exercise_id === exercise.id).slice(-1)[0];
  const lastWeight = lastLog ? `${lastLog.weight_used} kg × ${lastLog.reps_completed} reps` : 'Sin registros hoy';

  return (
    <div
      onClick={() => onSelect(exercise)}
      className={`rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
        isComplete
          ? 'bg-surface-container-high border-primary/40 shadow-md'
          : inProgress
          ? 'bg-surface-container border-secondary/40 shadow-sm hover:border-secondary'
          : 'bg-surface-container border-surface-container-high/40 shadow-sm hover:border-surface-bright'
      }`}
    >
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Left Image Banner */}
        <div className="md:w-72 h-44 md:h-auto relative overflow-hidden shrink-0">
          <img
            alt={exercise.name}
            src={
              exercise.image_url ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDm9kGEUoRtnp3Y4UxpgtSmI_qM2SuFNXm9A8EEtxjBn-ofqM0DH9ouUTB0Mafo1MF0ShU3cNGtRCdHwahneyowYylJLKwBSSyFNaFI4mjSpzhyd6X4nCuvsa6FdS5jbgjhArpqVliKFAE9quuF1s7W0kW_qI-kQGRT1LzFy9k_pCD64aHqXropLunD1a9mQkSo2DTloliXJK7Isng8UYlhteY2p8FHBnPN194attUjU70384tVJGEU'
            }
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-container via-surface-container/50 to-transparent" />
          <span className="absolute top-space-sm left-space-sm px-space-sm py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label text-[11px] uppercase font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">star</span>
            {exercise.target_muscle}
          </span>
        </div>

        {/* Content Area */}
        <div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
            <div>
              <div className="flex flex-wrap items-center gap-space-xs mb-1">
                <span className="px-space-sm py-0.5 rounded bg-primary-container/20 text-primary font-label text-xs font-bold">
                  {exercise.target_muscle}
                </span>
                {exercise.secondary_muscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-space-sm py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label text-xs font-semibold"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <h3 className="font-headline text-xl font-bold text-on-surface">
                {exercise.name}
              </h3>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">
                {exercise.notes || 'Control del tempo excéntrico y tensión muscular constante'}
              </p>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-space-xs self-start sm:self-auto">
              {isComplete ? (
                <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-primary-container/20 text-primary font-label text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Completado ({completedSets}/{exercise.target_sets} series)
                </span>
              ) : inProgress ? (
                <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-secondary-container/20 text-secondary font-label text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  En progreso ({completedSets}/{exercise.target_sets} series)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">radio_button_unchecked</span>
                  Pendiente (0/{exercise.target_sets})
                </span>
              )}
            </div>
          </div>

          {/* Sets Target Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm p-space-sm rounded-lg bg-surface-container-low border border-surface-container-high/30">
            <div className="flex flex-col">
              <span className="font-label text-[11px] text-on-surface-variant uppercase">Estructura</span>
              <span className="font-body text-sm font-bold text-on-surface">
                {exercise.target_sets} Series × {exercise.target_reps_min}-{exercise.target_reps_max} Reps
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label text-[11px] text-on-surface-variant uppercase">Carga Meta</span>
              <span className="font-body text-sm font-bold text-primary tabular-nums">
                {exercise.target_weight > 0 ? `${exercise.target_weight} kg` : 'Autocarga'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label text-[11px] text-on-surface-variant uppercase">Último Registro</span>
              <span className="font-body text-sm font-semibold text-on-surface tabular-nums">
                {lastWeight}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label text-[11px] text-on-surface-variant uppercase">Descanso</span>
              <span className="font-body text-sm font-bold text-secondary tabular-nums">
                {exercise.rest_seconds}s
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-space-xs">
            <span className="font-label text-xs text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">touch_app</span>
              Toca para registrar o editar series
            </span>
            <button
              type="button"
              className={`flex items-center gap-1.5 px-space-md py-space-sm rounded-lg font-label text-xs font-bold transition-all ${
                isComplete
                  ? 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                  : 'bg-primary-container text-on-primary-container hover:opacity-90'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isComplete ? 'edit_note' : 'play_arrow'}
              </span>
              <span>{isComplete ? 'Ver Series' : 'Registrar Serie'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
