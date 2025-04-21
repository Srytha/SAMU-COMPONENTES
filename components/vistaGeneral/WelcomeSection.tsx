import { Button } from "@/components/ui/button";

const WelcomeSection = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Bienvenido al Sistema de Manejo de Atención
      </h1>
      <p className="text-muted-foreground mb-6">
        Gestione sus turnos de manera rápida y eficiente
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Solicitar Turno
        </Button>
        <Button size="lg" variant="outline">
          Consultar Estado
        </Button>
      </div>
    </div>
  );
};

export default WelcomeSection;
