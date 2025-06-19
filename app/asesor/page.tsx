'use client';

import React, { useState } from 'react';

// Tipos para simular respuestas
interface Turno {
  id: number;
  estado: 'Pendiente' | 'Atendido' | 'Pasado';
  tipo: 'prioritario' | 'general';
  numero: number;
  punto: string;
}

interface ResponseData {
  mensaje: string;
  turno_id: number;
  tipo: string;
  numero: number;
  punto: string;
}

const turnosSimulados: Turno[] = [
  { id: 1, estado: 'Pendiente', tipo: 'prioritario', numero: 1, punto: 'A' },
  { id: 2, estado: 'Pendiente', tipo: 'general', numero: 2, punto: 'A' },
  { id: 3, estado: 'Atendido', tipo: 'general', numero: 3, punto: 'A' },
];

const PasarTurnoSimulado: React.FC = () => {
  const [servicio, setServicio] = useState('consulta');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResponseData | null>(null);

  const serviciosDisponibles = ['consulta', 'medicamentos', 'asesoramiento'];

  const handlePasarTurno = async () => {
    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      // Simulación del token
      const token = 'simulado-token';
      if (!token) {
        setError('Token no disponible. Inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

      // Paso 1: Cambiar 'Atendido' → 'Pasado'
      const atendido = turnosSimulados.find(
        (t) => t.estado === 'Atendido' && t.punto === 'A'
      );
      if (atendido) {
        atendido.estado = 'Pasado';
      }

      // Paso 2: Buscar siguiente pendiente (prioritario > general)
      const pendiente = turnosSimulados
        .filter((t) => t.estado === 'Pendiente' && t.punto === 'A')
        .sort((a, b) => (a.tipo === 'prioritario' ? -1 : 1))
        .shift();

      if (!pendiente) {
        setError('No hay turnos pendientes');
        setLoading(false);
        return;
      }

      // Paso 3: Marcar como Atendido
      pendiente.estado = 'Atendido';

      // Simular la respuesta del backend
      const response: ResponseData = {
        mensaje: `Turno ${pendiente.tipo} ${pendiente.numero} actualizado a 'Atendido'`,
        turno_id: pendiente.id,
        tipo: pendiente.tipo,
        numero: pendiente.numero,
        punto: pendiente.punto,
      };

      setResultado(response);
    } catch {
      setError('Error simulado al procesar el turno.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg space-y-4 bg-white">
      <h1 className="text-xl font-bold text-center">Simular Paso de Turno</h1>

      <div>
        <label className="block mb-1 font-medium">Servicio:</label>
        <select
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {serviciosDisponibles.map((serv) => (
            <option key={serv} value={serv}>
              {serv.charAt(0).toUpperCase() + serv.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handlePasarTurno}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Simular pasar turno'}
      </button>

      {error && <div className="text-red-600">{error}</div>}

      {resultado && (
        <div className="bg-green-100 p-3 rounded border border-green-400">
          <p><strong>{resultado.mensaje}</strong></p>
          <p>Turno ID: {resultado.turno_id}</p>
          <p>Tipo: {resultado.tipo}</p>
          <p>Número: {resultado.numero}</p>
          <p>Punto: {resultado.punto}</p>
        </div>
      )}
    </div>
  );
};

export default PasarTurnoSimulado;
