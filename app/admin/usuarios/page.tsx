'use client';

import React, { useEffect, useState } from "react";
import { Search, User, X } from "lucide-react";
import { AdminLayout } from "@/components/dashboardPrincipal/layout";

type Usuario = {
  nombre: string;
  cedula: string | number;
  rol: string;
  inhabilitado: boolean;
};

const UsersByPuntoA: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRol, setSelectedRol] = useState<string>("todos");

  const [showCedulaModal, setShowCedulaModal] = useState<boolean>(false);
  const [cedulaInput, setCedulaInput] = useState<string>("");
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://projectdesarrollo.onrender.com/administrador/list_users_by_puntoA`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }

        const data = await response.json();

        const usuariosTransformados = data.map((usuario: any) => ({
          ...usuario,
          inhabilitado: !usuario.active,
        }));

        setUsuarios(usuariosTransformados);
        setFilteredUsuarios(usuariosTransformados);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    let filtered = usuarios;

    if (searchTerm) {
      filtered = filtered.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.cedula.toString().includes(searchTerm)
      );
    }

    if (selectedRol !== "todos") {
      filtered = filtered.filter(
        usuario => usuario.rol.toLowerCase() === selectedRol.toLowerCase()
      );
    }

    setFilteredUsuarios(filtered);
  }, [searchTerm, selectedRol, usuarios]);

  const getRolBadge = (rol: string) => {
    const styles = {
      paciente: "bg-green-500 text-white",
      asesor: "bg-blue-500 text-white",
    };
    return styles[rol.toLowerCase() as keyof typeof styles] || "bg-gray-500 text-white";
  };

  const getInhabilitadoBadge = (inhabilitado: boolean) => {
    return inhabilitado
      ? "bg-red-500 text-white"
      : "bg-blue-500 text-white";
  };

  const handleInactivarUsuario = () => {
    setShowCedulaModal(true);
  };

  const submitInactivarUsuario = async () => {
    if (!cedulaInput) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://projectdesarrollo.onrender.com/administrador/deactive_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cedula: cedulaInput }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setNotification({ type: 'error', message: result.message || 'No se pudo inactivar el usuario' });
      } else {
        setNotification({ type: 'success', message: result.message || 'Usuario inactivado' });
        setUsuarios(prev =>
          prev.map(u =>
            u.cedula == cedulaInput ? { ...u, inhabilitado: true } : u
          )
        );
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al intentar inactivar el usuario' });
    } finally {
      setShowCedulaModal(false);
      setCedulaInput("");
    }
  };

  return (
    <AdminLayout activeLink="/admin/usuarios" title="Panel de usuarios">
      <div className="p-6">
        {notification && (
          <div className={`fixed top-6 right-6 z-50 flex items-center gap-4 px-6 py-4 rounded-lg shadow-lg transition
            ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            <p>{notification.message}</p>
            <button onClick={() => setNotification(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {showCedulaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-lg font-bold mb-4">Inactivar Usuario</h2>
              <input
                type="text"
                placeholder="Ingresa la cédula"
                value={cedulaInput}
                onChange={(e) => setCedulaInput(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowCedulaModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitInactivarUsuario}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Inactivar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Usuarios por Punto de Atención
              </h1>
              <p className="text-gray-600">
                {filteredUsuarios.length} usuarios encontrados
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center w-full gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={selectedRol}
                  onChange={(e) => setSelectedRol(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="todos">Todos los roles</option>
                  <option value="paciente">Paciente</option>
                  <option value="asesor">Asesor</option>
                </select>

                <button
                  onClick={handleInactivarUsuario}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Inactivar Usuario
                </button>
              </div>

              <div className="relative sm:ml-auto w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Cargando usuarios...</span>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <div className="text-red-600 mb-2">Error: {error}</div>
            </div>
          ) : filteredUsuarios.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cédula
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inhabilitado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsuarios.map((usuario, index) => (
                    <tr key={`${usuario.cedula}-${index}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {usuario.nombre}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">
                          {usuario.cedula}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRolBadge(
                            usuario.rol
                          )}`}
                        >
                          {usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInhabilitadoBadge(
                            usuario.inhabilitado
                          )}`}
                        >
                          {usuario.inhabilitado ? "True" : "False"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron usuarios
              </h3>
              <p className="text-gray-600">
                Intenta ajustar tus filtros de búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersByPuntoA;

