"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";


export default function RegistroForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    edad: "",
    sexo: "",
    celular: "",
    correo: "",
    password: "",
    confirmPassword: "",
    discapacidad: "",
    puntoAtencion: ""
  });
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSelect = (key: keyof typeof formData) => (value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const payload = {
        cedula: formData.cedula,
        nombre: formData.nombre,
        edad: parseInt(formData.edad),
        sexo: formData.sexo,
        celular: formData.celular,
        correo: formData.correo,
        password: formData.password,
        // El cambio xd
        ...(formData.discapacidad && { discapacidad: formData.discapacidad }),
        ...(formData.puntoAtencion && { puntoAtencion: formData.puntoAtencion }),
      };

      const res = await fetch("https://projectdesarrollo.onrender.com/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error en el registro");
      }
      const data = await res.json();
      setQrCode(data.qr);
      setSuccess("¡Registro exitoso! Escanea el código QR con tu app de autenticación.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
  };


// Finalizacion de la conexion
return (
  <div className="max-w-2xl mx-auto px-0.9">
    

    {/* Card principal */}
    <Card>
      {/* Header con título a la izquierda e ícono a la derecha */}
      <CardHeader className="pb-0">
            <CardTitle className="text-2xl font-bold text-gray-800">Crear Cuenta</CardTitle>
            <CardDescription className="text-gray-600">
              Complete el formulario para registrarse como paciente
            </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 mt-4">
        {/* Primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cedula">Cédula</Label>
            <Input
              id="cedula"
              placeholder="Ingrese su cédula"
              type="number"
              value={formData.cedula}
              onChange={handleChange("cedula")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Ingrese su nombre completo"
              value={formData.nombre}
              onChange={handleChange("nombre")}
            />
          </div>
        </div>

        {/* Segunda fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edad">Edad</Label>
            <Input
              id="edad"
              placeholder="Ingrese su edad"
              type="number"
              min={1}
              max={100}
              value={formData.edad}
              onChange={handleChange("edad")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sexo">Sexo</Label>
            <Select value={formData.sexo} onValueChange={handleSelect("sexo")}>
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

        {/* Tercera fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="celular">Celular</Label>
            <Input
              id="celular"
              placeholder="Ingrese su número de celular"
              type="tel"
              value={formData.celular}
              onChange={handleChange("celular")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo</Label>
            <Input
              id="correo"
              placeholder="Ingrese su correo electrónico"
              type="email"
              value={formData.correo}
              onChange={handleChange("correo")}
            />
          </div>
        </div>

        {/* Contraseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              placeholder="Cree una contraseña segura"
              type="password"
              minLength={8}
              value={formData.password}
              onChange={handleChange("password")}
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
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </div>
        </div>

        {/* Condición prioritaria */}
        <div className="space-y-2">
          <Label htmlFor="discapacidad">Condición Prioritaria (opcional)</Label>
          <Select
            value={formData.discapacidad}
            onValueChange={handleSelect("discapacidad")}
          >
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

        {/* Punto de atención */}
        <div className="space-y-2">
          <Label htmlFor="puntoAtencion">Punto de Atención</Label>
          <Select
            value={formData.puntoAtencion}
            onValueChange={handleSelect("puntoAtencion")}
          >
            <SelectTrigger id="puntoAtencion">
              <SelectValue placeholder="Seleccione un punto de atención" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sur">Sur</SelectItem>
              <SelectItem value="centro">Centro</SelectItem>
              <SelectItem value="norte">Norte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mensajes */}
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}

        {/* QR */}
        {qrCode && (
          <div className="flex flex-col items-center">
            <p>Escanea este QR con tu app de autenticación:</p>
            <img
              src={`data:image/png;base64,${qrCode}`}
              alt="QR para autenticación"
              className="w-40 h-40"
            />
          </div>
        )}
      </CardContent>

      {/* Botones */}
      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
        {!qrCode ? (
          <>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Registrar</Button>
          </>
        ) : (
          <Button onClick={() => router.push("/login")}>
            Ir a Inicio
          </Button>
        )}
      </CardFooter>
    </Card>
  </div>
);
}