import AppHeader  from "@/components/vistaGeneral/AppHeader";

import WelcomeSection from "@/components/vistaGeneral/WelcomeSection";
import ServiceStatusCard from "@/components/vistaGeneral/ServiceStatusCard";
import UpcomingTurnsTable from "@/components/vistaGeneral/UpcomingTurnsTable";
import AppFooter from "@/components/vistaGeneral/AppFooter";
import AnnouncementsCard from "@/components/vistaGeneral/AnnouncementsCard";
import MobileAccessCard from "@/components/vistaGeneral/MobileAccessCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Image from "next/image";



export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-5xl mx-auto">
          <WelcomeSection />
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    Estado Actual del Servicio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <ServiceStatusCard 
                      title="Turno Prioritario"
                      type="priority"
                      currentNumber="P-005"
                      waitTime="5 min"
                    />
                    <ServiceStatusCard 
                      title="Turno General"
                      type="general"
                      currentNumber="N-015"
                      waitTime="15 min"
                    />
                  </div>
                  <UpcomingTurnsTable />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <AnnouncementsCard />
              <MobileAccessCard />
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}