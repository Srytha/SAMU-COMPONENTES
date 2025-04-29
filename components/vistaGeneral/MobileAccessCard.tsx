// components/public/MobileAccessCard.tsx
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MobileAccessCard() {
  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Acceso Móvil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-4 border rounded-lg bg-muted/30">
          <div className="mb-3">
            <Phone className="h-8 w-8 mx-auto text-blue-600" />
          </div>
          <p className="text-sm mb-3">Consulte el estado de su turno desde su teléfono móvil</p>
          <Button size="sm" variant="outline" className="w-full">
            Escanear QR
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}