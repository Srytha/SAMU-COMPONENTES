import React from 'react';
import { UserRequest } from '../../types/estadisticasTypes';

interface UserRequestsChartProps {
  data: UserRequest[];
}

// 2. Estadísticas de solicitudes de servicios
// Esta vista devuelve estadísticas de las solicitudes de servicios por usuario.

const UserRequestsChart: React.FC<UserRequestsChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Solicitudes de Servicios por Usuario
      </h3>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-[#e2cef8] text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2 text-right">Solicitudes</th>
              <th className="px-4 py-2 text-right">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usuario) => (
              <tr key={usuario.usuario_id} className="border-b">
                <td className="px-4 py-2">{usuario.usuario_id}</td>
                <td className="px-4 py-2">{usuario.nombre}</td>
                <td className="px-4 py-2 text-right">{usuario.solicitudes}</td>
                <td className="px-4 py-2 text-right">{usuario.porcentaje}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequestsChart;
