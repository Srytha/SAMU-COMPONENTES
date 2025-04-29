import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserRow } from "./UserRow"
import type { User } from "@/types/user"

type UserTableProps = {
  users: User[]
  onDelete: (userId: string) => void
  onEdit: (userId: string) => void
  onViewDetails: (userId: string) => void
}

export const UserTable = ({
  users,
  onDelete,
  onEdit,
  onViewDetails,
}: UserTableProps) => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      <Table className="min-w-full text-sm text-left">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Usuario</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Rol</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Email</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Estado</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Fecha Registro</TableHead>
            <TableHead className="px-6 py-3 text-right font-semibold text-gray-700">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200 bg-white">
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
    </div>
  )
}
