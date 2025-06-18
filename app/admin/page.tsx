'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import { UsersFilter } from '@/components/asesor/AsesorFilter';
import { UserTable } from '@/components/asesor/AsesorTable';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

type SimpleUser = {
  id: string;
  fullName: string;
  document: string;
  phone: string;
  email: string;
};

const mockUsers: SimpleUser[] = [
  {
    id: '001',
    fullName: 'Juan Díaz',
    document: '12345678',
    phone: '3001234567',
    email: 'juan.diaz@ejemplo.com',
  },
  {
    id: '002',
    fullName: 'María López',
    document: '87654321',
    phone: '3107654321',
    email: 'maria.lopez@ejemplo.com',
  },
];

export default function GestionUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<SimpleUser[]>(mockUsers);

  const filteredUsers = users.filter(user => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch) ||
      user.document.includes(searchTerm) ||
      user.phone.includes(searchTerm)
    );
  });

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    console.log('Iniciando exportación a:', format);
  };

  return (
    <AdminLayout activeLink="usuarios" title="Gestión de Asesores">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Asesores</h1>
            <p className="text-sm text-gray-500">
              Administra los asesores registrados en el sistema
            </p>
          </div>

          <Link href="/admin/nuevoAsesor" legacyBehavior>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Nuevo Asesor</span>
            </Button>
          </Link>
        </div>

        <UsersFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExport={handleExport}
        />

        <div className="rounded-md border bg-white shadow-sm">
          <UserTable
            users={filteredUsers}
            onDelete={handleDeleteUser}
            onEdit={(id) => console.log('Editar:', id)}
            onViewDetails={(id) => console.log('Ver detalles:', id)}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
