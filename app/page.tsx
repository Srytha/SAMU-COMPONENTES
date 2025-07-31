"use client"

import AppHeader from "@/components/vistaGeneral/AppHeader"
import WelcomeSection from "@/components/vistaGeneral/WelcomeSection"
import AppFooter from "@/components/vistaGeneral/AppFooter"
import AnnouncementsCard from "@/components/vistaGeneral/AnnouncementsCard"
import MobileAccessCard from "@/components/vistaGeneral/MobileAccessCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VisualizarTurnos from "@/components/vistaGeneral/visualizarTurnos"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <AppHeader />

      {/* Welcome Banner Section */}
      <section className="w-full">
        <WelcomeSection />
      </section>

      {/* Main Content Container */}
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Primary Content Area - Service Status */}
              <div className="lg:col-span-2 order-1">
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b border-gray-100/80">
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                      Estado Actual del Servicio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <VisualizarTurnos />
                  </CardContent>
                </Card>
              </div>

              {/* Secondary Content Area - Sidebar */}
              <div className="order-2 lg:order-2">
                <div className="space-y-6">
                  {/* Announcements Card */}
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <AnnouncementsCard />
                  </div>

                  {/* Mobile Access Card */}
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <MobileAccessCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  )
}
