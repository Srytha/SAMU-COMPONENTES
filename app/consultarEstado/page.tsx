"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Footer from "@/components/footer/Footer"
import ResultadoConsulta from "@/components/checkStatus/QueryResult"
import ConsultaPorNumero from "@/components/checkStatus/QueryByNumber"
import ConsultaPorDocumento from "@/components/checkStatus/QueryByDocument"

export default function ConsultarEstadoPage() {
  return (
    <div className="min-h-screen flex flex-col">
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
            <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Consultar Estado</h1>
            <p className="text-muted-foreground">Verifique el estado actual de su turno</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="numero" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="numero">Por Número de Turno</TabsTrigger>
              <TabsTrigger value="documento">Por Documento</TabsTrigger>
            </TabsList>

            <TabsContent value="numero">
              <ConsultaPorNumero />
            </TabsContent>
            <TabsContent value="documento">
              <ConsultaPorDocumento />
            </TabsContent>
          </Tabs>

      
          <ResultadoConsulta />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
