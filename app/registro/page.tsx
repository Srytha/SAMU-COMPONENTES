'use client'

import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react" // ⬅️ Se agregó el ícono
import AppFooter from "@/components/vistaGeneral/AppFooter"
import { Badge } from '@/components/ui/badge'

import RegistroForm from "@/components/registro/RegistroForm"

export default function RegistroPage() {
  return (
    // Fondo
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

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Volver */}
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Crear Cuenta como Paciente</h1>

            {/* Cuadro informativo con ícono */}
            <div className="bg-blue-100 border border-blue-200 text-blue-800 rounded-md p-4 flex items-start gap-3 mb-6 shadow-sm">
              <Info className="w-6 h-6 mt-0.5 flex-shrink-0 text-blue-500" />
              <p className="text-base leading-relaxed">
                Complete el formulario para registrarse en el sistema. Todos los campos son obligatorios.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <RegistroForm />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
