'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    edad: "",
    celular: "",
    password: "",
    confirmPassword: "",
  });

  const [genero, setGenero] = useState("");
  const [puntoAtencion, setPuntoAtencion] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    // Validaciones básicas
    if (!formData.nombre || !formData.cedula || !formData.edad || !formData.celular || !formData.password) {
      setError("Por favor, complete todos los campos requeridos.");
      return;
    }

    if (!genero) {
      setError("Seleccione un género.");
      return;
    }

    if (!puntoAtencion) {
      setError("Seleccione un punto de atención.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const payload = {
        cedula: formData.cedula,
        nombre: formData.nombre,
        edad: parseInt(formData.edad),
        celular: formData.celular,
        password: formData.password,
        rol: "asesor",
        genero,
        puntoAtencion,
      };

      const res = await fetch("https://projectdesarrollo.onrender.com/administrador/create_asessor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear asesor");
      }

      setSuccess("¡Asesor creado exitosamente!");
      // Limpiar formulario
      setFormData({
        cedula: "",
        nombre: "",
        edad: "",
        celular: "",
        password: "",
        confirmPassword: "",
      });
      setGenero("");
      setPuntoAtencion("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }
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
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={handleChange("nombre")}
              placeholder="Ingrese el nombre"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento">Documento de Identidad</Label>
            <Input
              id="documento"
              value={formData.cedula}
              onChange={handleChange("cedula")}
              placeholder="Ingrese el documento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={formData.celular}
              onChange={handleChange("celular")}
              placeholder="Ingrese el teléfono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edad">Edad</Label>
            <Input
              id="edad"
              type="number"
              min="0"
              value={formData.edad}
              onChange={handleChange("edad")}
              placeholder="Ingrese la edad"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genero">Género</Label>
            <Select value={genero} onValueChange={setGenero}>
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
            <Label htmlFor="puntoAtencion">Punto de Atención</Label>
            <Select value={puntoAtencion} onValueChange={setPuntoAtencion}>
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

          <div className="col-span-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="Cree una contraseña"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  placeholder="Repita su contraseña"
                />
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
