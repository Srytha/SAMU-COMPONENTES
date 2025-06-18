import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ServiceStats} from '../../types/estadisticasTypes';
import StatCard from './StatCard';
import { Activity, Calendar } from 'lucide-react';

// 1. Estadísticas de servicios genéricos
// Esta vista permite obtener estadísticas de un servicio específico 
// (consulta, medicamentos, asesoramiento)

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const COLORSC = ['#729ed1', '#8572d1'];


interface ServiceStatsChartProps {
  data: ServiceStats;
  selectedService: string;
  selectedType: string;
  loading: boolean;
  onServiceChange: (service: string) => void;
  onTypeChange: (type: string) => void;
}

const ServiceStatsChart: React.FC<ServiceStatsChartProps> = ({
  data,
  selectedService,
  selectedType,
  loading,
  onServiceChange,
  onTypeChange
}) => {
  const chartData = [
    { name: 'Prioritario', value: data.prioritario.total, porcentaje: data.prioritario.porcentaje },
    { name: 'General', value: data.general.total, porcentaje: data.general.porcentaje }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Estadísticas de Servicios</h3>
          <div className="flex gap-2">
            <select 
              value={selectedService} 
              onChange={(e) => onServiceChange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="consulta">Consulta Médica</option>
              <option value="medicamentos">Medicamentos</option>
              <option value="asesoramiento">Asesoramiento</option>
            </select>
            {loading && (
              <svg className="w-5 h-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.porcentaje}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORSC[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <StatCard 
              title="Turnos Prioritarios" 
              value={data.prioritario.total}
              subtitle={`${data.prioritario.porcentaje}% del total`}
              icon={Activity}
              color="blue"
            />
            <StatCard 
              title="Turnos Generales" 
              value={data.general.total}
              subtitle={`${data.general.porcentaje}% del total`}
              icon={Calendar}
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceStatsChart;