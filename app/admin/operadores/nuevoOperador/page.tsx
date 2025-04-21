'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminLayout } from '@/components/dashboardPrincipal/layout';
import { FormTabs } from '@/components/formOperators/FormTabs';
import { FormActions } from '@/components/formOperators/FormActions';

/*

Este componente es practicamente un contenedor donde almacena:

las tres secciones

personalInfo: Datos personales y credenciales
moduleInfo: Configuración del módulo médico
scheduleInfo: Horarios y disponibilidad

y los componentes principales:

FormTabs: Contenedor de las pestañas del formulario
formActions: Barra de acciones/navegación inferior
layout: Estructura general del dashboard



*/

export interface OperatorFormData {
  personalInfo: {
    name: string;
    lastName: string;
    document: string;
    phone: string;
    email: string;
    birthDate: string;
    gender: string;
    address: string;
    username: string;
    password: string;
  };
  moduleInfo: {
    module: string;
    specialty: string;
    avgTime: string;
    maxPatients: number;
    priorityCare: boolean;
    labServices: boolean;
    prescriptions: boolean;
    referrals: boolean;
  };
  scheduleInfo: {
    shift: string;
    workingDays: string[];
    status: boolean;
    autoBreaks: boolean;
    notifications: boolean;
    notes: string;
  };
}

export default function NuevoOperadorPage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'module' | 'schedule'>('personal');
  const [formData, setFormData] = useState<OperatorFormData>({
    personalInfo: {
      name: '',
      lastName: '',
      document: '',
      phone: '',
      email: '',
      birthDate: '',
      gender: '',
      address: '',
      username: '',
      password: '',
    },
    moduleInfo: {
      module: '',
      specialty: '',
      avgTime: '15',
      maxPatients: 30,
      priorityCare: true,
      labServices: false,
      prescriptions: true,
      referrals: true,
    },
    scheduleInfo: {
      shift: 'manana',
      workingDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      status: true,
      autoBreaks: true,
      notifications: true,
      notes: '',
    },
  });

  const handleTabChange = (newTab: 'personal' | 'module' | 'schedule') => {
    setActiveTab(newTab);
  };

  const handleSubmit = () => {
    // Lógica para enviar el formulario
    console.log('Datos enviados:', formData);
  };

  return (
    <AdminLayout 
      activeLink="/admin/operadores" 
      pageTitle="Crear Nuevo Operador"
      title="Gestión de Operadores" 
    >
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Cabecera */}
        <div className="mb-6">
          <Link 
            href="/admin/operadores" 
            className="text-blue-600 hover:underline flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a la lista de operadores</span>
          </Link>
          
          <h1 className="text-2xl font-bold">Nuevo Operador</h1>
          <p className="text-muted-foreground mt-2">
            Complete todos los campos para registrar un nuevo operador
          </p>
        </div>

        {/* Formulario en tarjeta */}
        <div className="border rounded-lg bg-white shadow-sm">
          <FormTabs 
            activeTab={activeTab}
            formData={formData}
            onTabChange={handleTabChange}
            onFormUpdate={setFormData}
          />
          
          <FormActions 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
