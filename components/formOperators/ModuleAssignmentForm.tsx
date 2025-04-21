import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";


/*

Abarca la pestana de asignacion de modulo donde

- Módulo Asignado
Un Select (lista desplegable) donde puedes elegir uno de estos:

Módulo 1
Módulo 2
Módulo 3
Módulo 4

Especialidad Otro Select donde se puede elegir la especialidad del operador:

Consulta General
Consulta Especializada
Laboratorio
Farmacia

- Configuración de Atención
Tiempo Promedio (minutos)
Capacidad Máxima Diaria
Atención Prioritaria


3. Servicios adicionales, no veo pa q sirva


Toma de Muestras (labServices)
Emisión de Recetas (prescriptions)
Derivación a Especialistas (referrals)

PROPS

data: contiene los datos actuales del formulario (módulo, especialidad, etc.)

onUpdate: función para actualizar el estado con los cambios que el usuario haga
*/
interface ModuleAssignmentFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ModuleAssignmentForm = ({ data, onUpdate }: ModuleAssignmentFormProps) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Asignación de Módulo</CardTitle>
      <CardDescription>Configure el módulo y especialidad del operador</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6 h-[calc(100%-100px)] overflow-y-auto">
      <div className="space-y-6">
        {/* Sección Módulo y Especialidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Módulo Asignado</Label>
            <Select 
              value={data.module} 
              onValueChange={value => onUpdate({...data, module: value})}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Seleccione un módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modulo-1">Módulo 1</SelectItem>
                <SelectItem value="modulo-2">Módulo 2</SelectItem>
                <SelectItem value="modulo-3">Módulo 3</SelectItem>
                <SelectItem value="modulo-4">Módulo 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Especialidad</Label>
            <Select
              value={data.specialty}
              onValueChange={value => onUpdate({...data, specialty: value})}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Seleccione una especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consulta-general">Consulta General</SelectItem>
                <SelectItem value="consulta-especializada">Consulta Especializada</SelectItem>
                <SelectItem value="laboratorio">Laboratorio</SelectItem>
                <SelectItem value="farmacia">Farmacia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Configuración de Atención */}
        <div className="space-y-6">
          <h3 className="text-sm font-medium text-foreground">Configuración de Atención</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Tiempo Promedio (minutos)</Label>
              <Select
                value={data.avgTime}
                onValueChange={value => onUpdate({...data, avgTime: value})}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Seleccione tiempo" />
                </SelectTrigger>
                <SelectContent>
                  {[3, 5, 10, 15, 20].map((time) => (
                    <SelectItem key={time} value={time.toString()}>
                      {time} minutos
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Capacidad Máxima Diaria</Label>
              <Input
                type="number"
                value={data.maxPatients}
                onChange={(e) => onUpdate({
                  ...data, 
                  maxPatients: Math.max(0, parseInt(e.target.value) || 0)
                })}
                className="h-10"
                placeholder="Ej: 30"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label className="block">Atención Prioritaria</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Habilitar para casos prioritarios
              </p>
            </div>
            <Switch
              checked={data.priorityCare}
              onCheckedChange={checked => onUpdate({...data, priorityCare: checked})}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Servicios Adicionales */}
        <div className="space-y-6">
          <h3 className="text-sm font-medium text-foreground">Servicios Adicionales</h3>
          
          <div className="space-y-4">
            {[
              { label: "Toma de Muestras", key: "labServices" },
              { label: "Emisión de Recetas", key: "prescriptions" },
              { label: "Derivación a Especialistas", key: "referrals" }
            ].map((service) => (
              <div 
                key={service.key}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <Label>{service.label}</Label>
                <Switch
                  checked={data[service.key]}
                  onCheckedChange={checked => onUpdate({...data, [service.key]: checked})}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
); 