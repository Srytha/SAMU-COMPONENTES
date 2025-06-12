"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { UploadCloud } from "lucide-react";
import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import { Button } from "@/components/ui/button";

export default function NuevoAnuncio() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      setSuccessMessage("Por favor selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await fetch("/api/anuncios", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor.");
      }

      await response.json();
      setSuccessMessage("Imagen subida correctamente!");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      setSuccessMessage("Error al subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      activeLink="anuncios"
      title="Gestión de Anuncios"
    >
      <div className="space-y-6 p-4 md:p-6">
        {/* Encabezado */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Anuncio</h1>
          <p className="text-sm text-gray-500">
            Sube una nueva imagen de anuncio para el sistema
          </p>
        </div>

        {/* Formulario dentro de una tarjeta blanca */}
        <div className="rounded-md border bg-white shadow-sm p-6">
          {successMessage && (
            <div className="mb-6 p-4 rounded-lg text-center font-semibold bg-green-100 text-green-700 border border-green-300">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Área de carga de imagen */}
            <div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:bg-blue-50 transition overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="w-12 h-12 text-blue-400 mb-2" />
                  <p className="text-blue-400 font-semibold">
                    Haz click o arrastra una imagen aquí
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {/* Botón de submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Subiendo..." : "Subir Imagen"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
