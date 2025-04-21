import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Download, ChevronDown } from "lucide-react";
import { ReactElement } from "react";


/*

Ojo: Estos componentes es solo interfaz visual :( 
falta agregar la logica para que realemente filtre o exporte

Barra de herramientas para filtrar, buscar y exportar datos

Esta contiene:

-  Select para Filtrar por módulo (Módulo 1, 2, 3, 4)
Esto puede usarse para mostrar solo los operadores de cierto módulo.

- Al hacer clic en el ícono de filtro:

Muestra opciones como:

Activos 
Inactivos 
Turno Mañana 
Turno Tarde 

- Botón de Exportar Datos

Exportar a Excel
Exportar a CSV
Exportar a PDF

*/

export const FilterControls = (): ReactElement => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
    <div className="flex items-center gap-2">
      <Select defaultValue="todos">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por módulo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los módulos</SelectItem>
          <SelectItem value="modulo-1">Módulo 1</SelectItem>
          <SelectItem value="modulo-2">Módulo 2</SelectItem>
          <SelectItem value="modulo-3">Módulo 3</SelectItem>
          <SelectItem value="modulo-4">Módulo 4</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Buscar operador..." 
          className="pl-8 w-[200px] md:w-[260px]" 
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Activos
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Inactivos
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Turno Mañana</DropdownMenuItem>
          <DropdownMenuItem>Turno Tarde</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Exportar a Excel</DropdownMenuItem>
          <DropdownMenuItem>Exportar a CSV</DropdownMenuItem>
          <DropdownMenuItem>Exportar a PDF</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);