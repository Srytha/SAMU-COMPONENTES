'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PersonalInfoFormProps = {
  onNext?: () => void
}

export default function PersonalInfoForm({ onNext }: PersonalInfoFormProps) {
  const handleSave = () => {
    console.log("Formulario guardado");
    if (onNext) onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Ingrese los datos personales del asesor</CardDescription>
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
          <div className="space-y-2">
            <Label htmlFor="puntoAtencion">Punto de Atención</Label>
            <Select>
              <SelectTrigger id="puntoAtencion">
                <SelectValue placeholder="Seleccione el punto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="centro">Centro</SelectItem>
                <SelectItem value="sur">Sur</SelectItem>
                <SelectItem value="norte">Norte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contraseña */}
          <div className="col-span-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  placeholder="Cree una contraseña segura" 
                  type="password" 
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Mínimo 8 caracteres (letras, números y símbolos)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input 
                  id="confirmPassword" 
                  placeholder="Repita su contraseña" 
                  type="password" 
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}