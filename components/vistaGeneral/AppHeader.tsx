'use client';

import { useRouter } from 'next/navigation';
import { Info, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AppHeader() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">SAMU</span>
          <Badge
            variant="outline"
            className="text-xs font-normal border-blue-400 text-blue-100"
          >
            Sistema de Atención
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
            <Info className="h-4 w-4 mr-1" />
            Ayuda
          </Button>
          <Button variant="secondary" size="sm" onClick={handleLoginClick}>
            <User className="h-4 w-4 mr-1" />
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
}
