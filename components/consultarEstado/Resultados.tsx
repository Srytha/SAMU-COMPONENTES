'use client';

import React, { useEffect, useState } from 'react';

// Tipos según la estructura que devuelve el backend
type Turno = {
  id: number;
  turno: number;
  tipo: 'prioritario' | 'general';
};

type TurnosPendientes = {
  [servicio: string]: Turno;
};

type ApiResponse = {
  mensaje: string;
  turnos: TurnosPendientes;
};

// Simulación de respuesta del backend
const respuestaSimulada: ApiResponse = {
  mensaje: "Usuario con turnos pendientes en los siguientes servicios: ",
  turnos: {
    consulta: {
      id: 1,
      turno: 3,
      tipo: 'prioritario'
    },
    medicamentos: {
      id: 5,
      turno: 7,
      tipo: 'general'
    },
    asesoramiento: {
      id: 9,
      turno: 2,
      tipo: 'prioritario'
    }
  }
};

const TurnoPendiente: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular llamada a API con setTimeout
    setTimeout(() => {
      setData(respuestaSimulada);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">📋 Turnos Pendientes</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Cargando turnos...</p>
      ) : data && data.turnos ? (
        <>
          <p className="mb-5 text-gray-700 text-lg text-center">{data.mensaje}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Object.entries(data.turnos).map(([servicio, turno]) => (
              <div key={servicio} className="border border-gray-200 rounded-xl p-5 bg-gray-50 shadow-sm">
                <div className="font-semibold capitalize text-lg mb-2 text-blue-700">{servicio}</div>
                <div className="text-gray-700 text-sm">
                  <p>Tipo: <span className="font-medium">{turno.tipo}</span></p>
                  <p>Número: <span className="font-medium">#{turno.turno}</span></p>
                  <p>ID: {turno.id}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">No tienes turnos pendientes.</p>
      )}
    </div>
  );
};

export default TurnoPendiente;
