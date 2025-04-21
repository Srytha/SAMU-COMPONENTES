import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash, MoreHorizontal, Eye } from "lucide-react";
import { ReactElement } from "react";

/*
ActionDropdown muestra un botón con tres puntos horizontales, 
y al hacer clic, despliega un menú con tres acciones:

- Editar
- Ver detalles
- Eliminar

Ojo: Hay un prop que representa el ID del operador, esto pues para identificar 
que operador edita o elimina
*/


interface ActionDropdownProps {
  operatorId: string; // Tipo explícito para el ID del operador
}

export const ActionDropdown = ({ operatorId }: ActionDropdownProps): ReactElement => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Edit className="h-4 w-4 mr-2" />
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Eye className="h-4 w-4 mr-2" />
        Ver detalles
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600">
        <Trash className="h-4 w-4 mr-2" />
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);