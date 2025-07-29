"use client"

interface ResponseData {
  mensaje: string
  turno_id: number
  tipo: string
  numero: number
  punto: string
}

interface ControlPanelProps {
  puntoAtencion: string
  setPuntoAtencion: (punto: string) => void
  servicio: string
  setServicio: (servicio: string) => void
  loading: boolean
  error: string | null
  resultado: ResponseData | null
  onPasarTurno: () => void
  onActualizar: () => void
}

const serviciosDisponibles = ["consulta", "medicamentos", "asesoramiento"]

export const ControlPanel = ({
  puntoAtencion,
  setPuntoAtencion,
  servicio,
  setServicio,
  loading,
  error,
  resultado,
  onPasarTurno,
  onActualizar,
}: ControlPanelProps) => {
  return (
    <div className="bg-white border rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Asesor</h1>
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 font-medium">Actualizando automáticamente</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Punto de Atención:</label>
          <select
            value={puntoAtencion}
            onChange={(e) => setPuntoAtencion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="norte">🏢 Norte</option>
            <option value="centro">🏛️ Centro</option>
            <option value="sur">🏘️ Sur</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Servicio:</label>
          <select
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {serviciosDisponibles.map((serv) => (
              <option key={serv} value={serv}>
                {serv === "consulta" && "📋 "}
                {serv === "medicamentos" && "💊 "}
                {serv === "asesoramiento" && "🗣️ "}
                {serv.charAt(0).toUpperCase() + serv.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onPasarTurno}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-semibold shadow-md"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Procesando...</span>
            </div>
          ) : (
            "Pasar Turno"
          )}
        </button>
        <button
          onClick={onActualizar}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold shadow-md"
          disabled={loading}
        >
          🔄
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">⚠️</span>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {resultado && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <span className="text-green-500 text-xl">✅</span>
            <div>
              <p className="font-semibold text-green-800">{resultado.mensaje}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-green-700">
                <p>
                  <span className="font-medium">ID:</span> {resultado.turno_id}
                </p>
                <p>
                  <span className="font-medium">Tipo:</span> {resultado.tipo}
                </p>
                <p>
                  <span className="font-medium">Número:</span> {resultado.numero}
                </p>
                <p>
                  <span className="font-medium">Punto:</span> {resultado.punto}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
