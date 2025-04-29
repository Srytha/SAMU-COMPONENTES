"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

type PersonalInfoFormProps = {
  onNext: () => void
}

export default function PersonalInfoForm({ onNext }: PersonalInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Ingrese los datos personales del usuario</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" placeholder="Ingrese el nombre" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input id="apellido" placeholder="Ingrese el apellido" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documento">Documento de Identidad</Label>
            <Input id="documento" placeholder="Ingrese el documento" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" placeholder="Ingrese el teléfono" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input id="correo" type="email" placeholder="Ingrese el correo electrónico" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genero">Género</Label>
            <Select>
              <SelectTrigger id="genero">
                <SelectValue placeholder="Seleccione el género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="femenino">Femenino</SelectItem>
                <SelectItem value="masculino">Masculino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edad">Edad</Label>
            <Input id="edad" type="number" placeholder="Ingrese la edad" min={1} max={100} />
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-end">
        <Button onClick={onNext}>Siguiente</Button>
      </CardFooter>
    </Card>
  )
}
