"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function PatientForm() {
  return (
    <Card className="shadow-md border-t-4 border-t-blue-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-xl text-blue-700">Información del Paciente</CardTitle>
        <CardDescription className="text-gray-600">Ingrese sus datos para generar su turno</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="documento" className="font-medium text-gray-700">Documento de Identidad</Label>
          <Input 
            id="documento" 
            placeholder="Ingrese su documento" 
            className="bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <Label className="font-medium text-gray-700">Tipo de Atención</Label>
          <RadioGroup defaultValue="normal" className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors">
              <RadioGroupItem value="normal" id="normal" className="mt-1 text-blue-600" />
              <div className="grid gap-1.5">
                <Label htmlFor="normal" className="font-medium text-blue-700">
                  Atención Normal
                </Label>
                <p className="text-sm text-gray-500">
                  Para consultas generales y servicios regulares
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors">
              <RadioGroupItem value="prioritario" id="prioritario" className="mt-1 text-blue-600" />
              <div className="grid gap-1.5">
                <Label htmlFor="prioritario" className="font-medium text-blue-700">
                  Atención Prioritaria
                </Label>
                <p className="text-sm text-gray-500">
                  Para adultos mayores, personas con discapacidad, mujeres embarazadas o con niños en brazos
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end bg-gray-50 py-4 rounded-b-lg">
        <Button 
          variant="outline" 
          className="border-gray-300 hover:bg-gray-100 transition-colors"
        >
          Cancelar
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Generar Turno
        </Button>
      </CardFooter>
    </Card>
  )
}