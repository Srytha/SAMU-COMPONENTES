"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, MoreHorizontal } from "lucide-react";

type User = {
  id: string;
  fullName: string;
  document: string;
  phone: string;
  email: string;
};

type UserRowProps = {
  user: User;
  onDelete: (userId: string) => void;
};

export const UserRow = ({ user, onDelete }: UserRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <p className="font-medium">{user.fullName}</p>
          <p className="text-xs text-muted-foreground">ID: {user.id}</p>
        </div>
      </TableCell>

      <TableCell>{user.document}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.email}</TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
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
