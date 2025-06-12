"use client";

import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import React, { useState } from 'react';
import { Activity, Users, Filter, TrendingUp } from 'lucide-react';
import DashboardTabs from '@/components/estadisticas/Tabs';
import ServiceStatsChart from '@/components/estadisticas/EstadisticasServicios';
import UserRequestsChart from '@/components/estadisticas/UserRequestsChart';
import ServiceTypesChart from '@/components/estadisticas/ServiceTypesChart';
import PerformanceChart from '@/components/estadisticas/PerformanceChart';

import {
  ServiceStats,
  UserRequest,
  ServiceTypes,
  PerformancePoint,
  TabItem
} from '@/types/estadisticasTypes';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('servicios');
  const [selectedService, setSelectedService] = useState<string>('consulta');
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const simulateApiCall = async (service: string, type: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
// 1. Estadísticas de servicios genéricos
// Esta vista permite obtener estadísticas de un servicio específico 
// (consulta, medicamentos, asesoramiento)

    const mockData: Record<string, ServiceStats> = {
      consulta: { 
        servicio: 'consulta',
        prioritario: { total: 45, porcentaje: 35.71 }, 
        general: { total: 81, porcentaje: 64.29 } 
      },
      medicamentos: { 
        servicio: 'medicamentos', 
        prioritario: { total: 2, porcentaje: 5.11 },
        general: { total: 44, porcentaje: 97.89 } 
      },
      asesoramiento: { 
        servicio: 'asesoramiento', 
        prioritario: { total: 28, porcentaje: 31.82 }, 
        general: { total: 60, porcentaje: 68.18 } 
      }
    };
    
    setEstadisticasServicios(mockData[service] || mockData.consulta);
    setLoading(false);
  };

// 2. Estadísticas de solicitudes de servicios
// Esta vista devuelve estadísticas de las solicitudes de servicios por usuario.

  const [solicitudServicios] = useState<UserRequest[]>([
    { usuario_id: 1, nombre: "Camilo Reyes", solicitudes: 23, porcentaje: 28.75 },
    { usuario_id: 2, nombre: "Pinocho Nariz", solicitudes: 18, porcentaje: 22.50 },
    { usuario_id: 3, nombre: "Pepe grillo", solicitudes: 15, porcentaje: 18.75 },
    { usuario_id: 4, nombre: "Sara Reyes", solicitudes: 12, porcentaje: 15.00 },
    { usuario_id: 5, nombre: "Sara Yineth", solicitudes: 12, porcentaje: 15.00 },
    { usuario_id: 6, nombre: "Sara Suarez", solicitudes: 40, porcentaje: 78.00 },
    { usuario_id: 7, nombre: "Camilo Reyes", solicitudes: 23, porcentaje: 28.75 },
    { usuario_id: 8, nombre: "Pinocho Nariz", solicitudes: 18, porcentaje: 22.50 },
    { usuario_id: 9, nombre: "Pepe grillo", solicitudes: 15, porcentaje: 18.75 },
    { usuario_id: 10, nombre: "Sara Reyes", solicitudes: 12, porcentaje: 15.00 },
    { usuario_id: 11, nombre: "Sara Yineth", solicitudes: 12, porcentaje: 15.00 },
    { usuario_id: 12, nombre: "Sara Suarez", solicitudes: 40, porcentaje: 78.00 }
  ]);


  // 3. Estadísticas de tipos de servicio
// Esta vista devuelve estadísticas de los tipos de servicio (prioritario y general) 
// para cada modelo de servicio.
// Se agregan los totales y porcentajes de cada tipo de servicio.

  const [tiposServicio] = useState<ServiceTypes>({
    prioritario: { total: 127, porcentaje: 38.25 },
    general: { total: 205, porcentaje: 61.75 }
  });

  const [estadisticasServicios, setEstadisticasServicios] = useState<ServiceStats>({
    servicio: 'consulta',
    prioritario: { total: 45, porcentaje: 35.71 },
    general: { total: 81, porcentaje: 64.29 }
  });

  // 4. Rendimiento general del punto de atención
//  Esta vista devuelve estadísticas del rendimiento de cada punto de atención,
// incluyendo el total de turnos, turnos atendidos, y la cantidad de turnos prioritarios y generales.

  const [rendimientoPuntos] = useState<PerformancePoint[]>([
    { punto_atencion: "Norte", total_turnos: 145, total_atendidos: 132, porcentaje_atendidos: 91.03 },
    { punto_atencion: "Sur", total_turnos: 98, total_atendidos: 87, porcentaje_atendidos: 88.78 },
    { punto_atencion: "Este", total_turnos: 89, total_atendidos: 76, porcentaje_atendidos: 85.39 },
    { punto_atencion: "Oeste", total_turnos: 112, total_atendidos: 94, porcentaje_atendidos: 83.93 }
  ]);

  const tabs: TabItem[] = [
    { id: 'servicios', label: 'Estadísticas Servicios', icon: Activity },
    { id: 'solicitudes', label: 'Solicitudes Usuarios', icon: Users },
    { id: 'tipos', label: 'Tipos Servicio', icon: Filter },
    { id: 'rendimiento', label: 'Rendimiento Puntos', icon: TrendingUp }
  ];

  const handleServiceChange = (service: string) => {
    setSelectedService(service);
    simulateApiCall(service, selectedType);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    simulateApiCall(selectedService, type);
  };

  return (
    <AdminLayout
      activeLink="/admin/estadisticas"
      title="Dashboard de Estadísticas"
      pageTitle="Panel de Estadísticas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1"> {/* Cambiado de py-8 a py-6 */}
     
        
        <DashboardTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <div className="space-y-8">
          {activeTab === 'servicios' && (
            <ServiceStatsChart 
              data={estadisticasServicios}
              selectedService={selectedService}
              selectedType={selectedType}
              loading={loading}
              onServiceChange={handleServiceChange}
              onTypeChange={handleTypeChange}
            />
          )}
          
          {activeTab === 'solicitudes' && (
            <UserRequestsChart data={solicitudServicios} />
          )}
          
          {activeTab === 'tipos' && (
            <ServiceTypesChart data={tiposServicio} />
          )}
          
          {activeTab === 'rendimiento' && (
            <PerformanceChart data={rendimientoPuntos} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;