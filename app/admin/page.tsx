import React from "react";

// Importación de componentes principales del dashboard
import { Sidebar } from "@/components/dashboardPrincipal/Sidebar";
import { Header } from "@/components/dashboardPrincipal/Header";
import { StatsCard } from "@/components/dashboardPrincipal/StatsCard";
import { TurnsList } from "@/components/dashboardPrincipal/TurnsList";
import { DailyStats } from "@/components/dashboardPrincipal/DailyStats";

//  Importación de componentes UI reutilizables
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Bell } from "lucide-react";

//  Componente principal del Panel de Administración
export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Barra lateral de navegación */}
      <Sidebar activeLink="/admin" />

      <div className="flex-1 flex flex-col">
        {/*  Encabezado del panel */}
        <Header title="Panel de Administración" />

        {/*  Contenido principal */}
        <main className="flex-1 p-4 md:p-6 bg-muted/20">
          <div className="grid gap-6">

            {/* Sección Superior: título + botones */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-muted-foreground">
                  Gestión de turnos y estadísticas
                </p>
              </div>

              {/*  Botones de acciones rápidas */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Hoy
                </Button>
                <Button size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Llamar Siguiente
                </Button>
              </div>
            </div>

            {/* Sección de tarjetas de estadísticas */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total de Turnos"
                value="124"
                percentage="+12% respecto a ayer"
                progress={65}
              />
              <StatsCard
                title="Atendidos"
                value="87"
                percentage="70% del total"
                progress={70}
              />
              <StatsCard
                title="En Espera"
                value="37"
                percentage="30% del total"
                progress={30}
              />
              <StatsCard
                title="Tiempo Promedio"
                value="12 min"
                percentage="-2 min respecto a ayer"
                progress={40}
              />
            </div>

            {/* Sección Inferior: turnos en tiempo real y estadísticas diarias */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Turnos Actuales</CardTitle>
                  <CardDescription>
                    Gestión de turnos en tiempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TurnsList />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas del Día</CardTitle>
                  <CardDescription>
                    Distribución de turnos por servicio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DailyStats />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
