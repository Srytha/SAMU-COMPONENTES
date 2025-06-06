'use client';

import Link from 'next/link';
import React from 'react';

const VistaPaciente = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-blue-500 py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
          <div className="text-white text-xl font-semibold">Sistema de Atención</div>
          <div className="bg-white text-blue-500 px-5 py-2 rounded-full text-sm font-medium">
            SAMU
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">Panel de Usuario</h1>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Cambiar Punto */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center transition-all hover:border-blue-500 hover:shadow-lg cursor-pointer">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-5">
              📍
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Cambiar Punto</h3>
            <p className="text-gray-600 text-sm mb-6">Modifica tu punto de atención actual</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors">
              Cambiar
            </button>
          </div>

          {/* Solicitar Turno */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center transition-all hover:border-blue-500 hover:shadow-lg cursor-pointer">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-5">
              📅
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Solicitar Turno</h3>
            <p className="text-gray-600 text-sm mb-6">Solicite su turno</p>
            <Link href="/solicitarTurno">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors">
                Solicitar
              </button>
            </Link>
          </div>

          {/* Cancelar Turno */}
          <div className="bg-white border-2 border-red-500 rounded-xl p-8 text-center transition-all hover:border-red-600 hover:shadow-lg cursor-pointer">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-5">
              ❌
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Cancelar Turno</h3>
            <p className="text-gray-600 text-sm mb-6">Cancela tu cita programada</p>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-red-600 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VistaPaciente;
