import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


/* 

El componente StatsCard muestra una tarjeta con un título, un valor numérico o textual,
un porcentaje adicional y una barra de progreso.

Props:

title: Título de la tarjeta (ej: "Total de Turnos")
value: Valor numérico o string (ej: "124")
percentage: Texto descriptivo (ej: "+12% respecto a ayer")
progress: Número (0-100) para la barra de progreso

*/
interface StatsCardProps {
  title: string;
  value: string | number;
  percentage: string;
  progress: number;
}

export const StatsCard = ({
  title,
  value,
  percentage,
  progress
}: StatsCardProps): ReactElement => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{percentage}</p>
      <Progress value={progress} className="h-1 mt-3" />
    </CardContent>
  </Card>
);