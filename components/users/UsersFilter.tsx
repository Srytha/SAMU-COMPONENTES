import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { UserFilters } from '@/types/user';

/*
barra de herramientas de búsqueda, filtros y exportación para una lista de usuarios.

controla dinámicamente una lista de usuarios, permitiéndote buscar,
filtrar y exportar fácilmente desde la interfaz.

prop que usa:
searchTerm = el texto actual del buscador
onSearchChange = se llama cuando escribís en el buscador
onFilterChange = se llama cuando elegís un filtro
onExport = se llama cuando elegís un formato para exportar

*/


type UsersFilterProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterChange: (filters: UserFilters) => void;
  onExport: (format: 'excel' | 'csv' | 'pdf') => void;
};

export const UsersFilter = ({
  searchTerm,
  onSearchChange,
  onFilterChange,
  onExport,
}: UsersFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-full sm:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtrar</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Estado</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onFilterChange({ status: 'Activo' })}>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Activos
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange({ status: 'Inactivo' })}>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Inactivos
            </span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel>Fecha de registro</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onFilterChange({ registrationPeriod: 'hoy' })}>
            Hoy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange({ registrationPeriod: 'semana' })}>
            Esta semana
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange({ registrationPeriod: 'mes' })}>
            Este mes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onExport('excel')}>
            Excel (.xlsx)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('csv')}>
            CSV (.csv)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('pdf')}>
            PDF (.pdf)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};