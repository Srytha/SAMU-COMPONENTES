"use client";

import Link from "next/link";
import React, { SVGProps } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  BarChart3,
  MessageSquare,
  LogOut,
  UserCircle,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Interfaces
interface NavLinkProps {
  href: string;
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
  label: string;
  isActive?: boolean;
}

interface SidebarProps {
  activeLink: string;
  isOpen?: boolean;   // Para mostrar Sidebar en mobile
  onClose?: () => void; //Para cerrar Sidebar en mobile
}

// NavLink
const NavLink = ({ href, icon, label, isActive = false }: NavLinkProps) => (
  <Link href={href} className="block relative group">
    {isActive && (
      <div className="absolute inset-0 bg-blue-600/10 rounded-lg blur-sm"></div>
    )}
    <div
      className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-blue-800/60 backdrop-blur-sm border border-blue-600 text-blue-100"
          : "text-blue-100 hover:bg-blue-800/40 hover:backdrop-blur-sm border border-transparent hover:border-blue-700"
      }`}
    >
      <div
        className={`p-2 rounded-md transition-all ${
          isActive
            ? "bg-blue-700 text-blue-100"
            : "bg-blue-900 text-blue-200 group-hover:bg-blue-800 group-hover:text-blue-100"
        }`}
      >
        {React.cloneElement(icon, { className: "w-4 h-4" })}
      </div>
      <span className="flex-1 text-sm font-medium">{label}</span>
    </div>
  </Link>
);

// Sidebar Principal
export const Sidebar = ({ activeLink, isOpen, onClose }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const navLinks = [
    { href: "/admin", icon: <Users />, label: "Registro de Asesores" },
    { href: "/admin/estadisticas", icon: <BarChart3 />, label: "Estadísticas" },
    { href: "/admin/anuncios", icon: <MessageSquare />, label: "Anuncios" },
    { href: "/admin/usuarios", icon: <UserCircle />, label: "Gestión de Usuarios" },
  ];

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex w-72 flex-col bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 border-r border-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-800/40 backdrop-blur-sm"></div>

        <div className="relative p-4 pt-6 border-b border-blue-800 z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl"></div>
            <div>
              <h1 className="font-bold text-lg text-blue-100">DASHBOARD SAMU</h1>
              <p className="text-xs text-blue-300">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 relative z-10">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 px-2">
            Centro de Control
          </div>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={activeLink === link.href}
            />
          ))}
        </nav>

        <div className="relative p-4 border-t border-blue-800 z-10">
          <div className="bg-blue-900/50 border border-blue-800 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 ring-2 ring-blue-700">
                <AvatarImage src="/placeholder-user.jpg" alt="@admin" />
                <AvatarFallback className="bg-blue-800 text-blue-200">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-semibold text-blue-100">
                  Sistema de Gestión
                </div>
                <div className="text-xs text-blue-400">Administrador</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full bg-blue-200 text-black hover:bg-blue-300 transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="relative w-64 flex flex-col bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 border-r border-blue-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-800/40 backdrop-blur-sm"></div>

            <div className="relative flex items-center justify-between p-4 border-b border-blue-800 z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl"></div>
                <h1 className="font-bold text-lg text-blue-100">
                  DASHBOARD SAMU
                </h1>
              </div>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-blue-100" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 relative z-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  isActive={activeLink === link.href}
                />
              ))}
            </nav>
          </div>
          {/* Fondo oscuro detrás */}
          <div className="flex-1 bg-black/50" onClick={onClose}></div>
        </div>
      )}
    </>
  );
};
