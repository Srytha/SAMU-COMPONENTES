import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { ActionDropdown } from "./ActionDropdown";

/* 

Representa una fila de operador dentro de una tabla y en esta fila abarca:

Columna 1: Avatar + Nombre + ID

Columna 2: Módulo (badge azul)

Columna 3: Especialidad

Columna 4: Estado (badge verde/rojo)

Columna 5: Turno

Columna 6: Pacientes atendidos (con variación diaria)

Columna 7: Acciones (Dropdown)

Aqui es donde se define cómo se va a mostrar y comportar cada celda 

*/


export interface Operator {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  module: string;
  specialty: string;
  status: "Activo" | "Inactivo";
  shift: string;
  patients: number;
  todayPatients?: string;
}

interface OperatorRowProps {
  operator: Operator;
}

export const OperatorRow = ({ operator }: OperatorRowProps) => {
  const statusClasses = {
    Activo: "bg-green-100 text-green-800 hover:bg-green-100",
    Inactivo: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={operator.avatar} alt={operator.name} />
            <AvatarFallback>{operator.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{operator.name}</div>
            <div className="text-xs text-muted-foreground">ID: {operator.id}</div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          {operator.module}
        </Badge>
      </TableCell>

      <TableCell>{operator.specialty}</TableCell>

      <TableCell>
        <Badge variant="outline" className={statusClasses[operator.status]}>
          {operator.status}
        </Badge>
      </TableCell>

      <TableCell>{operator.shift}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-medium">{operator.patients}</span>
          {operator.todayPatients && (
            <span
              className={`text-xs ${
                operator.todayPatients.startsWith("+")
                  ? "text-green-600"
                  : "text-muted-foreground"
              }`}
            >
              {operator.todayPatients}
            </span>
          )}
        </div>
      </TableCell>

      <TableCell className="text-right">
        <ActionDropdown operatorId={operator.id} />
      </TableCell>
    </TableRow>
  );
};