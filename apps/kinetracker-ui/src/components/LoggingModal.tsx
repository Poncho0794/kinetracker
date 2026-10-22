import React, { useState } from 'react';
import { Exercise, WorkoutLog } from '../types';

interface LoggingModalProps {
  exercise: Exercise;
  routineId: string;
  userId: string;
  existingLogs: WorkoutLog[];
  onClose: () => void;
  onSaveLog: (log: Omit<WorkoutLog, 'id'>) => Promise<void>;
}

export const LoggingModal: React.FC<LoggingModalProps> = ({
  exercise,
  routineId,
  userId,
  existingLogs,
  onClose,
  onSaveLog,
}) => {
  // Current set inputs
  const nextSetNumber = existingLogs.filter((l) => l.exercise_id === exercise.id).length + 1;
  const [currentSet, setCurrentSet] = useState(nextSetNumber <= exercise.target_sets ? nextSetNumber : 1);
  const [weight, setWeight] = useState<number>(exercise.target_weight || 80);
  const [reps, setReps] = useState<number>(exercise.target_reps_min || 8);
  const [rpe, setRpe] = useState<number>(8.5);
  const [isPR, setIsPR] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  // Quick weight increment helper
  const addWeight = (delta: number) => {
    setWeight((prev) => Math.max(0, Math.round((prev + delta) * 100) / 100));
  };

  const handleLogCurrentSet = async () => {
    setSaving(true);
    await onSaveLog({
      user_id: userId,
      routine_id: routineId,
      exercise_id: exercise.id,
      set_number: currentSet,
      reps_completed: reps,
      weight_used: weight,
      rpe: rpe,
      is_personal_record: isPR,
      log_date: new Date().toISOString().split('T')[0],
      notes: notes || undefined,
    });
    setSaving(false);
    if (currentSet < exercise.target_sets) {
      setCurrentSet((prev) => prev + 1);
    }
  };

  const exerciseLogs = existingLogs.filter((l) => l.exercise_id === exercise.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-surface-container-low rounded-2xl border border-surface-container-high/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Header with image backdrop */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0">
          <img
            alt={exercise.name}
            src={
              exercise.image_url ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDm9kGEUoRtnp3Y4UxpgtSmI_qM2SuFNXm9A8EEtxjBn-ofqM0DH9ouUTB0Mafo1MF0ShU3cNGtRCdHwahneyowYylJLKwBSSyFNaFI4mjSpzhyd6X4nCuvsa6FdS5jbgjhArpqVliKFAE9quuF1s7W0kW_qI-kQGRT1LzFy9k_pCD64aHqXropLunD1a9mQkSo2DTloliXJK7Isng8UYlhteY2p8FHBnPN194attUjU70384tVJGEU'
            }
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/70 to-surface-container-lowest/40" />

          {/* Top Bar with Badge and Close */}
          <div className="absolute top-space-md left-space-md right-space-md flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="px-space-sm py-1 rounded bg-primary-container text-on-primary-container font-label text-xs uppercase font-extrabold tracking-wider">
                REGISTRO EN CURSO
              </span>
              <span className="px-space-sm py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md text-on-surface-variant font-label text-xs font-semibold">
                Serie {currentSet} de {exercise.target_sets}
              </span>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-surface-container-lowest/80 hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Title Area */}
          <div className="absolute bottom-space-md left-space-md right-space-md flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
            <div>
              <div className="flex items-center gap-space-xs mb-1">
                <span className="font-label text-xs text-primary font-bold uppercase tracking-wider">
                  {exercise.target_muscle}
                </span>
                <span className="text-on-surface-variant/60 text-xs">•</span>
                <span className="text-xs text-secondary font-medium">
                  Meta: {exercise.target_weight} kg × {exercise.target_reps_min}-{exercise.target_reps_max}
                </span>
              </div>
              <h2 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight">
                {exercise.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Quick adjustment chips */}
        <div className="px-space-lg py-space-sm bg-surface-container flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-container-high/40">
          <span className="font-label text-xs text-on-surface-variant font-bold uppercase tracking-wider">
            Ajuste Rápido de Carga:
          </span>
          <div className="flex items-center gap-space-xs">
            <button
              onClick={() => addWeight(1.25)}
              type="button"
              className="px-space-sm py-1 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-label text-xs font-semibold transition-colors cursor-pointer"
            >
              +1.25 kg
            </button>
            <button
              onClick={() => addWeight(2.5)}
              type="button"
              className="px-space-sm py-1 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-label text-xs font-semibold transition-colors cursor-pointer"
            >
              +2.5 kg
            </button>
            <button
              onClick={() => addWeight(5.0)}
              type="button"
              className="px-space-sm py-1 rounded bg-surface-container-high hover:bg-surface-bright text-primary font-label text-xs font-bold transition-colors cursor-pointer"
            >
              +5.0 kg
            </button>
            <button
              onClick={() => addWeight(20.0)}
              type="button"
              className="px-space-sm py-1 rounded bg-surface-container-high hover:bg-surface-bright text-secondary font-label text-xs font-semibold transition-colors cursor-pointer"
            >
              +20 kg (Platos)
            </button>
          </div>
        </div>

        {/* Interactive Logging Form */}
        <div className="p-space-lg flex flex-col gap-space-md">
          {/* Steppers Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md bg-surface-container rounded-xl p-space-md border border-surface-container-high/40">
            {/* Set Selection */}
            <div className="flex flex-col gap-1">
              <label className="font-label text-xs text-on-surface-variant uppercase font-semibold">
                Número de Serie
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].slice(0, Math.max(exercise.target_sets, 4)).map((s) => {
                  const isLogged = exerciseLogs.some((l) => l.set_number === s);
                  const isSelected = currentSet === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setCurrentSet(s)}
                      type="button"
                      className={`flex-1 py-1.5 rounded text-sm font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary-container text-on-primary-container shadow-md'
                          : isLogged
                          ? 'bg-surface-container-high text-primary border border-primary/40'
                          : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Weight Input with Stepper */}
            <div className="flex flex-col gap-1">
              <label className="font-label text-xs text-on-surface-variant uppercase font-semibold">
                Carga Usada (kg)
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => addWeight(-2.5)}
                  type="button"
                  className="w-9 h-9 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <input
                  type="number"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full py-1.5 px-2 text-center font-bold text-on-surface bg-surface-container-highest rounded text-lg outline-none border border-transparent focus:border-primary tabular-nums"
                />
                <button
                  onClick={() => addWeight(2.5)}
                  type="button"
                  className="w-9 h-9 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>

            {/* Reps Input with Stepper */}
            <div className="flex flex-col gap-1">
              <label className="font-label text-xs text-on-surface-variant uppercase font-semibold">
                Repeticiones
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setReps((r) => Math.max(1, r - 1))}
                  type="button"
                  className="w-9 h-9 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(parseInt(e.target.value, 10) || 0)}
                  className="w-full py-1.5 px-2 text-center font-bold text-on-surface bg-surface-container-highest rounded text-lg outline-none border border-transparent focus:border-primary tabular-nums"
                />
                <button
                  onClick={() => setReps((r) => r + 1)}
                  type="button"
                  className="w-9 h-9 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* RPE & PR toggles */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-2">
                <span className="font-label text-xs text-on-surface-variant font-semibold">RPE:</span>
                <select
                  value={rpe}
                  onChange={(e) => setRpe(parseFloat(e.target.value))}
                  className="bg-surface-container-high text-on-surface text-xs font-bold rounded px-2 py-1 outline-none border border-surface-container-highest cursor-pointer"
                >
                  <option value={7.0}>RPE 7.0 (3 en reserva)</option>
                  <option value={8.0}>RPE 8.0 (2 en reserva)</option>
                  <option value={8.5}>RPE 8.5 (1-2 en reserva)</option>
                  <option value={9.0}>RPE 9.0 (1 en reserva)</option>
                  <option value={9.5}>RPE 9.5 (al límite)</option>
                  <option value={10.0}>RPE 10.0 (Fallo muscular)</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPR}
                  onChange={(e) => setIsPR(e.target.checked)}
                  className="accent-primary w-4 h-4 rounded cursor-pointer"
                />
                <span className="font-label text-xs font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  Récord Personal (PR)
                </span>
              </label>
            </div>

            <button
              onClick={handleLogCurrentSet}
              disabled={saving}
              type="button"
              className="flex items-center gap-2 px-space-lg py-space-sm rounded-lg bg-primary-container hover:bg-[#ff6b2c] text-on-primary-container font-label text-sm font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {saving ? 'sync' : 'check_circle'}
              </span>
              <span>{saving ? 'Guardando...' : `Registrar Serie #${currentSet}`}</span>
            </button>
          </div>

          {/* History of logged sets for this exercise */}
          {exerciseLogs.length > 0 && (
            <div className="mt-space-sm flex flex-col gap-1 border-t border-surface-container-high/40 pt-space-sm">
              <span className="font-label text-xs text-on-surface-variant uppercase font-bold">
                Series registradas hoy:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                {exerciseLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-space-sm rounded bg-surface-container border border-surface-container-high/40"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary font-bold text-xs flex items-center justify-center">
                        {log.set_number}
                      </span>
                      <span className="font-body text-sm font-bold text-on-surface tabular-nums">
                        {log.weight_used} kg × {log.reps_completed} reps
                      </span>
                      {log.rpe && (
                        <span className="text-xs text-on-surface-variant font-semibold">
                          @ RPE {log.rpe}
                        </span>
                      )}
                    </div>
                    {log.is_personal_record && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary text-[11px] font-bold">
                        PR 🔥
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
