// ConsultaPorDocumento.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ConsultaPorDocumento() {
  return (
    <Card className="border-t-4 border-t-blue-500 shadow-md bg-gray-50">
      <CardHeader className="pb-4 space-y-2">
        <CardTitle className="text-blue-700 text-xl">Consultar con Documento</CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Escriba su número de documento para verificar el estado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Número de documento" 
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
