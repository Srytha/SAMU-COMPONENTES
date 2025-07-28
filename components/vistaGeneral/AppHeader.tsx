'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Info, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AppHeader() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleHelpClick = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
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
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700"
              onClick={handleHelpClick}
            >
              <Info className="h-4 w-4 mr-1" />
              Ayuda
            </Button>
            <Button variant="secondary" size="sm" onClick={handleLoginClick}>
              <User className="h-4 w-4 mr-1" />
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-50 border border-blue-200 text-blue-900 p-6 rounded-lg shadow-lg relative max-w-md w-full">
            <button
              onClick={handleCloseAlert}
              className="absolute top-3 right-3 text-blue-700 hover:text-blue-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-2">Querido Paciente</h2>
            <p className="mb-2">
              Si eres nuevo en esta plataforma, para generar tu turno primero debes <strong>registrarte</strong>.
            </p>
            <p className="mb-2">
              Para ello, haz clic en el botón <strong>Iniciar Sesión</strong> y luego selecciona 
              <em> ¿No tienes una cuenta? Regístrate aquí</em>.
            </p>
            <p className="mb-2">
              Una vez registrado, inicia sesión para acceder a tu panel, donde podrás:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Cambiar tu punto</li>
              <li>Solicitar un turno</li>
              <li>Cancelar un turno</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
