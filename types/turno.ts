export interface Turno {
  id: number
  tipo: "prioritario" | "general"
  numero: number
  punto: string
}

export interface TurnoVisualizar {
  turno_actual: Turno | null
  ultimos_turnos: Turno[]
}

export interface ServiciosTurnos {
  consulta: TurnoVisualizar
  medicamentos: TurnoVisualizar
  asesoramiento: TurnoVisualizar
}

export interface ResponseData {
  mensaje: string
  turno_id: number
  tipo: string
  numero: number
  punto: string
}
