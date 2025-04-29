'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * WelcomeSection component displays the main welcome banner with action buttons
 * for the SAMU Sistema de Atención application
 */
const WelcomeSection = () => {
  const router = useRouter();
  
  // Navigation handlers
  const handleNavigation = (path: string) => () => router.push(path);
  
  return (
    <section className="bg-gradient-to-br from-[#BEDAFF] to-[#AFC5FF] p-8 md:p-12 rounded-lg shadow-md w-full text-center">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Bienvenido al Sistema de Manejo de Atención
        </h1>
        
        {/* Description */}
        <p className="mb-8 text-gray-700 text-lg">
          Gestione sus turnos de manera rápida y eficiente
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[#3f6ad8] hover:bg-[#2a56c6] text-white font-semibold px-6 py-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleNavigation("/solicitarTurno")}
            aria-label="Solicitar un nuevo turno"
          >
            Solicitar Turno
          </Button>
          
          <Button
            size="lg"
            className="bg-[#3f6ad8] hover:bg-[#2a56c6] text-white font-semibold px-6 py-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleNavigation("/consultarEstado")}
            aria-label="Consultar estado de turno actual"
          >
            Consultar Estado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
