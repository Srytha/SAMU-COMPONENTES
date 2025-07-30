import React, { useState } from "react";
import { Phone } from "lucide-react";
import RawQRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const QRCode = RawQRCode as unknown as React.FC<{ value: string; size?: number }>;

export default function MobileAccessCard() {
  const [mostrarQR, setMostrarQR] = useState(false);

  // ✅ baseURL dinámico basado en el navegador
  const baseURL =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://samu-componentes.vercel.app";

  const qrURL = `${baseURL}/consultarEstado`;

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
          <p className="text-sm mb-3">
            Consulte el estado de su turno desde su teléfono móvil
          </p>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => setMostrarQR(!mostrarQR)}
          >
            {mostrarQR ? "Ocultar QR" : "Escanear QR"}
          </Button>
          {mostrarQR && (
            <div className="mt-4 flex justify-center bg-white p-4 rounded">
              <QRCode value={qrURL} size={180} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
