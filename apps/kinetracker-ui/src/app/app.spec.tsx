import { render, screen } from '@testing-library/react';
import App from './app';

describe('KineTracker App UI', () => {
  it('should render brand name and PRO badge', () => {
    render(<App />);
    expect(screen.getByText('KineTracker')).toBeTruthy();
    expect(screen.getByText('PRO')).toBeTruthy();
  });

  it('should render navigation tabs according to DESIGN.md', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'Hoy (Mi Rutina)' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Crear Rutina' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Ejercicios' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Historial' })).toBeTruthy();
  });

  it('should render session status and action buttons', () => {
    render(<App />);
    expect(screen.getByText(/EN VIVO • SESIÓN ACTIVA/i)).toBeTruthy();
    expect(screen.getByText(/Progreso del Día/i)).toBeTruthy();
  });
});
