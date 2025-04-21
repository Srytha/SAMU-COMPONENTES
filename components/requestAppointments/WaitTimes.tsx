"use client"

import { Clock } from "lucide-react"

export default function WaitTimes() {
  return (
    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-800 mb-1">Tiempos de Espera Actuales</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Atención Normal:</p>
              <p className="font-medium">~15-20 minutos</p>
            </div>
            <div>
              <p className="text-muted-foreground">Atención Prioritaria:</p>
              <p className="font-medium">~5-10 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
