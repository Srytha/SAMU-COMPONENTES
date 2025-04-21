import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ConsultaPorDocumento() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta por Documento</CardTitle>
        <CardDescription>Ingrese su documento de identidad</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input placeholder="Ingrese su documento" />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
