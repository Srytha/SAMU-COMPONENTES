"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

type AccessSecurityFormProps = {
  onBack: () => void
  onSave: () => void // Acción para guardar
}

export default function AccessSecurityForm({ onBack, onSave }: AccessSecurityFormProps) {
  const [tipoUsuario, setTipoUsuario] = useState("paciente")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acceso y Seguridad</CardTitle>
        <CardDescription>Configure las credenciales de acceso del usuario</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tipo de Usuario */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Tipo de Usuario</h3>
          <RadioGroup defaultValue="paciente" onValueChange={setTipoUsuario}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="administrador" id="administrador" />
              <div className="grid gap-1.5">
                <Label htmlFor="administrador" className="font-medium">Paciente</Label>
                <p className="text-sm text-muted-foreground">Acceso limitado para solicitar y consultar turnos
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="paciente" id="paciente" />
              <div className="grid gap-1.5">
                <Label htmlFor="paciente" className="font-medium">Administrador</Label>
                <p className="text-sm text-muted-foreground">Acceso completo al sistema y todas sus funcionalidades</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="asesor" id="asesor" />
              <div className="grid gap-1.5">
                <Label htmlFor="asesor" className="font-medium">Asesor</Label>
                <p className="text-sm text-muted-foreground">Acceso limitado para gestionar consultas y atender usuarios</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Documento y Contraseñas */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documento">Documento</Label>
            <Input id="documento" placeholder="Ingrese el documento" />
          </div>

          {(tipoUsuario === "paciente" || tipoUsuario === "asesor") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="Ingrese la contraseña" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmar-password">Confirmar Contraseña</Label>
                <Input id="confirmar-password" type="password" placeholder="Confirme la contraseña" />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Configuración de Cuenta */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Configuración de Cuenta</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="estado">Estado de la Cuenta</Label>
              <p className="text-sm text-muted-foreground">Activar o desactivar el usuario</p>
            </div>
            <Switch id="estado" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cambio-password">Forzar Cambio de Contraseña</Label>
              <p className="text-sm text-muted-foreground">Obligar cambio al primer inicio</p>
            </div>
            <Switch id="cambio-password" />
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between space-x-4">
        <Button className="bg-black text-white" onClick={onBack}>Anterior</Button>
        <Button className="bg-black text-white" onClick={onSave}>Guardar</Button>
      </CardFooter>
    </Card>
  )
}
