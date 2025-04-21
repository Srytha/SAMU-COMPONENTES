"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { useAuth } from "@/components/login/AuthProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


/*

Muestra el formulario de login: solo un input para la cédula.

Cuando el usuario da clic en “Iniciar sesión”, valida que no esté vacío y luego 
llama a login(cedula) del AuthProvider.

Muestra un Card 

Usa alert() para confirmar que se inició sesión 

*/


export default function LoginContent() {
  const { login } = useAuth()
  const [cedula, setCedula] = useState("")

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (cedula.trim() === "") {
      alert("Por favor, ingrese su cédula.")
      return
    }
    login(cedula)
    alert(`Sesión iniciada con la cédula: ${cedula}`)
  }

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
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Iniciar Sesión</h1>
            <p className="text-muted-foreground">Ingrese su cédula para acceder al sistema</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Ingrese su cédula para continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula</Label>
                <Input
                  id="cedula"
                  placeholder="Ingrese su cédula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleLogin}>Iniciar Sesión</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      
    </div>
  )
}
