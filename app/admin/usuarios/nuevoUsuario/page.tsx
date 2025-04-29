"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, Calendar, Menu, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PersonalInfoForm from "@/components/formUsers/PersonalInfoForm"
import AccessSecurityForm from "@/components/formUsers/AccessSecurityForm"
// import PermissionsForm from "@/components/formUsers/PermissionsForm"

import { AdminLayout } from "@/components/dashboardPrincipal/layout"

export default function NuevoUsuario() {
  const [activeTab, setActiveTab] = useState<"informacion" | "acceso">("informacion")

  return (
    <AdminLayout
      activeLink="/admin/usuarios"
      title="Usuarios"
      pageTitle="Nuevo Usuario"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Crear Nuevo Usuario</h1>
          <p className="text-muted-foreground">
            Complete el formulario para crear un nuevo usuario en el sistema.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "informacion" | "acceso")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="informacion">Información Personal</TabsTrigger>
            <TabsTrigger value="acceso">Acceso y Seguridad</TabsTrigger>
          </TabsList>

          <TabsContent value="informacion" className="mt-4">
            <PersonalInfoForm onNext={() => setActiveTab("acceso")} />
          </TabsContent>

          <TabsContent value="acceso" className="mt-4">
            <AccessSecurityForm onBack={() => setActiveTab("informacion")} onSave={() => alert("Formulario guardado")} />
          </TabsContent>

        </Tabs>
      </div>
    </AdminLayout>
  )
}
