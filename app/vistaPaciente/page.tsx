'use client';

import Link from 'next/link';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import AppFooter from '@/components/vistaGeneral/AppFooter';
import { Badge } from '@/components/ui/badge';

const VistaPaciente = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50 font-sans">
      
      {/* Header */}
      <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">SAMU</span>
            <Badge
              variant="outline"
              className="text-xs font-normal border-blue-400 text-blue-100"
            >
              Sistema de Atención
            </Badge>
          </div>
        </div>
      </header>

      {/* Panel de usuario */}
      <main className="max-w-6xl mx-auto px-5 pb-20">
        <div className="bg-white rounded-2xl p-10 shadow-2xl mt-10">

          {/* Volver al inicio */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-lg">Volver al inicio</span>
            </Link>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 text-center -mt-9 mb-6">
  Panel del Paciente
</h1>


          {/* Grid de acciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cambiar Punto */}
            <div className="rounded-2xl border border-blue-200 p-8 text-center hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-blue-500" />
              <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center bg-blue-500 text-white text-2xl">
                📍
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cambiar Punto</h3>
              <p className="text-gray-600 text-sm mb-6">Modifica tu punto de atención actual</p>
              <Link href="/vistaPaciente/cambiarPunto">
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                  Cambiar
                </button>
              </Link>
            </div>

            {/* Solicitar Turno */}
            <div className="rounded-2xl border border-green-200 p-8 text-center hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-green-500" />
              <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center bg-green-500 text-white text-2xl">
                📅
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Solicitar Turno</h3>
              <p className="text-gray-600 text-sm mb-6">Solicite su turno</p>
              <Link href="/vistaPaciente/solicitarTurno">
                <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                  Solicitar
                </button>
              </Link>
            </div>

            {/* Cancelar Turno */}
            <div className="rounded-2xl border border-red-200 p-8 text-center hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-red-500" />
              <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center bg-red-500 text-white text-2xl">
                ❌
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cancelar Turno</h3>
              <p className="text-gray-600 text-sm mb-6">Cancela tu cita programada</p>
              <Link href="/vistaPaciente/cancelarTurno">
                <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
                  Cancelar
                </button>
              </Link>
            </div>

          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default VistaPaciente;
