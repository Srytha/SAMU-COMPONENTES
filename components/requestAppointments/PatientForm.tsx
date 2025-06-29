"use client";

import { useState } from "react";
import { useAuth } from "@/components/login/AuthProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function PatientForm() {
  const { user } = useAuth(); // Obtener el usuario autenticado

  const [tipoAtencion, setTipoAtencion] = useState("consulta");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [turnoAsignado, setTurnoAsignado] = useState("");
  const [turnoExistente, setTurnoExistente] = useState(""); // Nuevo: para mostrar turno ya existente

  const handleSubmit = async () => {
    if (!user) {
      alert("Debe iniciar sesión para solicitar un turno.");
      window.location.href = "/login";
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró un token de autenticación. Por favor, inicie sesión nuevamente.");
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    try {
      const url = new URL("https://desarrollouv.dismatexco.com//service/solicitud");
      url.searchParams.append("service", tipoAtencion);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al solicitar el turno");
        return;
      }

      // 🟡 Si ya tiene turno pendiente
      if (data.mensaje === "Ya tienes un turno pendiente" && data.turno) {
        const tipo = data.turno.tipo === "prioritario" ? "P" : "G";
        const numero = String(data.turno.numero).padStart(3, "0");
        setTurnoExistente(`${tipo}${numero}`);
        return;
      }

      // ✅ Turno asignado (nuevo)
      if (data.turno_prioritario) {
        setTurnoAsignado(`P${String(data.turno_prioritario).padStart(3, "0")}`);
        setShowSuccess(true);
      } else if (data.turno_general) {
        setTurnoAsignado(`G${String(data.turno_general).padStart(3, "0")}`);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Error al solicitar turno:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal: Turno ya existente */}
      {turnoExistente && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <div className="text-yellow-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Ya tienes un turno</h2>
            <p className="mb-4">Ya solicitaste un turno pendiente para este servicio.</p>
            <p className="text-lg font-semibold mb-4">
              Código actual: <span className="text-blue-600">{turnoExistente}</span>
            </p>
            <button
              className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setTurnoExistente("")}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Modal: Éxito al asignar turno nuevo */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <div className="text-green-600 text-5xl mb-4">✔️</div>
            <h2 className="text-2xl font-bold mb-2">¡Solicitud exitosa!</h2>
            <p className="mb-4">Su turno ha sido generado correctamente.</p>
            <p className="text-lg font-semibold mb-4">
              Código de turno: <span className="text-blue-600">{turnoAsignado}</span>
            </p>
            <button
              className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <Card className="shadow-md border-t-4 border-t-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
          <CardTitle className="text-xl text-blue-700">Información del Paciente</CardTitle>
          <CardDescription className="text-gray-600">Ingrese sus datos para generar su turno</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
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
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={loading}>
            {loading ? "Generando..." : "Generar Turno"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}