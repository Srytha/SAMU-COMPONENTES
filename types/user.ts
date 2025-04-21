// types/user.ts
export type UserRole = 'Administrador' | 'Paciente' | 'Operador';
export type AccountStatus = 'Activo' | 'Inactivo';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  registrationDate: string;
  avatarUrl?: string;
}

export type UserFilters = {
  status?: AccountStatus;
  searchTerm?: string;
  registrationPeriod?: 'hoy' | 'semana' | 'mes';
};