import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import { FilterControls } from "@/components/operators/FilterControls";
import { OperatorsTable } from "@/components/operators/OperatorsTable";
import { Operator } from "@/components/operators/OperatorsRow"; 

/*

vista principal para administrar operadores dentro del panel de administración 

Esta cosa contiene: 

AdminLayout (estructura general)
FilterControls (controles superiores)
OperatorsTable (tabla principal)

*/

const operatorsData: Operator[] = [
  {
    id: "OP-001",
    name: "Laura Ramírez",
    avatar: "/placeholder-user.jpg",
    initials: "LR",
    module: "Módulo 1",
    specialty: "Consulta General",
    status: "Activo",
    shift: "Mañana (8:00 - 14:00)",
    patients: 42,
  },
  // Puedes agregar más operadores aquí
];

export default function GestionOperadores() {
  return (
    <AdminLayout activeLink="/admin/operadores" pageTitle="Gestión de Operadores" title="Gestión de Operadores" >
      <div className="grid gap-4 pl-4 pr-4 py-4">
        
        {/* Sección Superior */}
        <div>
          <h2 className="text-xl font-bold">Operadores</h2>
          <p className="text-muted-foreground text-sm">
            Gestiona los operadores que atienden en los módulos
          </p>
        </div>

        <FilterControls />
        <OperatorsTable operators={operatorsData} />
        
      </div>
    </AdminLayout>
  );
}
