import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ModuleAssignmentForm } from "./ModuleAssignmentForm";
import { ScheduleForm } from "./ScheduleForm";
import { OperatorFormData } from "@/app/admin/operadores/nuevoOperador/page";

/* 

Este componente se encarga de mostrar las 3 secciones
del formulario de registro 

Información Personal
Asignación de Módulo
Horario y Disponibilidad

Ademas controla cual pestana esta activa y hace renderizacion del formulario correspondiente
y permite navegar entre las pestanas, hace la navegación entre secciones y la sincronización
 de datos entre formularios

Tiene 4 props

activeTab = indica qué pestaña está activa 
formData = contiene toda la información del formulario (los tres bloques).
onTabChange = función que cambia la pestaña activa cuando el usuario navega entre secciones.
onFormUpdate = función que actualiza los datos del formulario cuando hay cambios.

*/

interface FormTabsProps {
  activeTab: 'personal' | 'module' | 'schedule';
  formData: OperatorFormData;
  onTabChange: (tab: 'personal' | 'module' | 'schedule') => void;
  onFormUpdate: (data: OperatorFormData) => void;
}

export const FormTabs = ({ activeTab, formData, onTabChange, onFormUpdate }: FormTabsProps) => (
  <Tabs 
    value={activeTab} 
    onValueChange={(value) => onTabChange(value as typeof activeTab)} 
    className="w-full"
  >
    <TabsList className="grid w-full grid-cols-3 h-12">
      <TabsTrigger value="personal" className="py-2">Información Personal</TabsTrigger>
      <TabsTrigger value="module" className="py-2">Asignación de Módulo</TabsTrigger>
      <TabsTrigger value="schedule" className="py-2">Horario y Disponibilidad</TabsTrigger>
    </TabsList>

    <TabsContent value="personal" className="min-h-[600px] overflow-y-auto">
      <PersonalInfoForm 
        data={formData.personalInfo} 
        onUpdate={(personalInfo) => onFormUpdate({...formData, personalInfo})} 
      />
    </TabsContent>

    <TabsContent value="module" className="min-h-[600px] overflow-y-auto">
      <ModuleAssignmentForm
        data={formData.moduleInfo}
        onUpdate={(moduleInfo) => onFormUpdate({...formData, moduleInfo})}
      />
    </TabsContent>

    <TabsContent value="schedule" className="min-h-[600px] overflow-y-auto">
      <ScheduleForm
        data={formData.scheduleInfo}
        onUpdate={(scheduleInfo) => onFormUpdate({...formData, scheduleInfo})}
      />
    </TabsContent>
  </Tabs>
);