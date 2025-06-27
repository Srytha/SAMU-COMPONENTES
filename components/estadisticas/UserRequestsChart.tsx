import React, { useEffect, useState } from 'react';

// 2. Estadísticas de solicitudes de servicios
// Esta vista devuelve estadísticas de las solicitudes de servicios por usuario.


interface UserRequest {
  usuario_id: number;
  nombre: string;
  solicitudes: number;
  porcentaje: number;
}

const UserRequestsChart: React.FC = () => {
  const [data, setData] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://desarrollouv.dismatexco.com/stats/solicitudes-servicios", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Solicitudes de Servicios por Usuario
      </h3>

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
            {data.map((usuario, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
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
//