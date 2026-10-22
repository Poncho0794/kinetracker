import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickLog: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenQuickLog,
}) => {
  const navItems = [
    { id: 'hoy', label: 'Hoy (Mi Rutina)' },
    { id: 'crear-rutina', label: 'Crear Rutina' },
    { id: 'ejercicios', label: 'Ejercicios' },
    { id: 'historial', label: 'Historial' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
        {/* Brand / Logo */}
        <div className="flex items-center gap-space-lg">
          <div
            className="flex items-center gap-space-sm cursor-pointer select-none"
            onClick={() => setActiveTab('hoy')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-container to-secondary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px] text-surface font-bold">
                fitness_center
              </span>
            </div>
            <span className="font-headline text-lg tracking-tight text-on-surface font-extrabold">
              KineTracker
            </span>
            <span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-label text-[11px] uppercase tracking-wider font-bold">
              PRO
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-space-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  type="button"
                  className={`px-space-md py-space-sm rounded-lg font-label text-sm transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-surface-container-high text-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-space-md">
          <button
            onClick={onOpenQuickLog}
            type="button"
            className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary-container hover:bg-[#ff6b2c] text-on-primary-container font-label text-sm font-bold shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Registrar Serie</span>
          </button>

          <div className="flex items-center gap-space-sm pl-space-sm border-l border-surface-container-high/50">
            <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container text-secondary font-label text-xs font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary-container">
                local_fire_department
              </span>
              <span>{user.weekly_goal_days} días/sem</span>
            </div>

            <img
              alt={user.name}
              src={user.avatar_url}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
