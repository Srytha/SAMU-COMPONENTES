"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import jsPDF from "jspdf"; // 👈 IMPORTANTE

export default function NuevoAsesorPage() {
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

  const handleChange =
    (key: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [key]: e.target.value });
    };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (
      !formData.nombre ||
      !formData.cedula ||
      !formData.edad ||
      !formData.celular ||
      !formData.password
    ) {
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

      const token = localStorage.getItem("token");

      if (!token) {
        setError("No se encontró el token de sesión. Inicie sesión nuevamente.");
        return;
      }

      const res = await fetch(
        "https://projectdesarrollo.onrender.com/administrador/create_asessor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear asesor");
      }

      setSuccess("¡Asesor creado exitosamente!");

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Registro de Asesor", 20, 20);

      let y = 40;
      doc.setFontSize(12);
      doc.text(`Cédula: ${formData.cedula}`, 20, y);
      y += 10;
      doc.text(`Nombre: ${formData.nombre}`, 20, y);
      y += 10;
      doc.text(`Edad: ${formData.edad}`, 20, y);
      y += 10;
      doc.text(`Género: ${genero}`, 20, y);
      y += 10;
      doc.text(`Teléfono: ${formData.celular}`, 20, y);
      y += 10;
      doc.text(`contraseña: ${formData.password}`, 20, y);
      y += 10;
      doc.text(`Punto de Atención: ${puntoAtencion}`, 20, y);

      doc.save("registro_asesor.pdf"); 

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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <AdminLayout
      activeLink="/admin/nuevoAsesor"
      title="Registro Asesores"
      pageTitle="Asesores"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Card className="mt-0">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Ingrese los datos personales del asesor
            </CardDescription>
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
                    <Label htmlFor="confirmPassword">
                      Confirmar Contraseña
                    </Label>
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

            {error && (
              <p className="text-red-500 border border-red-400 rounded p-2 bg-red-100">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-700 border border-green-400 rounded p-2 bg-green-100">
                {success}
              </p>
            )}
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
      </div>
    </AdminLayout>
  );
}
