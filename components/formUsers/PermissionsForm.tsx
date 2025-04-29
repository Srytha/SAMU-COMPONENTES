import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Save, X } from "lucide-react"

export default function PermissionsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permisos</CardTitle>
        <CardDescription>Configure los permisos y accesos del usuario</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Módulos del Sistema</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="modulo-usuarios">Gestión de Usuarios</Label>
              <Switch id="modulo-usuarios" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Acciones Permitidas</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="accion-crear">Crear Registros</Label>
              <Switch id="accion-crear" defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notas Adicionales</h3>
          <div className="space-y-2">
            <Label htmlFor="notas">Notas sobre el usuario</Label>
            <textarea
              id="notas"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ingrese notas o comentarios adicionales sobre este usuario"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Guardar Usuario
        </Button>
      </CardFooter>
    </Card>
  )
}