import { Progress } from "@/components/ui/progress";
import { ReactElement } from "react";


/* 

Que hace esta cosa ;-; 

Función principal:
Visualización de distribución de turnos por servicio.

Tiene una lista de datos (como "Consulta General", "Farmacia", etc.) con valores porcentuales.

Por cada dato, muestra:

El nombre de la categoría

El porcentaje

Una barra de progreso que visualiza ese porcentaje y yap

*/

interface Stat {
  label: string;
  value: number;
}

export const DailyStats = (): ReactElement => {
  const stats: Stat[] = [
    { label: "Consulta General", value: 45 },
    { label: "Consulta Especializada", value: 25 },
    { label: "Laboratorio", value: 15 },
    { label: "Farmacia", value: 10 },
    { label: "Urgencias", value: 5 },
  ];

  return (
    <div className="space-y-4">
      {stats.map((stat: Stat, index: number) => (
        <div key={index}>
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium">{stat.label}</div>
            <div className="text-sm font-medium">{stat.value}%</div>
          </div>
          <Progress value={stat.value} className="h-2" />
        </div>
      ))}
    </div>
  );
};