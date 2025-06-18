"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Footer from "@/components/footer/Footer";
import PatientForm from "@/components/requestAppointments/PatientForm";
import { AuthProvider } from "@/components/login/AuthProvider";
import { Badge } from '@/components/ui/badge';

export default function SolicitarTurno() {
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
              <Link href="/vistaPaciente" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
  <ArrowLeft className="h-4 w-4" />
  Volver al panel principal
</Link>

              <h1 className="text-2xl md:text-3xl font-bold mb-2">Solicitar Turno</h1>
              <p className="text-muted-foreground">Complete el formulario para obtener su ticket digital</p>
            </div>
            <PatientForm />
          </div>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}