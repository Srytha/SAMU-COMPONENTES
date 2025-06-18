"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Check, X } from "lucide-react";
import { AuthProvider } from "@/components/login/AuthProvider";
import Footer from "@/components/footer/Footer";
import { Badge } from '@/components/ui/badge';

export default function CancelarTurno() {
  const [codigoTurno, setCodigoTurno] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codigoTurno.trim()) {
      setError("Por favor ingrese el código del turno");
      return;
    }
    
    // Validar formato del código (G### o P###)
    const formatoValido = /^[GP]\d{3}$/.test(codigoTurno);
    if (!formatoValido) {
      setError("El formato del código debe ser G### para turnos generales o P### para prioritarios");
      return;
    }
    
    setConfirmDialog(true);
    setError("");
  };

  const handleCancelar = async () => {
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("token");
      
      // Extraer tipo y número del código
      const tipo = codigoTurno.startsWith("G") ? "general" : "prioritario";
      const numero = parseInt(codigoTurno.substring(1));
      
      const response = await fetch("http://127.0.0.1:8000/cancelar-turno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          servicio: "cualquier_servicio", // Se puede ajustar según API
          codigo_turno: codigoTurno,
          tipo: tipo,
          numero: numero
        })
      });
      
      if (response.ok) {
        setConfirmDialog(false);
        setSuccess(true);
        setCodigoTurno("");
        
        // Resetear después de unos segundos
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        setConfirmDialog(false);
        setError(errorData.mensaje || "Error al cancelar el turno");
      }
    } catch (err) {
      setConfirmDialog(false);
      setError("Error de conexión con el servidor");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50">
        {/* Header */}
         <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">SAMU</span>
          <Badge
            variant="outline"
            className="text-xs font-normal border-blue-400 text-blue-100"
          >
            Sistema de Atención
          </Badge>
        </div>
      </div>
    </header>
        

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Link 
                href="/vistaPaciente" 
                className="text-blue-600 hover:underline flex items-center gap-1 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al panel principal
              </Link>

              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Cancelar Turno
              </h1>
              <p className="text-gray-500">
                Ingrese el código de su turno para cancelarlo
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {/* Mensaje de éxito */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-medium">¡Turno cancelado exitosamente!</h3>
                      <p>El turno con código <strong>{codigoTurno}</strong> ha sido cancelado correctamente.</p>
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

              {!success && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="codigoTurno" className="block text-lg font-medium mb-2">
                        Código del Turno
                      </label>
                      <input
                        id="codigoTurno"
                        type="text"
                        value={codigoTurno}
                        onChange={(e) => setCodigoTurno(e.target.value.toUpperCase())}
                        placeholder="Ejemplo: G015 o P016"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={4}
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Ingrese el código que recibió cuando solicitó el turno (G### para turnos generales, P### para prioritarios)
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Link href="/vistaPaciente">
                      <button 
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Volver
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700"
                    >
                      Cancelar Turno
                    </button>
                  </div>
                </form>
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
                  Esta acción cancelará el turno <strong>{codigoTurno}</strong> y no podrá revertirse.
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