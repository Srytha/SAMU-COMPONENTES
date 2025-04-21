import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Menu } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

/*
Esta pestana basicamente se basa en esto:

[☰]  Título de la página                                 🔔 📅 👤

Botones de acciones:

Selector de fecha ("Hoy")
Llamar siguiente turno

Osea su función principal es tener una barra superior con herramientas y acciones rápidas.

Tiene un prop que viene hacer el titulo
*/


// Interface para las props
interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps): ReactElement => (
  <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
    <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        {/* Botón móvil para el sidebar */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Título de la página */}
        <h1 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h1>
      </div>

      {/* Acciones del header */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          aria-label="Calendario"
        >
          <Calendar className="h-5 w-5 text-gray-600" />
        </Button>

        {/* Perfil de usuario */}
        <Avatar className="h-8 w-8 border-2 border-gray-100">
          <AvatarImage 
            src="/placeholder-user.jpg" 
            alt="Avatar del administrador"
          />
          <AvatarFallback className="bg-blue-100 font-medium">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
);