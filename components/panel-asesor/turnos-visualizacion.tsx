"use client"

import { ServiceCard } from "./service-card"

interface Turno {
  id: number
  tipo: "prioritario" | "general"
  numero: number
  punto: string
}

interface TurnoVisualizar {
  turno_actual: Turno | null
  ultimos_turnos: Turno[]
}

interface ServiciosTurnos {
  consulta: TurnoVisualizar
  medicamentos: TurnoVisualizar
  asesoramiento: TurnoVisualizar
}

interface TurnosVisualizationProps {
  turnos: ServiciosTurnos
}

export const TurnosVisualization = ({ turnos }: TurnosVisualizationProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Estado de Turnos</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>🕒</span>
          <span>Actualizado: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ServiceCard
          title="Consulta"
          icon="📋"
          data={turnos.consulta}
          bgGradient="bg-gradient-to-br from-blue-400 to-blue-600"
          iconBg="bg-white/20"
          textColor="text-black"
        />

        <ServiceCard
          title="Medicamentos"
          icon="💊"
          data={turnos.medicamentos}
          bgGradient="bg-gradient-to-br from-green-400 to-green-600"
          iconBg="bg-white/20"
          textColor="text-black"
          suffix="M"
        />

        <ServiceCard
          title="Asesoramiento"
          icon="🗣️"
          data={turnos.asesoramiento}
          bgGradient="bg-gradient-to-br from-purple-400 to-purple-600"
          iconBg="bg-white/20"
          textColor="text-black"
          suffix="A"
        />
      </div>
    </div>
  )
}
