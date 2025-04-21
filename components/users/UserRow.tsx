import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from '@/components/ui/avatar';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import { TableCell, TableRow } from '@/components/ui/table';
  import { Edit, MoreHorizontal, Trash } from 'lucide-react';
  import type { User } from '@/types/user';
  

/*
representa una fila en una tabla de usuarios, se encarga de mostrar

Avatar	Nombre + ID	Rol	Email	Estado	Fecha de registro	Acciones y muestra el menu de acciones
Editar el usuario (onEdit)
Ver detalles del usuario (onViewDetails)
Eliminar al usuario (onDelete)


*/

  type UserRowProps = {
    user: User;
    onDelete: (userId: string) => void;
    onEdit: (userId: string) => void;
    onViewDetails: (userId: string) => void;
  };
  
  export const UserRow = ({ user, onDelete, onEdit, onViewDetails }: UserRowProps) => {
    const statusColors = user.status === 'Activo' 
      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
      : 'bg-red-100 text-red-800 hover:bg-red-100';
  
    return (
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={user.avatarUrl || '/placeholder-user.jpg'} 
                alt={`Avatar de ${user.fullName}`}
              />
              <AvatarFallback>
                {user.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">ID: {user.id}</p>
            </div>
          </div>
        </TableCell>
  
        <TableCell>
          <Badge variant={user.role === 'Administrador' ? 'default' : 'outline'}>
            {user.role}
          </Badge>
        </TableCell>
  
        <TableCell>{user.email}</TableCell>
  
        <TableCell>
          <Badge variant="outline" className={statusColors}>
            {user.status}
          </Badge>
        </TableCell>
  
        <TableCell>{user.registrationDate}</TableCell>
  
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => onEdit(user.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails(user.id)}>
                <span className="h-4 w-4 mr-2">👤</span>
                Detalles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(user.id)} 
                className="text-red-600 focus:bg-red-50"
              >
                <Trash className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  };