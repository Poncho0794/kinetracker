import React from 'react';

interface MetricCardsProps {
  completedExercises: number;
  totalExercises: number;
  totalVolumeKg: number;
  sessionTimeMin: string;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  completedExercises,
  totalExercises,
  totalVolumeKg,
  sessionTimeMin,
}) => {
  const percentage = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      {/* Card 1: Progreso del Día */}
      <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between border border-surface-container-high/40 shadow-sm hover:border-primary/30 transition-colors">
        <div className="flex flex-col gap-1">
          <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold">
            Progreso del Día
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-metric text-3xl font-extrabold text-on-surface tabular-nums">
              {completedExercises}
              <span className="text-on-surface-variant text-xl font-normal">/{totalExercises}</span>
            </span>
            <span className="font-label text-sm text-primary font-semibold">Ejercicios</span>
          </div>
          <span className="text-body text-xs text-on-surface-variant">
            {percentage}% del entrenamiento ejecutado
          </span>
        </div>

        <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-surface-container-highest"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <path
              className="text-primary-container"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </svg>
          <span
            className="material-symbols-outlined absolute text-[20px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            task_alt
          </span>
        </div>
      </div>

      {/* Card 2: Volumen Acumulado */}
      <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between border border-surface-container-high/40 shadow-sm hover:border-secondary/30 transition-colors">
        <div className="flex flex-col gap-1">
          <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold">
            Volumen Acumulado
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-metric text-3xl font-extrabold text-on-surface tabular-nums">
              {totalVolumeKg.toLocaleString()}
            </span>
            <span className="font-label text-sm text-secondary font-semibold">kg</span>
          </div>
          <span className="text-body text-xs text-secondary flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            +320 kg vs semana anterior
          </span>
        </div>

        <div className="w-12 h-12 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary-container shrink-0">
          <span className="material-symbols-outlined text-[26px]">weight</span>
        </div>
      </div>

      {/* Card 3: Tiempo de Sesión */}
      <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between border border-surface-container-high/40 shadow-sm hover:border-tertiary/30 transition-colors">
        <div className="flex flex-col gap-1">
          <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold">
            Tiempo de Sesión
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-metric text-3xl font-extrabold text-on-surface tabular-nums">
              {sessionTimeMin}
            </span>
            <span className="font-label text-sm text-tertiary font-semibold">min</span>
          </div>
          <span className="text-body text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-tertiary">timer</span>
            Descanso sugerido: 90s
          </span>
        </div>

        <div className="w-12 h-12 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
          <span className="material-symbols-outlined text-[26px]">pace</span>
        </div>
      </div>
    </div>
  );
};
