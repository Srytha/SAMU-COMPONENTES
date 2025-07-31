"use client";

import React, { useState, useEffect } from "react";
import { Users, AlertCircle, Monitor } from "lucide-react";

// Tipo de datos para un turno
type Turno = {
  id: number;
  tipo: "general" | "prioritario";
  numero: number;
  punto: string;
};

// Tipos para los selectores de punto de atención
type PuntoAtencion = {
  value: string;
  label: string;
};

const VisualizarTurnosPage: React.FC = () => {
  const [turnoActual, setTurnoActual] = useState<Turno | null>(null);
  const [ultimosTurnos, setUltimosTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [puntoAtencion, setPuntoAtencion] = useState<string>("sur");

  const servicioClave = "consulta";

  const puntosAtencion: PuntoAtencion[] = [
    { value: "sur", label: "Sur" },
    { value: "centro", label: "Centro" },
    { value: "norte", label: "Norte" },
  ];

  const obtenerTurnos = async (puntoParam = puntoAtencion) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      // Cambia la URL para usar query param
      const url = new URL(
        `https://projectdesarrollo.onrender.com/service/visualizar-turnos`
      );
      url.searchParams.append("puntoAtencion", puntoParam);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al obtener turnos");
      }

      const data = await response.json();

      const servicio = data[servicioClave];
      setTurnoActual(servicio?.turno_actual || null);
      setUltimosTurnos(servicio?.ultimos_turnos || []);
    } catch (err: any) {
      setError(err.message || "Error al obtener turnos.");
      setTurnoActual(null);
      setUltimosTurnos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerTurnos();
  }, [puntoAtencion]);

  const handlePuntoChange = (nuevoPunto: string) => {
    setPuntoAtencion(nuevoPunto);
    obtenerTurnos(nuevoPunto);
  };

  const formatearNumeroTurno = (turno: Turno | null) => {
    if (!turno) return "";
    return turno.tipo === "prioritario"
      ? `P${String(turno.numero).padStart(3, "0")}`
      : `G${String(turno.numero).padStart(3, "0")}`;
  };

  const obtenerColorTurno = (tipo: "general" | "prioritario") => {
    return tipo === "prioritario"
      ? "bg-red-500 text-white"
      : "bg-blue-500 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full px-2">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Monitor className="text-blue-600" size={28} />
                Panel de Turnos
              </h1>
              <p className="text-gray-600 mt-1">Visualización en tiempo real</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Punto de Atención
                </label>
                <select
                  value={puntoAtencion}
                  onChange={(e) => handlePuntoChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {puntosAtencion.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 flex flex-col">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center flex-grow flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Turno Actual
              </h2>

              {loading ? (
                <div className="py-12 flex-grow flex flex-col justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Cargando...</p>
                </div>
              ) : turnoActual ? (
                <div className="py-8 flex-grow flex flex-col justify-center">
                  <div
                    className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-4 mx-auto ${obtenerColorTurno(
                      turnoActual.tipo
                    )}`}
                  >
                    {formatearNumeroTurno(turnoActual)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-gray-900">
                      {formatearNumeroTurno(turnoActual)}
                    </p>
                    <p className="text-md text-gray-600">
                      {turnoActual.tipo === "prioritario"
                        ? "Turno Prioritario"
                        : "Turno General"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {puntosAtencion.find((p) => p.value === turnoActual.punto)
                        ?.label || turnoActual.punto}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-gray-500 flex-grow flex flex-col justify-center">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-xl">No hay turno en atención</p>
                  <p className="text-sm mt-2">Esperando próximo turno...</p>
                </div>
              )}
            </div>
          </div>

          <div className="xl:col-span-2 flex flex-col">
            <div className="bg-white rounded-lg shadow-lg p-6 flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Últimos Turnos Atendidos
              </h2>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-pulse space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ) : ultimosTurnos.length > 0 ? (
                <div className="space-y-3">
                  {ultimosTurnos.map((turno, index) => (
                    <div
                      key={turno.id}
                      className={`p-3 rounded-lg border-l-4 transition-all duration-300 ${
                        turno.tipo === "prioritario"
                          ? "border-red-500 bg-red-50"
                          : "border-blue-500 bg-blue-50"
                      }`}
                      style={{ opacity: 1 - index * 0.15 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {formatearNumeroTurno(turno)}
                          </p>
                          <p className="text-xs text-gray-600">
                            {turno.tipo === "prioritario"
                              ? "Prioritario"
                              : "General"}
                          </p>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${obtenerColorTurno(
                            turno.tipo
                          )}`}
                        >
                          {turno.tipo === "prioritario" ? "P" : "G"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 h-full flex flex-col justify-center">
                  <Users size={32} className="mx-auto mb-3 opacity-50" />
                  <p>No hay turnos previos</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-center items-center text-sm text-gray-600 gap-6">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" /> General
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" /> Prioritario
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizarTurnosPage;
