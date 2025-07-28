"use client";

import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

// Interface para las props
interface HeaderProps {
  title: string;
  onToggleSidebar?: () => void; // ✅ Ahora acepta onToggleSidebar
}

export const Header = ({ title, onToggleSidebar }: HeaderProps): ReactElement => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10 relative overflow-hidden">
    {/* Ondas decorativas */}
    <div className="absolute inset-0">
      <svg className="w-full h-full" viewBox="0 0 800 80" fill="none" preserveAspectRatio="none">
        <path 
          d="M0,40 Q200,20 400,40 T800,40 L800,0 L0,0 Z" 
          fill="url(#gradient1)"
        />
        <path 
          d="M0,60 Q150,40 300,60 T600,60 Q700,50 800,60 L800,80 L0,80 Z" 
          fill="url(#gradient2)"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EBF8FF" />
            <stop offset="50%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#EFF6FF" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
        </defs>
      </svg>

      {/* Degradado para desvanecer las ondas */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white"></div>
    </div>

    <div className="flex items-center justify-between p-4 max-w-7xl mx-auto relative">
      <div className="flex items-center gap-4">
        {/* Botón de menú */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-blue-50 hover:border-blue-300 transition-all"
          aria-label="Abrir menú"
          onClick={onToggleSidebar} // ✅ Llama a tu función al hacer clic
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Título con glassmorphism */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20"></div>
          <div className="relative px-6 py-3">
            <h1 className="text-lg font-bold text-gray-800">{title}</h1>
            <div className="flex gap-1 mt-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-sm opacity-20"></div>
        <Avatar className="h-10 w-10 relative border-2 border-white/50">
          <AvatarImage 
            src="/placeholder-user.jpg" 
            alt="Avatar del administrador"
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
);
