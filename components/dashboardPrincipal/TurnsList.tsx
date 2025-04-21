
import React, { ReactElement } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

/* 

Función principal:
Gestión visual de turnos en tiempo real.

Sistema de pestañas para 3 estados:

En espera: Turnos pendientes
Atendiendo: Turnos en progreso
Completados: Turnos finalizados

Cada turno muestra:

Identificador con badge de color
Tipo de servicio
Nombre del paciente
Tiempo de espera/duración
Boton de acción - llamar

*/



// Tipos e interfaces
type TurnType = "waiting" | "attending" | "completed";

interface BadgeType {
  className: string;
  label: string;
}

interface TurnItemData {
  badge: BadgeType;
  title: string;
  name: string;
  time: string;
}

interface TabContentProps {
  value: string;
  items: TurnItemData[];
  type?: TurnType;
}

interface TurnActionProps {
  time: string;
  type: TurnType;
}

interface TurnItemProps extends TurnItemData {
  type: TurnType;
}

// Datos de ejemplo
const waitingItems: TurnItemData[] = [
  {
    badge: { className: "bg-blue-600", label: "N-023" },
    title: "Consulta General",
    name: "Juan Pérez",
    time: "20 min"
  },
  {
    badge: { className: "bg-amber-600", label: "P-006" },
    title: "Urgencia",
    name: "María López",
    time: "10 min"
  }
];

const attendingItems: TurnItemData[] = [
  {
    badge: { className: "bg-blue-600", label: "N-015" },
    title: "Consulta General",
    name: "Ana Martínez",
    time: "8 min"
  }
];

const completedItems: TurnItemData[] = [
  {
    badge: { className: "bg-slate-500", label: "N-014" },
    title: "Laboratorio",
    name: "Pedro Gómez",
    time: "10:25 AM"
  }
];

// Componentes auxiliares
const TabContent = ({ value, items, type = "waiting" }: TabContentProps) => (
  <TabsContent value={value} className="mt-4">
    <div className="space-y-2">
      {items.map((item, index) => (
        <TurnItem key={index} {...item} type={type} />
      ))}
    </div>
  </TabsContent>
);

const TurnAction = ({ time, type }: TurnActionProps) => (
  <div className="flex items-center gap-2">
    {type !== 'completed' && (
      <Badge variant="outline" className={`flex items-center gap-1 ${
        type === 'attending' ? 'bg-green-100 text-green-800' : ''
      }`}>
        <Clock className="h-3 w-3" />
        {time}
      </Badge>
    )}
    <Button size="sm" variant={type === 'attending' ? 'outline' : 'default'}>
      {type === 'attending' ? 'Completar' : 'Llamar'}
    </Button>
  </div>
);

const TurnItem = ({ badge, title, name, time, type }: TurnItemProps) => (
  <div className={`flex items-center justify-between p-3 ${
    type === 'attending' ? 'bg-green-50 border border-green-200' : 'bg-muted/50'
  } rounded-lg`}>
    <div className="flex items-center gap-3">
      <Badge className={badge.className}>{badge.label}</Badge>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{name}</div>
      </div>
    </div>
    <TurnAction time={time} type={type} />
  </div>
);

// Componente principal
export const TurnsList = (): ReactElement => (
  <Tabs defaultValue="en-espera">
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="en-espera">En Espera</TabsTrigger>
      <TabsTrigger value="atendiendo">Atendiendo</TabsTrigger>
      <TabsTrigger value="completados">Completados</TabsTrigger>
    </TabsList>

    <TabContent value="en-espera" items={waitingItems} />
    <TabContent value="atendiendo" items={attendingItems} type="attending" />
    <TabContent value="completados" items={completedItems} type="completed" />
  </Tabs>
);