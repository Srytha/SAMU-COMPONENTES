import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

/*

Se encarga de gestionar la configuración de horarios y disponibilidad de un operador

osea este componente es donde abarca el formulario el cual permite seleccionar el turno de trabajo, 
los días de trabajo y toda esa monda 

Tiene dos prop

data: Este prop contiene la información actual que se mostrará en el formulario.

onUpdate: Este prop es una función que se pasa desde el componente padre.
Cada vez que el usuario modifica algún valor en el formulario (como seleccionar un turno,
cambiar los días de trabajo, o activar/desactivar una opción), la función onUpdate se llama 
para actualizar el estado del formulario.

*/
interface ScheduleFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ScheduleForm = ({ data, onUpdate }: ScheduleFormProps) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Horario y Disponibilidad</CardTitle>
      <CardDescription>Configure el horario de trabajo del operador</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6 h-[calc(100%-80px)] overflow-y-auto">
      {/* Sección de Turnos */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Turno de Trabajo</h3>
        <RadioGroup 
          value={data.shift} 
          onValueChange={value => onUpdate({...data, shift: value})}
          className="space-y-3"
        >
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="manana" id="manana" />
            <div className="grid gap-1.5">
              <Label htmlFor="manana" className="font-medium">
                Turno Mañana
              </Label>
              <p className="text-sm text-muted-foreground">8:00 AM - 14:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="tarde" id="tarde" />
            <div className="grid gap-1.5">
              <Label htmlFor="tarde" className="font-medium">
                Turno Tarde
              </Label>
              <p className="text-sm text-muted-foreground">14:00 PM - 20:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="completo" id="completo" />
            <div className="grid gap-1.5">
              <Label htmlFor="completo" className="font-medium">
                Turno Completo
              </Label>
              <p className="text-sm text-muted-foreground">8:00 AM - 20:00 PM (con descanso)</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Días de Trabajo */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Días de Trabajo</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={day.toLowerCase()}
                checked={data.workingDays.includes(day)}
                onChange={(e) => {
                  const updatedDays = e.target.checked
                    ? [...data.workingDays, day]
                    : data.workingDays.filter((d: string) => d !== day);
                  onUpdate({...data, workingDays: updatedDays});
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor={day.toLowerCase()}>{day}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Configuración Adicional */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Configuración Adicional</h3>
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <Label className="block">Estado Activo</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Habilitar/Deshabilitar operador
            </p>
          </div>
          <Switch
            checked={data.status}
            onCheckedChange={checked => onUpdate({...data, status: checked})}
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <Label className="block">Descansos Automáticos</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Programar descansos entre citas
            </p>
          </div>
          <Switch
            checked={data.autoBreaks}
            onCheckedChange={checked => onUpdate({...data, autoBreaks: checked})}
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <Label className="block">Notificaciones</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Recibir recordatorios de citas
            </p>
          </div>
          <Switch
            checked={data.notifications}
            onCheckedChange={checked => onUpdate({...data, notifications: checked})}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);