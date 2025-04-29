"use client"

import { Clock } from "lucide-react"

export default function WaitTimes() {
  return (
    <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800 mb-1">Tiempos de Espera Actuales</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-amber-700">Atención Normal:</p>
              <p className="font-medium text-amber-900">~15-20 minutos</p>
            </div>
            <div>
              <p className="text-amber-700">Atención Prioritaria:</p>
              <p className="font-medium text-amber-900">~5-10 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}