'use client';

import { Badge } from '@/components/ui/badge';

export default function AppHeader() {
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
      </div>
    </header>
  );
}
