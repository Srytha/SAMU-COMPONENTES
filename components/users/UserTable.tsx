import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { UserRow } from './UserRow';
  import type { User } from '@/types/user';
  
/*

Muestra una tabla completa de todos los usuarios usando múltiples UserRow.
Osea UserTable es el contenedor de la tabla completa con todas las filas de usuarios, 
y dentro de él cada fila es un UserRow.

*/

  type UserTableProps = {
    users: User[];
    onDelete: (userId: string) => void;
    onEdit: (userId: string) => void;
    onViewDetails: (userId: string) => void;
  };
  
  export const UserTable = ({ users, onDelete, onEdit, onViewDetails }: UserTableProps) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Registro</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onDelete={onDelete}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
            />
          ))}
        </TableBody>
      </Table>
    );
  };