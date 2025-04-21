import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


/*

Esta pestana contiene la informacion personal de un operador

- Foto de perfil
- Nombre y apellido
- documento y telefono
- email
- fecha nacimiento y genero
- direccion

- Credenciales de acceso

Props

data: contiene todos los valores actuales del formulario (nombre, apellido, etc.)

onUpdate: función que se llama cada vez que se modifica un campo, para actualizar el estado 

*/
interface PersonalInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Información Personal</CardTitle>
      <CardDescription>Ingrese los datos personales del operador</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6 h-[calc(100%-100px)] overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Sección Avatar */}
        <div className="w-full md:w-auto flex flex-col items-center gap-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="text-3xl">O</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="w-full">
            Cambiar Foto
          </Button>
        </div>

        {/* Formulario */}
        <div className="flex-1 grid gap-6 w-full">
          {/* Fila 1 - Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input 
                id="nombre"
                className="h-10"
                placeholder="Ingrese el nombre"
                value={data.name}
                onChange={(e) => onUpdate({...data, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input 
                id="apellido"
                className="h-10"
                placeholder="Ingrese el apellido"
                value={data.lastName}
                onChange={(e) => onUpdate({...data, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Fila 2 - Documento y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="documento">Documento de Identidad</Label>
              <Input 
                id="documento"
                className="h-10"
                placeholder="Ingrese el documento"
                value={data.document}
                onChange={(e) => onUpdate({...data, document: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input 
                id="telefono"
                className="h-10"
                placeholder="Ingrese el teléfono"
                value={data.phone}
                onChange={(e) => onUpdate({...data, phone: e.target.value})}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              className="h-10"
              placeholder="Ingrese el email"
              value={data.email}
              onChange={(e) => onUpdate({...data, email: e.target.value})}
            />
          </div>

          {/* Fila 3 - Fecha Nacimiento y Género */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fecha-nacimiento">Fecha de Nacimiento</Label>
              <Input 
                id="fecha-nacimiento"
                type="date"
                className="h-10"
                value={data.birthDate}
                onChange={(e) => onUpdate({...data, birthDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genero">Género</Label>
              <Select
                value={data.gender}
                onValueChange={value => onUpdate({...data, gender: value})}
              >
                <SelectTrigger className="h-10" id="genero">
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

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input 
              id="direccion"
              className="h-10"
              placeholder="Ingrese la dirección"
              value={data.address}
              onChange={(e) => onUpdate({...data, address: e.target.value})}
            />
          </div>

          <Separator className="my-6" />

          {/* Credenciales de Acceso */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-foreground">Credenciales de Acceso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="usuario">Nombre de Usuario</Label>
                <Input 
                  id="usuario"
                  className="h-10"
                  placeholder="Ingrese el usuario"
                  value={data.username}
                  onChange={(e) => onUpdate({...data, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password"
                  type="password"
                  className="h-10"
                  placeholder="Ingrese la contraseña"
                  value={data.password}
                  onChange={(e) => onUpdate({...data, password: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);