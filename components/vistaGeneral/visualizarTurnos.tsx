"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Users, AlertCircle, RefreshCw, Clock } from "lucide-react"

// Tipos de datos
type Turno = {
  id: number
  tipo: "general" | "prioritario"
  numero: number
  codigo: string // <-- Agregado
  punto: string
}

type PuntoAtencion = {
  value: string
  label: string
}

const VisualizarTurnos: React.FC = () => {
  const [turnoActual, setTurnoActual] = useState<Turno | null>(null)
  const [ultimosTurnos, setUltimosTurnos] = useState<Turno[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [puntoAtencion, setPuntoAtencion] = useState<string>("sur")
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>(new Date())

  const servicioClave = "consulta"

  const puntosAtencion: PuntoAtencion[] = [
    { value: "sur", label: "Sur" },
    { value: "centro", label: "Centro" },
    { value: "norte", label: "Norte" },
  ]

  const obtenerTurnos = async (puntoParam = puntoAtencion) => {
    try {
      setLoading(true)
      setError("")

      const token = localStorage.getItem("token")
      const url = new URL("https://projectdesarrollo.onrender.com/service/visualizar-turnos")
      url.searchParams.append("servicio", servicioClave)
      url.searchParams.append("puntoAtencion", puntoParam)

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body eliminado porque no corresponde en GET
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al obtener turnos")
      }

      const data = await response.json()
      const servicio = data[servicioClave]

      setTurnoActual(servicio?.turno_actual || null)
      setUltimosTurnos(servicio?.ultimos_turnos || [])
      setUltimaActualizacion(new Date())
    } catch (err: any) {
      setError(err.message || "Error al obtener turnos.")
      setTurnoActual(null)
      setUltimosTurnos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerTurnos()
    // Auto-actualizar cada 30 segundos
    const interval = setInterval(() => {
      obtenerTurnos()
    }, 30000)

    return () => clearInterval(interval)
  }, [puntoAtencion])

  const handlePuntoChange = (nuevoPunto: string) => {
    setPuntoAtencion(nuevoPunto)
  }

  const formatearNumeroTurno = (turno: Turno | null) => {
    if (!turno) return ""
    return turno.tipo === "prioritario"
      ? `P${String(turno.numero).padStart(3, "0")}`
      : `G${String(turno.numero).padStart(3, "0")}`
  }

  const obtenerColorTurno = (tipo: "general" | "prioritario") => {
    return tipo === "prioritario" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
  }

  const handleRefresh = () => {
    obtenerTurnos()
  }

  return (
    <div className="space-y-4">
      {/* Header con controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

        <div className="flex items-center gap-3">
          <select
            value={puntoAtencion}
            onChange={(e) => handlePuntoChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {puntosAtencion.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="text-red-500 flex-shrink-0" size={16} />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Turno Actual */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 h-full">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Turno Actual</h3>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-gray-600 text-sm">Cargando...</p>
              </div>
            ) : turnoActual ? (
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-xl font-bold mb-3 ${obtenerColorTurno(
                    turnoActual.tipo,
                  )}`}
                >
                  {turnoActual.codigo} {/* <-- Mostrar el código completo */}
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-900">{turnoActual.codigo}</p> {/* <-- Mostrar el código */}
                  <p className="text-xs text-gray-600">
                    {turnoActual.tipo === "prioritario" ? "Turno Prioritario" : "Turno General"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {puntosAtencion.find((p) => p.value === turnoActual.punto)?.label || turnoActual.punto}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No hay turno en atención</p>
                <p className="text-xs mt-1">Esperando próximo turno...</p>
              </div>
            )}
          </div>
        </div>

        {/* Últimos Turnos */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4 h-full">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Últimos Turnos Atendidos</h3>

            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : ultimosTurnos.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {ultimosTurnos.slice(0, 6).map((turno, index) => (
                  <div
                    key={turno.id}
                    className={`p-2.5 rounded-lg border-l-3 transition-all duration-300 bg-white ${
                      turno.tipo === "prioritario" ? "border-red-500" : "border-blue-500"
                    }`}
                    style={{ opacity: 1 - index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${obtenerColorTurno(
                            turno.tipo,
                          )}`}
                        >
                          {turno.codigo} {/* <-- Mostrar el código completo */}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{turno.codigo}</p> {/* <-- Mostrar el código */}
                          <p className="text-xs text-gray-500">
                            {turno.tipo === "prioritario" ? "Prioritario" : "General"}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay turnos previos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 pt-2 border-t border-gray-200">
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
          General
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          Prioritario
        </span>
      </div>
    </div>
  )
}

export default VisualizarTurnos
