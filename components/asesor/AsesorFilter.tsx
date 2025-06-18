import { Search, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/*
Barra de herramientas para búsqueda y exportación de usuarios.

Propiedades:
- searchTerm: texto actual del buscador
- onSearchChange: callback al escribir en el buscador
- onExport: callback al seleccionar formato de exportación
*/

type UsersFilterProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onExport: (format: 'excel' | 'csv' | 'pdf') => void;
};

export const UsersFilter = ({
  searchTerm,
  onSearchChange,
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
