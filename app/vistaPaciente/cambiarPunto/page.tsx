"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { Badge } from "@/components/ui/badge";

export default function CambiarPunto() {
  const [selectedPoint, setSelectedPoint] = useState("");
  const [puntoActual, setPuntoActual] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const puntoOptions = [
    { id: "norte", name: "Norte - Avenida 6N #42-50" },
    { id: "centro", name: "Centro - Calle 15 #8-45" },
    { id: "sur", name: "Sur - Carrera 100 #15-120" }
  ];

  useEffect(() => {
    const obtenerPuntoDesdeToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No se encontró el token en localStorage.");
        return;
      }

      try {
        const response = await fetch("https://projectdesarrollo.onrender.com/auth/validar_token", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (response.ok && json?.data?.puntoAtencion) {
          setPuntoActual(json.data.puntoAtencion);
        } else {
          setPuntoActual("Desconocido");
        }
      } catch (err) {
        console.error("Error al validar token:", err);
        setPuntoActual("Error");
      }
    };

    obtenerPuntoDesdeToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPoint) {
      setError("Por favor seleccione un punto de atención");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://projectdesarrollo.onrender.com/auth/cambiar_punto_atencion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ punto_atencion: selectedPoint }),
      });

      if (response.ok) {
        setSuccess(true);
        setPuntoActual(selectedPoint);
        setTimeout(() => {
          setSelectedPoint("");
          setSuccess(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al cambiar el punto de atención");
      }
    } catch (err) {
      console.error("Error al conectar:", err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const getSelectedPointName = () => {
    const point = puntoOptions.find((p) => p.id === selectedPoint);
    return point ? point.name : "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50">
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

      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <Link
          href="/vistaPaciente"
          className="text-blue-600 hover:underline flex items-center gap-1 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al panel principal
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Cambiar Punto de Atención</h1>
          <p className="text-gray-600 mb-4">Seleccione el nuevo punto de atención al que desea cambiarse.</p>

          {/* Bloque gris con difuminado para mostrar el punto actual */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border-l-4 border-gray-400 shadow-sm">
              <p className="text-sm text-gray-700">
                Punto actual asignado:{" "}
                <span className="font-semibold text-gray-900 capitalize">
                  {puntoActual || "Cargando..."}
                </span>
              </p>
            </div>
          </div>

          {success ? (
            <div className="bg-green-100 text-green-800 border border-green-300 p-4 rounded mb-6">
              <h3 className="font-semibold mb-1">¡Cambio realizado con éxito!</h3>
              <p>Su punto de atención ha sido cambiado a: <strong>{getSelectedPointName()}</strong></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded">{error}</div>
              )}

              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-3">Seleccione su nuevo punto de atención:</h2>
                <div className="space-y-4">
                  {puntoOptions.map((punto) => (
                    <div
                      key={punto.id}
                      onClick={() => setSelectedPoint(punto.id)}
                      className={`flex justify-between items-center p-4 rounded-lg cursor-pointer border transition
                        ${selectedPoint === punto.id
                          ? "bg-blue-50 border-blue-500"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center
                          ${selectedPoint === punto.id ? "border-blue-500" : "border-gray-400"}`}>
                          {selectedPoint === punto.id && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="text-base font-medium text-gray-800">{punto.name.split(" - ")[0]}</div>
                          <div className="text-sm text-gray-500">{punto.name.split(" - ")[1]}</div>
                        </div>
                      </div>
                      <div className="text-2xl"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Link href="/vistaPaciente">
                  <button
                    type="button"
                    className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={loading || !selectedPoint}
                  className={`px-6 py-2 rounded-md bg-blue-600 text-white font-medium
                    ${loading || !selectedPoint ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"}`}
                >
                  {loading ? "Procesando..." : "Confirmar Cambio"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
