'use client';

import AppHeader from "@/components/vistaGeneral/AppHeader";
import WelcomeSection from "@/components/vistaGeneral/WelcomeSection";
import ServiceStatusCard from "@/components/vistaGeneral/ServiceStatusCard";
import UpcomingTurnsTable from "@/components/vistaGeneral/UpcomingTurnsTable";
import AppFooter from "@/components/vistaGeneral/AppFooter";
import AnnouncementsCard from "@/components/vistaGeneral/AnnouncementsCard";
import MobileAccessCard from "@/components/vistaGeneral/MobileAccessCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Home page component for the SAMU Sistema de Atención
 */
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
        <div className="max-w-5xl mx-auto">
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
                  {/* Status Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
                  
                  {/* Upcoming Turns Table */}
                  <div className="bg-white rounded-lg p-1">
                    <UpcomingTurnsTable />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column (Announcements & Mobile Access) */}
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