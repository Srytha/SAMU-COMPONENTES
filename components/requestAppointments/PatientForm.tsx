"use client"

import { useState } from "react";
import { useAuth } from "@/components/login/AuthProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function PatientForm() {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [documento, setDocumento] = useState("");
  const [tipoAtencion, setTipoAtencion] = useState("consulta");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      alert("Debe iniciar sesión para solicitar un turno.");
      window.location.href = "/login"; // Redirigir a la página de inicio de sesión
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró un token de autenticación. Por favor, inicie sesión nuevamente.");
      window.location.href = "/login"; // Redirigir a la página de inicio de sesión
      return;
    }

    setLoading(true);
    try {
      const url = new URL("http://127.0.0.1:8000/service/solicitud");
      url.searchParams.append("id", documento);
      url.searchParams.append("service", tipoAtencion);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Añadir el token de autenticación
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Error al solicitar el turno");
        return;
      }

      const data = await response.json();
      if (data.turno_prioritario) {
        alert(`Turno prioritario asignado: ${data.turno_prioritario}`);
      } else if (data.turno_general) {
        alert(`Turno general asignado: ${data.turno_general}`);
      }
    } catch (error) {
      console.error("Error al solicitar turno:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md border-t-4 border-t-blue-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-xl text-blue-700">Información del Paciente</CardTitle>
        <CardDescription className="text-gray-600">Ingrese sus datos para generar su turno</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="documento" className="font-medium text-gray-700">
            Documento de Identidad
          </Label>
          <Input
            id="documento"
            placeholder="Ingrese su documento"
            className="bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <Label className="font-medium text-gray-700">Tipo de Servicio</Label>
          <RadioGroup
            defaultValue="consulta"
            className="bg-gray-50 p-4 rounded-lg space-y-4"
            onValueChange={setTipoAtencion}
          >
            <div className="flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors">
              <RadioGroupItem value="consulta" id="consulta" className="mt-1 text-blue-600" />
              <div className="grid gap-1.5">
                <Label htmlFor="consulta" className="font-medium text-blue-700">
                  Consulta
                </Label>
                <p className="text-sm text-gray-500">Solicitar un turno para consulta médica.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors">
              <RadioGroupItem value="medicamentos" id="medicamentos" className="mt-1 text-blue-600" />
              <div className="grid gap-1.5">
                <Label htmlFor="medicamentos" className="font-medium text-blue-700">
                  Medicamentos
                </Label>
                <p className="text-sm text-gray-500">Solicitar un turno para recoger medicamentos.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-md transition-colors">
              <RadioGroupItem value="asesoramiento" id="asesoramiento" className="mt-1 text-blue-600" />
              <div className="grid gap-1.5">
                <Label htmlFor="asesoramiento" className="font-medium text-blue-700">
                  Asesoramiento
                </Label>
                <p className="text-sm text-gray-500">Solicitar un turno para asesoramiento.</p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end bg-gray-50 py-4 rounded-b-lg">
        <Button variant="outline" className="border-gray-300 hover:bg-gray-100 transition-colors" disabled={loading}>
          Cancelar
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 transition-colors" onClick={handleSubmit} disabled={loading}>
          {loading ? "Generando..." : "Generar Turno"}
        </Button>
      </CardFooter>
    </Card>
  );
}