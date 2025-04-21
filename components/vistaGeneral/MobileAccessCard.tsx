"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AnnouncementsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Anuncios</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2].map((_, i) => (
          <div key={i} className="border rounded-lg p-2 hover:shadow-md transition-shadow">
            <Image
              src="/placeholder.svg?height=150&width=300"
              alt={`Anuncio ${i + 1}`}
              width={300}
              height={150}
              className="rounded-md w-full h-auto bg-orange-500 p-4"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
