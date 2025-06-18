"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, User, Lock, AlertCircle } from "lucide-react";

import { useAuth } from "@/components/login/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LoginContent() {
  const { login } = useAuth();
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState(""); // Nuevo estado para contraseña
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (cedula.trim() === "") {
      setError("Por favor, ingrese su cédula.");
      return; 
    }
    
    try {
      setIsLoading(true);
      // Simulando un retraso en la red pa q se vea cool
      await new Promise(resolve => setTimeout(resolve, 800));
      login(cedula, password); // Pasar también la contraseña
      setIsLoading(false);
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50">
      <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl">SAMU</span>
            <span className="text-sm border border-white/40 rounded-full px-6 py-2 bg-white/10">
              Sistema de Atención
            </span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Enlace para volver al inicio */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-10 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg">Volver al inicio</span>
          </Link>
          
          {/* Formulario de inicio de sesión con tarjeta */}
          <form onSubmit={handleLogin}>
            <Card className="shadow-lg border-0">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 h-20 w-20 rounded-full flex items-center justify-center shadow-md">
                  <User className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <CardHeader className="pt-10 text-center space-y-1">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Iniciar Sesión
                </CardTitle>
                <p className="text-lg text-gray-500">
                  Ingrese sus credenciales para acceder al sistema
                </p>
              </CardHeader>
              
              <CardContent className="space-y-8 px-8">
                {/* Mensaje de error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">{error}</span>
                  </div>
                )}
                
                {/* Campo de cédula */}
                <div className="space-y-3">
                  <Label htmlFor="cedula" className="text-lg text-gray-700">
                    Cédula de Identidad
                  </Label>
                  <div className="relative">
                    <Input
                      id="cedula"
                      placeholder="Ingrese su número de cédula"
                      value={cedula}
                      onChange={(e) => {
                        setCedula(e.target.value);
                        if (error) setError("");
                      }}
                      className={cn(
                        "pl-12 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-lg",
                        error && "border-red-300 focus:border-red-500 focus:ring-red-500"
                      )}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Formato: 12345678-9 (sin puntos ni guiones)
                  </p>
                </div>

                {/* Contraseña */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-lg text-gray-700">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingrese su contraseña"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError("");
                      }}
                      className="pl-12 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-lg"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    *Requerida para administradores y asesores
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-5 justify-end px-8 pb-8">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-3 inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Validando...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
}