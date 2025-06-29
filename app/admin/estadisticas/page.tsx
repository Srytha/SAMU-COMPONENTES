"use client";

import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import React, { useState } from 'react';
import { Activity, Users, Filter, TrendingUp } from 'lucide-react';
import DashboardTabs from '@/components/estadisticas/Tabs';
import ServiceStatsChart from '@/components/estadisticas/EstadisticasServicios';
import UserRequestsChart from '@/components/estadisticas/UserRequestsChart';
import ServiceTypesChart from '@/components/estadisticas/ServiceTypesChart';
import PerformanceChart from '@/components/estadisticas/PerformanceChart';
import { TabItem } from '@/types/estadisticasTypes';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('servicios');

  const tabs: TabItem[] = [
    { id: 'servicios', label: 'Estadísticas Servicios', icon: Activity },
    { id: 'solicitudes', label: 'Solicitudes Usuarios', icon: Users },
    { id: 'tipos', label: 'Tipos Servicio', icon: Filter },
    { id: 'rendimiento', label: 'Rendimiento Puntos', icon: TrendingUp }
  ];

  return (
    <AdminLayout
      activeLink="/admin/estadisticas"
      title="Dashboard de Estadísticas"
      pageTitle="Panel de Estadísticas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <div className="space-y-8">
          {activeTab === 'servicios' && <ServiceStatsChart />}
          {activeTab === 'solicitudes' && <UserRequestsChart />}
          {activeTab === 'tipos' && <ServiceTypesChart />}
          {activeTab === 'rendimiento' && <PerformanceChart />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
