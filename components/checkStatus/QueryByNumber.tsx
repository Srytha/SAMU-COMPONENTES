import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ConsultaPorNumero() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta por Número de Turno</CardTitle>
        <CardDescription>Ingrese el número de turno que recibió</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input placeholder="Ej: N-015 o P-005" />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
