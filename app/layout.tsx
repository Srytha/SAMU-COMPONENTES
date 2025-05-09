import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from "@/components/login/AuthProvider";

export const metadata: Metadata = {
  title: 'SAMU'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
