
import { AdminLayout } from "@/components/dashboardPrincipal/layout";
import { FilterControls } from "@/components/operators/FilterControls";
import { OperatorsTable } from "@/components/operators/OperatorsTable";
import { Operator } from "@/components/operators/OperatorsRow"; 
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";

/*

vista principal para administrar operadores dentro del panel de administración 

Esta cosa contiene: 

AdminLayout (estructura general)
FilterControls (controles superiores)
OperatorsTable (tabla principal)


Osea es una combinación de:

Layout general de admin.
Controles para filtrar y buscar.
Botón para agregar nuevos.
Tabla que lista los operadores.

*/


const operatorsData: Operator[] = [
  {
    // Un ejemplo
    id: "OP-001",
    name: "Laura Ramírez",
    avatar: "/placeholder-user.jpg",
    initials: "LR",
    module: "Módulo 1",
    specialty: "Consulta General",
    status: "Activo",
    shift: "Mañana (8:00 - 14:00)",
    patients: 42,
    todayPatients: "+8 hoy"
  },
  // ... 
];

export default function GestionOperadores() {
  return (
    <AdminLayout activeLink="/admin/operadores" pageTitle="Gestión de Operadores" title="Gestión de Operadores" >
      <div className="grid gap-4 pl-4 pr-4 py-4"> {/* padding general */}
        
        {/* Sección Superior*/}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold">Operadores</h2> {/* Tamaño más pequeño */}
            <p className="text-muted-foreground text-sm"> {/* Texto más compacto */}
              Gestiona los operadores que atienden en los módulos
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Link href="/admin/operadores/nuevoOperador" passHref>
              <Button size="sm"> {/* Botón más pequeño */}
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Operador
              </Button>
            </Link>
          </div>
        </div>

        <FilterControls />
        <OperatorsTable operators={operatorsData} />

        {/* Pie de tabla más compacto */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
          <div className="text-muted-foreground">
            Mostrando 4 de 4 operadores
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled
              className="h-8 px-3" // Altura fija
            >
              Anterior
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled
              className="h-8 px-3"
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}