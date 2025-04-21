"use client"

import { AuthProvider } from "@/components/login/AuthProvider"
import LoginContent from "@/components/login/LoginContent"
import Footer from "@/components/footer/Footer"

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <LoginContent />
        <Footer />
      </div>
    </AuthProvider>
  )
}
