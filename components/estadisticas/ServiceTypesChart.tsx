
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ServiceTypes } from '../../types/estadisticasTypes';
import StatCard from './StatCard';
import { Activity, Calendar } from 'lucide-react';

interface ServiceTypesChartProps {
  data: ServiceTypes;
}


// 3. Estadísticas de tipos de servicio
// Esta vista devuelve estadísticas de los tipos de servicio (prioritario y general) 
// para cada modelo de servicio.
// Se agregan los totales y porcentajes de cada tipo de servicio.

const COLORS = ['#729ed1', '#8572d1'];

const ServiceTypesChart: React.FC<ServiceTypesChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Prioritario', value: data.prioritario.total, porcentaje: data.prioritario.porcentaje },
    { name: 'General', value: data.general.total, porcentaje: data.general.porcentaje }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Servicio Global</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="space-y-4">
          <StatCard
            title="Total Prioritarios"
            value={data.prioritario.total}
            subtitle={`${data.prioritario.porcentaje}% del total`}
            icon={Activity}
            color="blue"
          />
          <StatCard
            title="Total Generales"
            value={data.general.total}
            subtitle={`${data.general.porcentaje}% del total`}
            icon={Calendar}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceTypesChart;
