'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import { UsersFilter } from '@/components/users/UsersFilter';
import { UserTable } from '@/components/users/UserTable';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import type { User, UserFilters } from '@/types/user'; 


/*

Página principal de gestión de usuarios,  interfaz de usuario que organiza y 
controla la visualización de todos los componentes involucrados 

*/

const mockUsers: User[] = [
  {
    id: '001',
    fullName: 'Juan Díaz',
    email: 'juan.diaz@ejemplo.com',
    role: 'Administrador',
    status: 'Activo',
    registrationDate: '2024-03-15',
    avatarUrl: '/placeholder-user.jpg'
  },
  {
    id: '002',
    fullName: 'María López',
    email: 'maria.lopez@ejemplo.com',
    role: 'Administrador',
    status: 'Activo',
    registrationDate: '2024-03-16'
  },
  // 
];

export default function GestionUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<UserFilters>({});
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || user.status === filters.status;
    
    // Lógica adicional para filtro de fechas si es necesario
    return matchesSearch && matchesStatus;
  });

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    console.log('Iniciando exportación a:', format);
    // Implementar lógica real de exportación
  };

  return (
    <AdminLayout
      activeLink="usuarios"  // Asegúrate que coincida con tu Sidebar
      title="Gestión de Usuarios"
    >
      <div className="space-y-6 p-4 md:p-6">
        {/* Encabezado y botón de nuevo usuario */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
            <p className="text-sm text-gray-500">
              Administra los usuarios registrados en el sistema
            </p>
          </div>
          
          <Link href="/admin/usuarios/nuevoUsuario" legacyBehavior>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Nuevo Usuario</span>
            </Button>
          </Link>
        </div>

        {/* Filtros y controles */}
        <UsersFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          onExport={handleExport}
        />

        {/* Tabla de resultados */}
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