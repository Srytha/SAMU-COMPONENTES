"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Check, X } from "lucide-react";
import { AuthProvider } from "@/components/login/AuthProvider";
import Footer from "@/components/footer/Footer";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function CancelarTurno() {
  const [servicio, setServicio] = useState("consulta");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleCancelar = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://projectdesarrollo.onrender.com/service/cancelar-turno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ servicio })
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmDialog(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || "Error al cancelar el turno");
        setConfirmDialog(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error de conexión con el servidor");
      setConfirmDialog(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50">
        {/* Encabezado */}
        <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md py-3">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">SAMU</span>
              <Badge variant="outline" className="text-xs font-normal border-blue-400 text-blue-100">
                Sistema de Atención
              </Badge>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
          <div className="max-w-2xl mx-auto">
            <Link href="/vistaPaciente" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al panel principal
            </Link>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {/* Título dentro del cuadro */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Cancelar Turno</h1>
                <p className="text-gray-500">Seleccione el servicio del que desea cancelar el turno.</p>
              </div>

              {/* Mensaje de éxito */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-medium">¡Turno cancelado exitosamente!</h3>
                      <p>Tu turno en el servicio <strong>{servicio}</strong> ha sido eliminado correctamente.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Selector de servicio */}
              {!success && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                      Selecciona el servicio:
                    </Label>
                    <select
                      id="servicio"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={servicio}
                      onChange={(e) => setServicio(e.target.value)}
                    >
                      <option value="consulta">Consulta</option>
                      <option value="medicamentos">Medicamentos</option>
                      <option value="asesoramiento">Asesoramiento</option>
                    </select>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setConfirmDialog(true)}
                      className="px-6 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700"
                    >
                      Cancelar Turno
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Diálogo de confirmación */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">¿Está seguro?</h3>
                <p className="text-gray-600">
                  Esta acción cancelará tu turno del servicio <strong>{servicio}</strong> y no podrá revertirse.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                No, volver
              </button>
              <button
                type="button"
                onClick={handleCancelar}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" />
                    Sí, cancelar turno
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthProvider>
  );
}
