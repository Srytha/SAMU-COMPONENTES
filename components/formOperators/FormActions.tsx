// components/operators/form/FormActions.tsx
import { Button } from "@/components/ui/button";
import { X, Save, ChevronLeft } from "lucide-react";


/* 

Controla la navegacion del formulario
Osea muestra los botones de (Anterior, siguiente,cancelar,guardar) segun la pestana activa

Ojo:
Recibe tres pops

- activeTab: Indica en qué pestaña del formulario estás 
- onTabChange: función que se usa para cambiar de pestaña
- onSubmit: Función que se ejecuta cuando haces clic en "Guardar Operador"
*/
interface FormActionsProps {
  activeTab: 'personal' | 'module' | 'schedule';
  onTabChange: (tab: 'personal' | 'module' | 'schedule') => void;
  onSubmit: () => void;
}

export const FormActions = ({ activeTab, onTabChange, onSubmit }: FormActionsProps) => (
  <div className="flex justify-between mt-6">
    <div>
      {activeTab !== 'personal' && (
        <Button 
          variant="outline" 
          onClick={() => onTabChange(activeTab === 'module' ? 'personal' : 'module')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
      )}
    </div>
    
    <div className="flex gap-2">
      <Button variant="outline">
        <X className="h-4 w-4 mr-2" />
        Cancelar
      </Button>
      
      {activeTab === 'schedule' ? (
        <Button onClick={onSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Guardar Operador
        </Button>
      ) : (
        <Button onClick={() => onTabChange(activeTab === 'personal' ? 'module' : 'schedule')}>
          Siguiente
        </Button>
      )}
    </div>
  </div>
);