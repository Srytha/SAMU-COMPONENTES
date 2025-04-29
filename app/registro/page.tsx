"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import RegistroForm from "@/components/record/RegistroForm"
import Footer from "@/components/footer/Footer"

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="font-bold text-xl">SAMU</Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Registro - Pacientes</h1>
            <p className="text-muted-foreground">Complete el formulario para registrarse en el sistema</p>
          </div>

          <RegistroForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
