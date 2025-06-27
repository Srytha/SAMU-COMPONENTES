// ConsultaPorNumero.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ConsultaPorNumero() {
  return (
    <Card className="border-t-4 border-t-blue-500 shadow-md bg-gray-50">
      <CardHeader className="pb-4 space-y-2">
        <CardTitle className="text-blue-700 text-xl">Consultar por Número de Turno</CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Ingrese el número que recibió al solicitar el turno.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Ej: N-015 o P-005" 
            className="focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-base"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-base">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
