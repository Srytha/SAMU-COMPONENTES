"use client"

import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ServiceSelection() {
  return (
    <div className="mt-8 space-y-3">
      <Separator />
      <Label>Servicio Requerido</Label>
      <RadioGroup defaultValue="consulta-general">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 border rounded-md p-3">
            <RadioGroupItem value="consulta-general" id="consulta-general" />
            <Label htmlFor="consulta-general">Consulta General</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3">
            <RadioGroupItem value="consulta-especializada" id="consulta-especializada" />
            <Label htmlFor="consulta-especializada">Consulta Especializada</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3">
            <RadioGroupItem value="laboratorio" id="laboratorio" />
            <Label htmlFor="laboratorio">Laboratorio</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3">
            <RadioGroupItem value="farmacia" id="farmacia" />
            <Label htmlFor="farmacia">Farmacia</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
