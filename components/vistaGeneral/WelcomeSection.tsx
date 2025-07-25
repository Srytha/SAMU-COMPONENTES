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
    <section className="relative bg-gradient-to-br from-[#BEDAFF] to-[#AFC5FF] p-8 md:p-12 shadow-md w-full text-center overflow-hidden z-0">
  {/* Floating Dots */}
      {/* Floating Dots (animated background elements) */}
      <div className="floating-dot absolute top-6 left-8 w-4 h-4 bg-white rounded-full opacity-70 z-0 pointer-events-none"></div>
      <div className="floating-dot absolute top-10 right-10 w-3.5 h-3.5 bg-white rounded-full opacity-60 z-0 pointer-events-none"></div>
      <div className="floating-dot absolute bottom-8 right-12 w-4 h-4 bg-white rounded-full opacity-50 z-0 pointer-events-none"></div>
      <div className="floating-dot absolute bottom-10 left-12 w-3.5 h-3.5 bg-white rounded-full opacity-55 z-0 pointer-events-none"></div>
      <div className="floating-dot absolute top-1/2 left-4 w-3 h-3 bg-white rounded-full opacity-45 z-0 pointer-events-none"></div>
      <div className="floating-dot absolute top-1/3 right-6 w-3 h-3 bg-white rounded-full opacity-40 z-0 pointer-events-none"></div>

      {/* Main content */}
      <div className="min-w-md mx-auto relative z-10">

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
            onClick={handleNavigation("/consultarEstado")}
            aria-label="Consultar estado de turno actual"
          >
            Consultar Estado
          </Button>
        </div>
      </div>

      {/* Inline animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .floating-dot {
          animation: float 4s ease-in-out infinite;
        }

        .floating-dot:nth-child(1) {
          animation-delay: 0s;
        }

        .floating-dot:nth-child(2) {
          animation-delay: 1s;
        }

        .floating-dot:nth-child(3) {
          animation-delay: 2s;
        }

        .floating-dot:nth-child(4) {
          animation-delay: 3s;
        }

        .floating-dot:nth-child(5) {
          animation-delay: 4s;
        }

        .floating-dot:nth-child(6) {
          animation-delay: 5s;
        }
      `}</style>
    </section>
  );
};

export default WelcomeSection;
