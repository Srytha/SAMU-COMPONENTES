import Link from "next/link";

/* 

función principal:
Menú de navegación lateral para el panel de administración. 

- Tiene enlaces de navegación que permiten navegar por
 las diferentes secciones de la aplicación administrativa (Dashboard, Usuarios, Operadores, etc.).

- Resalta el enlace activo: El enlace que corresponde a la 
página actual se resalta.

- Muestra el perfil del usuario administrador con su avatar y nombre.

- Y un boton de cerrar sesion :v

Tambien tiene un prop pero es algo de diseno 

*/


import React, { SVGProps } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  UserCircle2,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



// Interfaces y tipos
interface NavLinkProps {
  href: string;
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
  label: string;
  isActive?: boolean;
}

type NavLinkItem = Omit<NavLinkProps, "isActive">;

// Componente NavLink
const NavLink = ({ href, icon, label, isActive = false }: NavLinkProps) => (
  <Link
    href={href}
    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-blue-800 text-white"
        : "text-blue-100 hover:bg-blue-800 hover:text-white"
    }`}
  >
    {React.cloneElement(icon, { className: "h-4 w-4" })}
    {label}
  </Link>
);

// Interface del Sidebar
interface SidebarProps {
  activeLink: string;
}

// Componente Principal
export const Sidebar = ({ activeLink }: SidebarProps) => {
  const navLinks: NavLinkItem[] = [
    { href: "/admin", icon: <LayoutDashboard />, label: "Dashboard" },
    { href: "/admin/usuarios", icon: <Users />, label: "Gestión de Usuarios" },
    { href: "/admin/operadores", icon: <UserCircle2 />, label: "Gestión de Asesores" },
    { href: "/turnos", icon: <FileText />, label: "Gestión de Turnos" },
    { href: "/estadisticas", icon: <BarChart3 />, label: "Estadísticas" },
    //{ href: "/especialidades", icon: <Stethoscope />, label: "Especialidades" },
    { href: "/anuncios", icon: <MessageSquare />, label: "Anuncios" },
    { href: "/configuracion", icon: <Settings />, label: "Configuración" },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col bg-blue-900 text-white">
      <div className="p-4 border-b border-blue-800">
        <div className="font-bold text-xl">SAMU Admin</div>
        <div className="text-xs text-blue-300">Sistema de Gestión</div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
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

      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8 border border-blue-700">
            <AvatarImage src="/placeholder-user.jpg" alt="@admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-blue-300">Administrador</div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-blue-100 border-blue-700 hover:bg-blue-800 hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
};