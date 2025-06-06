"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <Input id="cedula" placeholder="Ingrese su cédula" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" placeholder="Ingrese su nombre completo" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edad">Edad</Label>
            <Input id="edad" placeholder="Ingrese su edad" type="number" min={1} max={100}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sexo">Sexo</Label>
            <Select>
              <SelectTrigger id="sexo">
                <SelectValue placeholder="Seleccione su sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">Masculino</SelectItem>
                <SelectItem value="f">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="celular">Celular</Label>
            <Input id="celular" placeholder="Ingrese su número de celular (10 dígitos)" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo</Label>
            <Input id="correo" placeholder="Ingrese su correo electrónico" type="email" />
          </div>
        </div>

        {/* Nuevo campo de contraseña */}
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

        <div className="space-y-2">
          <Label htmlFor="discapacidad">Condición Prioritaria (opcional)</Label>
          <Select>
            <SelectTrigger id="discapacidad">
              <SelectValue placeholder="Seleccione una condición" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adulto de la tercera edad">Adulto de la tercera edad</SelectItem>
              <SelectItem value="discapacidad fisica permanente">Discapacidad física permanente</SelectItem>
              <SelectItem value="discapacidad mental permanente">Discapacidad mental permanente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline">Cancelar</Button>
        <Button>Registrar</Button>
      </CardFooter>
    </Card>
  );
}