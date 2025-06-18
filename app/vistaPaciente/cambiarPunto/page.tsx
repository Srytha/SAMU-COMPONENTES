"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Check } from "lucide-react";
import { AuthProvider } from "@/components/login/AuthProvider";
import Footer from "@/components/footer/Footer";

export default function CambiarPunto() {
  const [selectedPoint, setSelectedPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const puntoOptions = [
    { id: "norte", name: "Norte - Avenida 6N #42-50" },
    { id: "centro", name: "Centro - Calle 15 #8-45" },
    { id: "sur", name: "Sur - Carrera 100 #15-120" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoint) {
      setError("Por favor seleccione un punto de atención");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Obtener token del localStorage
      const token = localStorage.getItem("token");
      
      const response = await fetch("http://127.0.0.1:8000/cambiar_punto_atencion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ punto_atencion: selectedPoint })
      });

      if (response.ok) {
        setSuccess(true);
        // Reset después de 5 segundos
        setTimeout(() => {
          setSelectedPoint("");
          setSuccess(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al cambiar el punto de atención");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el nombre del punto seleccionado
  const getSelectedPointName = () => {
    const point = puntoOptions.find(p => p.id === selectedPoint);
    return point ? point.name : "";
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50">
        {/* Header */}
        <header className="bg-blue-600 text-white sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <Link href="/" className="font-bold text-xl">
              SAMU
            </Link>
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
                Cambiar Punto de Atención
              </h1>
              <p className="text-gray-500">
                Seleccione el nuevo punto de atención al que desea cambiarse
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-medium">¡Cambio realizado con éxito!</h3>
                      <p>Su punto de atención ha sido cambiado a: <strong>{getSelectedPointName()}</strong></p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <label className="block text-lg font-medium">
                      Seleccione su nuevo punto de atención:
                    </label>

                    <div className="grid gap-4">
                      {puntoOptions.map((punto) => (
                        <label 
                          key={punto.id}
                          className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-blue-50 transition-colors
                            ${selectedPoint === punto.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                        >
                          <input
                            type="radio"
                            name="punto"
                            value={punto.id}
                            checked={selectedPoint === punto.id}
                            onChange={() => setSelectedPoint(punto.id)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${selectedPoint === punto.id ? 'border-blue-500' : 'border-gray-400'}`}
                          >
                            {selectedPoint === punto.id && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-500" />
                            <span>{punto.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Link href="/vistaPaciente">
                      <button 
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                    </Link>
                    <button
                      type="submit"
                      disabled={loading || !selectedPoint}
                      className={`px-6 py-2 rounded-md bg-blue-600 text-white font-medium
                        ${loading || !selectedPoint ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                      {loading ? "Procesando..." : "Confirmar Cambio"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}