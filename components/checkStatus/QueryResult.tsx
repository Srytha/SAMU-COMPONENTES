import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function ResultadoConsulta() {
  return (
    <Card className="mt-8 border-2 border-blue-200">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-lg">Resultado de la Consulta</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Su turno actual:</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">N-023</span>
                <Badge className="bg-amber-500">En espera</Badge>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Tiempo estimado:</p>
                <p className="text-lg font-bold">20 minutos</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <h3 className="font-medium">Detalles del Turno</h3>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Servicio:</p>
                <p className="font-medium">Consulta General</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fecha:</p>
                <p className="font-medium">20/03/2025</p>
              </div>
              <div>
                <p className="text-muted-foreground">Hora de solicitud:</p>
                <p className="font-medium">10:15 AM</p>
              </div>
              <div>
                <p className="text-muted-foreground">Punto de atención:</p>
                <p className="font-medium">Módulo 3</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Estado de la Fila</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Turno actual en atención:</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  N-015
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Turnos antes que usted:</span>
                <span className="font-bold">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tiempo promedio por turno:</span>
                <span className="font-medium">~3 min</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-3 border-t bg-muted/20 mt-6">
        <Button variant="outline">Recibir Notificación</Button>
        <Button variant="destructive">Cancelar Turno</Button>
      </CardFooter>
    </Card>
  )
}
