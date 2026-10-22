import React, { useState } from 'react';
import { Routine } from '../types';

interface CreateRoutineModalProps {
  userId: string;
  onClose: () => void;
  onCreate: (routine: Omit<Routine, 'id'>) => Promise<void>;
}

export const CreateRoutineModal: React.FC<CreateRoutineModalProps> = ({
  userId,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<number>(4);
  const [dayOfWeek, setDayOfWeek] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const daysOptions = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 7, label: 'Domingo' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    await onCreate({
      user_id: userId,
      name,
      description,
      frequency_days: frequency,
      day_of_week: dayOfWeek,
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl">
      <div className="relative w-full max-w-xl bg-surface-container-low rounded-2xl border border-surface-container-high/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden p-space-xl flex flex-col gap-space-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label text-xs uppercase tracking-wider text-primary font-bold">
              PROGRAMACIÓN BIOMECÁNICA
            </span>
            <h2 className="font-headline text-2xl font-bold text-on-surface">
              Crear Nueva Rutina
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Weekly Frequency Selector from DESIGN.md */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-xs uppercase text-on-surface-variant font-bold">
              Frecuencia Semanal (Días por microciclo)
            </label>
            <div className="grid grid-cols-4 gap-space-xs p-1 rounded-xl bg-surface-container border border-surface-container-high/50">
              {[3, 4, 5, 6].map((freq) => {
                const isSelected = frequency === freq;
                return (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    className={`py-2 rounded-lg font-label text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-container shadow-md glow-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {freq} Días
                  </button>
                );
              })}
            </div>
          </div>

          {/* Routine Name */}
          <div className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase text-on-surface-variant font-semibold">
              Nombre de la Rutina
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Día 2 — Tracción e Isquios"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2.5 px-3 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-highest focus:border-primary outline-none text-sm font-medium"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase text-on-surface-variant font-semibold">
              Descripción / Directivas Técnicas
            </label>
            <textarea
              rows={3}
              placeholder="Enfoque en tensión de dorsales, peso muerto rumano y RPE controlado..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="py-2 px-3 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-highest focus:border-primary outline-none text-sm resize-none"
            />
          </div>

          {/* Day of Week */}
          <div className="flex flex-col gap-1">
            <label className="font-label text-xs uppercase text-on-surface-variant font-semibold">
              Día Preferente
            </label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(parseInt(e.target.value, 10))}
              className="py-2.5 px-3 rounded-lg bg-surface-container-high text-on-surface border border-surface-container-highest focus:border-primary outline-none text-sm font-semibold cursor-pointer"
            >
              {daysOptions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-space-sm pt-space-md">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label text-sm transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-space-lg py-space-sm rounded-lg bg-primary-container hover:bg-[#ff6b2c] text-on-primary-container font-label text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              {loading ? 'Guardando...' : 'Crear Rutina'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
