'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from "@/components/dashboardPrincipal/layout";

interface UserData {
  rol: string;
}

export default function EliminarUsuariosPage() {
  const [cedula, setCedula] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
    setUserData({ rol: 'admin' }); // Simulación de rol admin
  }, []);

  const handleEliminar = async () => {
    if (!cedula.trim()) {
      setError('Debes ingresar una cédula');
      return;
    }

    if (!token) {
      setError('Token no encontrado');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`https://projectdesarrollo.onrender.com/administrador/eliminar_usuario`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cedula }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Error al eliminar usuario');

      setSuccess(`Usuario con cédula ${cedula} eliminado correctamente`);
      setCedula('');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al eliminar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) return null;

  return (
    <AdminLayout activeLink="/admin/usuarios" title="Gestión de Usuarios" pageTitle="Eliminar Usuarios">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4">
            {success}
          </div>
        )}

        <div className="bg-white p-6 rounded shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Eliminar Usuario</h2>

          <label className="block mb-2 text-sm">Cédula del usuario *</label>
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="Ingrese la cédula"
            className="w-full mb-4 p-2 border rounded"
          />

          <button
            onClick={handleEliminar}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded ${
              isLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar Usuario'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
