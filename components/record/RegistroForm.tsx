"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RegistroForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription>Ingrese sus datos para crear una cuenta</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cedula">Cédula</Label>
            <Input id="cedula" placeholder="Ingrese su cédula" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" placeholder="Ingrese su nombre" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edad">Edad</Label>
            <Input id="edad" placeholder="Ingrese su edad" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sexo">Sexo</Label>
            <Input id="sexo" placeholder="Ingrese su sexo (M/F)" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="celular">Celular</Label>
            <Input id="celular" placeholder="Ingrese su número de celular" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo</Label>
            <Input id="correo" placeholder="Ingrese su correo electrónico" type="email" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rol">Rol</Label>
          <Input id="rol" placeholder="Ingrese su rol (ej. paciente)" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline">Cancelar</Button>
        <Button>Registrar</Button>
      </CardFooter>
    </Card>
  )
}
