import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"

export default function AccessSecurityForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acceso y Seguridad</CardTitle>
        <CardDescription>Configure las credenciales de acceso del usuario</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contenido del formulario de acceso */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Ingrese el email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="usuario">Nombre de Usuario</Label>
            <Input id="usuario" placeholder="Ingrese el nombre de usuario" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" placeholder="Ingrese la contraseña" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmar-password">Confirmar Contraseña</Label>
            <Input id="confirmar-password" type="password" placeholder="Confirme la contraseña" />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Tipo de Usuario</h3>
          <RadioGroup defaultValue="paciente">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="administrador" id="administrador" />
              <div className="grid gap-1.5">
                <Label htmlFor="administrador" className="font-medium">
                  Administrador
                </Label>
                <p className="text-sm text-muted-foreground">
                  Acceso completo al sistema y todas sus funcionalidades
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="paciente" id="paciente" />
              <div className="grid gap-1.5">
                <Label htmlFor="paciente" className="font-medium">
                  Paciente
                </Label>
                <p className="text-sm text-muted-foreground">
                  Acceso limitado para solicitar y consultar turnos
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Configuración de Cuenta</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="estado">Estado de la Cuenta</Label>
              <p className="text-sm text-muted-foreground">
                Activar o desactivar el acceso del usuario al sistema
              </p>
            </div>
            <Switch id="estado" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cambio-password">Forzar Cambio de Contraseña</Label>
              <p className="text-sm text-muted-foreground">
                El usuario deberá cambiar su contraseña en el primer inicio de sesión
              </p>
            </div>
            <Switch id="cambio-password" />
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