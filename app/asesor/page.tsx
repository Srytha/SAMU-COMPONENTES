"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTurnos } from "@/hooks/use-turnos"
import { ControlPanel } from "@/components/panel-asesor/control-panel"
import { TurnosVisualization } from "@/components/panel-asesor/turnos-visualizacion"

const PasarTurno: React.FC = () => {
  const [servicio, setServicio] = useState("consulta")
  const [puntoAtencion, setPuntoAtencion] = useState("norte")

  const { turnos, loading, error, resultado, obtenerTurnos, pasarTurno } = useTurnos(puntoAtencion)

  const handlePasarTurno = () => {
    pasarTurno(servicio)
  }

  useEffect(() => {
    obtenerTurnos()
    const interval = setInterval(() => obtenerTurnos(), 3000) // Antes: 30000
    return () => clearInterval(interval)
  }, [puntoAtencion])

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <ControlPanel
        puntoAtencion={puntoAtencion}
        setPuntoAtencion={setPuntoAtencion}
        servicio={servicio}
        setServicio={setServicio}
        loading={loading}
        error={error}
        resultado={resultado}
        onPasarTurno={handlePasarTurno}
        onActualizar={obtenerTurnos}
      />

      {turnos && <TurnosVisualization turnos={turnos} />}
    </div>
  )
}

export default PasarTurno
