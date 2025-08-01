"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Users, AlertCircle, RefreshCw, Clock, Zap, CheckCircle2 } from "lucide-react"

// Tipos de datos
type Turno = {
  id: number
  tipo: "general" | "prioritario"
  numero: number
  codigo: string
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
  const [servicioClave, setServicioClave] = useState<string>("consulta")

  // Servicios disponibles
  const servicios = [
    { value: "consulta", label: "Consulta Médica", icon: "🏥" },
    { value: "medicamentos", label: "Medicamentos", icon: "💊" },
    { value: "asesoramiento", label: "Asesoramiento", icon: "📋" }
  ]

  const puntosAtencion: PuntoAtencion[] = [
    { value: "sur", label: "Sur" },
    { value: "centro", label: "Centro" },
    { value: "norte", label: "Norte" },
  ]

  const obtenerTurnos = async (puntoParam = puntoAtencion, servicioParam = servicioClave) => {
    try {
      setLoading(true)
      setError("")
      const token = localStorage.getItem("token")
      const url = new URL("https://projectdesarrollo.onrender.com/service/visualizar-turnos")
      url.searchParams.append("servicio", servicioParam)
      url.searchParams.append("puntoAtencion", puntoParam)

      const response = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al obtener turnos")
      }

      const data = await response.json()
      const servicio = data[servicioParam]

      setTurnoActual(servicio?.turno_actual || null)
      setUltimosTurnos(servicio?.ultimos_turnos || [])
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
    const interval = setInterval(() => obtenerTurnos(), 30000)
    return () => clearInterval(interval)
  }, [puntoAtencion, servicioClave])

  const obtenerColorTurno = (tipo: "general" | "prioritario") => {
    return tipo === "prioritario" 
      ? "bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30" 
      : "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
  }

  const obtenerIconoTurno = (tipo: "general" | "prioritario") => {
    return tipo === "prioritario" ? <Zap size={16} /> : <Clock size={16} />
  }

  const handleRefresh = () => obtenerTurnos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Título con servicio actual */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {servicios.find(s => s.value === servicioClave)?.icon} {servicios.find(s => s.value === servicioClave)?.label}
          </h1>
          <p className="text-gray-600">Sistema de Gestión de Turnos</p>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center gap-4">
            {/* Selector de Servicio */}
            <div className="relative">
              <select
                value={servicioClave}
                onChange={(e) => setServicioClave(e.target.value)}
                className="appearance-none px-6 py-3 text-sm font-medium border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-blue-300 transition-all duration-200 pr-10"
              >
                {servicios.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.icon} {s.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Selector de Punto de Atención */}
            <div className="relative">
              <select
                value={puntoAtencion}
                onChange={(e) => setPuntoAtencion(e.target.value)}
                className="appearance-none px-6 py-3 text-sm font-medium border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-blue-300 transition-all duration-200 pr-10"
              >
                {puntosAtencion.map((p) => (
                  <option key={p.value} value={p.value}>
                     {p.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="group p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm hover:shadow-md"
            >
              <RefreshCw 
                size={20} 
                className={`${loading ? "animate-spin" : ""} text-gray-600 group-hover:text-blue-600 transition-colors`} 
              />
            </button>
          </div>

          {/* Indicador de última actualización */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
            {loading ? 'Actualizando...' : 'Actualizado'}
          </div>
        </div>

        {/* Error con mejor diseño */}
        {error && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 p-4 border-l-4 border-red-400 bg-red-50 rounded-r-xl shadow-sm">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">Error de conexión</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content con mejor layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          
          {/* Turno Actual - Más prominente */}
          <div className="xl:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 h-full">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <h3 className="text-lg font-bold text-gray-800">Turno en Atención</h3>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin" />
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-gray-500 mt-4 font-medium">Cargando información...</p>
                </div>
              ) : turnoActual ? (
                <div className="text-center animate-in fade-in-50 duration-500">
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 mx-auto flex items-center justify-center rounded-full text-4xl font-bold ${obtenerColorTurno(turnoActual.tipo)} transform hover:scale-105 transition-transform duration-200`}>
                      {turnoActual.codigo}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${turnoActual.tipo === 'prioritario' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                        {obtenerIconoTurno(turnoActual.tipo)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-2xl font-bold text-gray-800">{turnoActual.codigo}</h4>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${turnoActual.tipo === 'prioritario' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                      {obtenerIconoTurno(turnoActual.tipo)}
                      {turnoActual.tipo === "prioritario" ? "Turno Prioritario" : "Turno General"}
                    </div>
                    <p className="text-gray-600 flex items-center justify-center gap-1">
                       {puntosAtencion.find((p) => p.value === turnoActual.punto)?.label}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users size={32} className="text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-600 mb-2">Sin turno activo</p>
                  <p className="text-sm text-gray-500">Esperando próximo llamado...</p>
                </div>
              )}
            </div>
          </div>

          {/* Últimos Turnos - Mejorado */}
          <div className="xl:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Clock size={20} className="text-yellow-500" />
                  Proximos turnos
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Últimos {ultimosTurnos.length}
                </span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : ultimosTurnos.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {ultimosTurnos.slice(0, 8).map((turno, index) => (
                    <div
                      key={turno.id}
                      className="group flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-sm font-bold ${obtenerColorTurno(turno.tipo)} group-hover:scale-105 transition-transform`}>
                          {turno.codigo}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                            {turno.codigo}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${turno.tipo === 'prioritario' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                              {obtenerIconoTurno(turno.tipo)}
                              {turno.tipo === "prioritario" ? "Prioritario" : "General"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">No hay historial disponible</p>
                  <p className="text-sm text-gray-500">Los turnos completados aparecerán aquí</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leyenda mejorada */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-sm" />
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Clock size={14} />
                Turno General
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full shadow-sm" />
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Zap size={14} />
                Turno Prioritario
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Actualización automática cada 30s
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default VisualizarTurnos