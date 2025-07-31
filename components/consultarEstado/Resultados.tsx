'use client';

import React, { useState } from 'react';

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
  turnos?: TurnosPendientes;
  error?: string;
};

const TurnoPendiente: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const buscarTurnos = async () => {
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`https://projectdesarrollo.onrender.com/service/turno-pendiente?cedula=${encodeURIComponent(cedula)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setData({ mensaje: '', error: 'Error de conexión con el servidor.' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">📋 Turnos Pendientes</h2>
      <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
        <input
          type="text"
          placeholder="Ingrese su cédula"
          value={cedula}
          onChange={e => setCedula(e.target.value)}
          className="border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={buscarTurnos}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-base transition-colors"
          disabled={loading || !cedula}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {loading && <p className="text-gray-500 text-center">Cargando turnos...</p>}

      {!loading && data && (
        <>
          {data.error && (
            <p className="text-red-500 text-center">{data.error}</p>
          )}
          {data.turnos ? (
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
            <p className="text-gray-500 text-center">{data.mensaje}</p>
          )}
        </>
      )}
    </div>
  );
};

export default TurnoPendiente;
