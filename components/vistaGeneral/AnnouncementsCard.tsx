'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Announcement {
  id: number;
  title: string;
  url: string;
}

export default function AnnouncementsCard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {

        const res = await fetch('https://projectdesarrollo.onrender.com/administrador/traer_anuncios', {
          method: 'GET'
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Error al obtener los anuncios');
        }

        const anuncios: Announcement[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          url: item.url,
        }));

        setAnnouncements(anuncios);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los anuncios');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Anuncios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500">Cargando anuncios...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : announcements.length === 0 ? (
          <p className="text-gray-500">No hay anuncios disponibles.</p>
        ) : (
          announcements.map((anuncio) => (
            <div
              key={`${anuncio.id}-${anuncio.url}`}
              className="border rounded-lg p-2 hover:shadow-md transition-shadow"
            >
              <Image
                src={anuncio.url}
                alt={anuncio.title}
                width={300}
                height={150}
                className="rounded-md w-full h-auto object-cover"
              />
              <p className="mt-2 text-sm text-center text-gray-700">{anuncio.title}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
