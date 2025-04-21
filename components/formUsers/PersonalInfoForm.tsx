import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"

export default function PersonalInfoForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Ingrese los datos personales del usuario</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contenido del formulario personal */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-user.jpg" alt="@user" />
              <AvatarFallback className="text-2xl">U</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Cambiar Foto
            </Button>
          </div>
          <div className="flex-1 grid gap-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Ingrese el nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" placeholder="Ingrese el apellido" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documento">Documento de Identidad</Label>
                <Input id="documento" placeholder="Ingrese el documento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" placeholder="Ingrese el teléfono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" placeholder="Ingrese la dirección" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fecha-nacimiento">Fecha de Nacimiento</Label>
            <Input id="fecha-nacimiento" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genero">Género</Label>
            <Select>
              <SelectTrigger id="genero">
                <SelectValue placeholder="Seleccione el género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
                <SelectItem value="no-especificado">Prefiero no especificar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button>Siguiente</Button>
      </CardFooter>
    </Card>
  )
}