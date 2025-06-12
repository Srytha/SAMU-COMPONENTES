"use client"

import { AdminLayout } from "@/components/dashboardPrincipal/layout"
import PersonalInfoForm from "@/components/nuevoAsesor/PersonalInfoForm"

export default function NuevoUsuario() {
  return (
    <AdminLayout
      activeLink="/admin/usuarios"
      title="Usuarios"
      pageTitle="Nuevo Usuario"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Crear Nuevo Asesor</h1>
          <p className="text-muted-foreground">
            Completa el formulario para agregar un nuevo asesor al sistema.
          </p>
        </div>

        <PersonalInfoForm onNext={() => {}} />
      </div>
    </AdminLayout>
  )
}