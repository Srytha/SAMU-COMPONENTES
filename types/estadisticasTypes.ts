export type ServiceStats = {
  servicio: string;
  prioritario: { total: number; porcentaje: number };
  general: { total: number; porcentaje: number };
};

export type UserRequest = {
  usuario_id: number;
  nombre: string;
  solicitudes: number;
  porcentaje: number;
};

export type ServiceTypes = {
  prioritario: { total: number; porcentaje: number };
  general: { total: number; porcentaje: number };
};

export type PerformancePoint = {
  punto_atencion: string;
  total_turnos: number;
  total_atendidos: number;
  porcentaje_atendidos: number;
};

export type TabItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
   color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
};