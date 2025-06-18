'use client';

import AppHeader from "@/components/vistaGeneral/AppHeader";
import WelcomeSection from "@/components/vistaGeneral/WelcomeSection";
import AppFooter from "@/components/vistaGeneral/AppFooter";
import AnnouncementsCard from "@/components/vistaGeneral/AnnouncementsCard";
import MobileAccessCard from "@/components/vistaGeneral/MobileAccessCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VisualizarTurnos from "@/components/vistaGeneral/visualizarTurnos"; 


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Header Section */}
      <AppHeader />
      
      {/* Welcome Banner Section (Full Width) */}
      <section className="w-full mb-8">
        <WelcomeSection />
      </section>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <div className="w-full max-w-7xl mx-auto">

          {/* Two-Column Layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column (Service Status) */}
            <div className="md:col-span-2">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
                <CardHeader className="pb-3 border-b border-gray-100">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="inline-block w-1 h-5 bg-blue-500 rounded mr-3"></span>
                    Estado Actual del Servicio
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                  <VisualizarTurnos />
                </CardContent>
              </Card>
            </div>

            {/* Announcements & Mobile Access */}
            <div className="space-y-6">
              <AnnouncementsCard />
              <MobileAccessCard />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
