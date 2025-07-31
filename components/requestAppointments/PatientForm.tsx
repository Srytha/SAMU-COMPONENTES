import { useState } from "react";
import { useAuth } from "@/components/login/AuthProvider";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function PatientForm() {
  const { user } = useAuth();

  const [tipoAtencion, setTipoAtencion] = useState("consulta");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [turnoAsignado, setTurnoAsignado] = useState("");
  const [turnoExistente, setTurnoExistente] = useState("");

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
      const url = new URL("https://projectdesarrollo.onrender.com/service/solicitud");
      url.searchParams.append("service", tipoAtencion);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al solicitar el turno");
        return;
      }

      // ✔️ Usar siempre el código generado por backend
      if (data.mensaje === "Ya tienes un turno pendiente" && data.turno) {
        setTurnoExistente(data.turno.codigo);
        return;
      }

      if (data.turno_prioritario) {
        setTurnoAsignado(data.turno_prioritario.codigo);
        setShowSuccess(true);
      } else if (data.turno_general) {
        setTurnoAsignado(data.turno_general.codigo);
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
      {/* Modal: Turno existente */}
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

      {/* Modal: Turno generado */}
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

      {/* Tarjeta del formulario */}
      <Card className="shadow-md border-t-4 border-t-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white text-center space-y-1">
          <h1 className="text-3xl font-bold text-blue-800">Solicitar Turno</h1>
          <p className="text-gray-600 text-md">
            Complete el formulario para obtener su ticket digital
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <Separator className="my-4" />
          <div className="space-y-4">
            <Label className="font-bold text-black text-lg">Tipo de Servicio</Label>

            <RadioGroup
              defaultValue="consulta"
              className="flex flex-col gap-4"
              onValueChange={setTipoAtencion}
            >
              {[
                {
                  id: "consulta",
                  title: "Consulta",
                  description: "Solicitar un turno para consulta médica.",
                  icon: "🩺",
                },
                {
                  id: "medicamentos",
                  title: "Medicamentos",
                  description: "Solicitar un turno para recoger medicamentos.",
                  icon: "💊",
                },
                {
                  id: "asesoramiento",
                  title: "Asesoramiento",
                  description: "Solicitar un turno para asesoramiento.",
                  icon: "💬",
                },
              ].map(({ id, title, description, icon }) => (
                <div
                  key={id}
                  className="relative rounded-xl border p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-500 bg-white"
                >
                  <div className="flex items-start gap-4">
                    <RadioGroupItem
                      value={id}
                      id={id}
                      className="mt-1 border-blue-600 text-blue-600 ring-offset-0 focus:ring-0"
                    />
                    <div>
                      <Label
                        htmlFor={id}
                        className="text-lg font-semibold text-blue-700 flex items-center gap-2"
                      >
                        <span>{icon}</span>
                        {title}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end bg-gray-50 py-4 rounded-b-lg">
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Generando..." : "Generar Turno"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
