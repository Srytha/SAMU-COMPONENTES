"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function PatientForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Paciente</CardTitle>
        <CardDescription>Ingrese sus datos para generar su turno</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="documento">Documento de Identidad</Label>
          <Input id="documento" placeholder="Ingrese su documento" />
        </div>

        <Separator />

        <div className="space-y-3">
          <Label>Tipo de Atención</Label>
          <RadioGroup defaultValue="normal">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="normal" id="normal" />
              <div className="grid gap-1.5">
                <Label htmlFor="normal" className="font-medium">
                  Atención Normal
                </Label>
                <p className="text-sm text-muted-foreground">
                  Para consultas generales y servicios regulares
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="prioritario" id="prioritario" />
              <div className="grid gap-1.5">
                <Label htmlFor="prioritario" className="font-medium">
                  Atención Prioritaria
                </Label>
                <p className="text-sm text-muted-foreground">
                  Para adultos mayores, personas con discapacidad, mujeres embarazadas o con niños en brazos
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline">Cancelar</Button>
        <Button>Generar Turno</Button>
      </CardFooter>
    </Card>
  )
}
