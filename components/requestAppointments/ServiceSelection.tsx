"use client"

import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ServiceSelection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mt-8">
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-700">Servicio Requerido</Label>
        <Separator className="my-2" />
        
        <RadioGroup defaultValue="consulta-general" className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <RadioGroupItem value="consulta-general" id="consulta-general" className="text-blue-600" />
              <Label htmlFor="consulta-general" className="font-medium cursor-pointer">Consulta General</Label>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <RadioGroupItem value="consulta-especializada" id="consulta-especializada" className="text-blue-600" />
              <Label htmlFor="consulta-especializada" className="font-medium cursor-pointer">Asesoramiento</Label>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-3 hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <RadioGroupItem value="laboratorio" id="laboratorio" className="text-blue-600" />
              <Label htmlFor="laboratorio" className="font-medium cursor-pointer">Reclamar documentos</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}