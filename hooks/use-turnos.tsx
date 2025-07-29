"use client"

import { useState, useEffect, useCallback } from "react"
import type { ServiciosTurnos, ResponseData } from "@/types/turno"

const API_BASE_URL = "https://projectdesarrollo.onrender.com/service"

export const useTurnos = (puntoAtencion: string) => {
  const [turnos, setTurnos] = useState<ServiciosTurnos | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resultado, setResultado] = useState<ResponseData | null>(null)

  const getToken = () => {
    return localStorage.getItem("token")
  }

  const obtenerTurnos = useCallback(async () => {
    try {
      const token = getToken()
      if (!token) {
        setError("Token no disponible. Inicia sesión nuevamente.")
        return
      }

      const response = await fetch(`${API_BASE_URL}/visualizar-turnos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ puntoAtencion }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setTurnos(data)

      if (error) {
        setError(null)
      }
    } catch (err) {
      console.error("Error al obtener turnos:", err)
      setError("Error al cargar los turnos")
    }
  }, [puntoAtencion, error])

  const pasarTurno = async (servicio: string) => {
    setLoading(true)
    setError(null)
    setResultado(null)

    try {
      const token = getToken()
      if (!token) {
        setError("Token no disponible. Inicia sesión nuevamente.")
        setLoading(false)
        return
      }

      const response = await fetch(`${API_BASE_URL}/pasar-turno`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ servicio }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}`)
      }

      const data = await response.json()
      setResultado(data)

      // Actualizar turnos inmediatamente después de pasar el turno
      await obtenerTurnos()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el turno")
    } finally {
      setLoading(false)
    }
  }

  // Auto-actualización cada 5 segundos
  useEffect(() => {
    // Cargar turnos inmediatamente
    obtenerTurnos()

    // Configurar intervalo de actualización
    const intervalId = setInterval(() => {
      obtenerTurnos()
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [obtenerTurnos])

  return {
    turnos,
    loading,
    error,
    resultado,
    obtenerTurnos,
    pasarTurno,
  }
}
