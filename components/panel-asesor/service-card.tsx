"use client"

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

interface ServiceCardProps {
  title: string
  icon: string
  data: TurnoVisualizar
  bgGradient: string
  iconBg: string
  textColor: string
  suffix?: string
}

export const ServiceCard = ({ title, icon, data, bgGradient, iconBg, textColor, suffix = "" }: ServiceCardProps) => {
  const formatTurnoNumber = (turno: Turno) => {
    const prefix = turno.tipo === "prioritario" ? "P" : "G"
    const number = String(turno.numero).padStart(3, "0")
    return `${prefix}${number}${suffix}`
  }

  return (
    <div
      className={`${bgGradient} rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className={`${iconBg} p-2 rounded-lg`}>
            <span className="text-xl">{icon}</span>
          </div>
          <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
        </div>
      </div>

      {/* Current Turn */}
      <div className="p-4 space-y-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-600 mb-2">Turno Actual</p>
          {data.turno_actual ? (
            <div className="flex items-center justify-between">
              <div className={`text-3xl font-bold ${textColor}`}>{formatTurnoNumber(data.turno_actual)}</div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  data.turno_actual.tipo === "prioritario" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                }`}
              >
                {data.turno_actual.tipo === "prioritario" ? "Prioritario" : "General"}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <div className="text-4xl mb-2">😴</div>
                <p className="text-gray-500 text-sm font-medium">Sin turnos activos</p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Turns */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-600 mb-3">Últimos Turnos</p>
          {data.ultimos_turnos.length > 0 ? (
            <div className="space-y-2">
              {data.ultimos_turnos.slice(0, 3).map((turno, index) => (
                <div key={turno.id} className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm">
                  <span className={`font-bold ${textColor}`}>{formatTurnoNumber(turno)}</span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2 h-2 rounded-full ${turno.tipo === "prioritario" ? "bg-red-400" : "bg-blue-400"}`}
                    ></span>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-2">
              <span className="text-gray-400 text-sm">No hay turnos recientes</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/50 rounded-lg p-2 text-center">
            <div className={`text-lg font-bold ${textColor}`}>
              {data.ultimos_turnos.filter((t) => t.tipo === "prioritario").length}
            </div>
            <div className="text-xs text-gray-600">Prioritarios</div>
          </div>
          <div className="bg-white/50 rounded-lg p-2 text-center">
            <div className={`text-lg font-bold ${textColor}`}>
              {data.ultimos_turnos.filter((t) => t.tipo === "general").length}
            </div>
            <div className="text-xs text-gray-600">Generales</div>
          </div>
        </div>
      </div>
    </div>
  )
}
