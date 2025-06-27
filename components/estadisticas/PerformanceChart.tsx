import React, { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import StatCard from './StatCard';
import { MapPin } from 'lucide-react';

type PerformancePoint = {
  punto_atencion: string;
  total_turnos: number;
  total_atendidos: number;
  porcentaje_atendidos: number;
};
// VERIFICAR 
// 4. Rendimiento general del punto de atención
// Esta vista devuelve estadísticas del rendimiento de cada punto de atención,
// incluyendo el total de turnos, turnos atendidos, y la cantidad de turnos prioritarios y generales.

const PerformanceChart: React.FC = () => {
  const [data, setData] = useState<PerformancePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch('https://desarrollouv.dismatexco.com/stats/tipos-servicio', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error al obtener los datos');

        const result = await response.json();
        console.log('Resultado de API:', result);

        if (!Array.isArray(result)) {
          throw new Error('La respuesta del servidor no es una lista');
        }

        setData(result);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Cargando datos...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Rendimiento por Punto de Atención
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data.map((punto) => (
          <StatCard
            key={punto.punto_atencion}
            title={punto.punto_atencion}
            value={`${punto.porcentaje_atendidos}%`}
            subtitle={`${punto.total_atendidos}/${punto.total_turnos} atendidos`}
            icon={MapPin}
            color="purple"
          />
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="punto_atencion" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_turnos" fill="#729ed1" name="Total Turnos" />
          <Bar dataKey="total_atendidos" fill="#8572d1" name="Turnos Atendidos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
//