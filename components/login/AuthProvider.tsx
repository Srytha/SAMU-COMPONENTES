// AuthProvider.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface User {
  cedula: string
  rol: string
}

interface AuthContextType {
  user: User | null
  login: (cedula: string, password?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (cedula: string, password?: string) => {
    try {
      // Paso 1: Consultar si el usuario existe
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula }),
      })

      const data = await res.json()

      if (res.ok) {
        const rol = data.rol

        if (rol === "paciente") {
          // Paciente: solo con cédula
          setUser({ cedula, rol })
          alert("Sesión iniciada correctamente")
        } else if ((rol === "admin" || rol === "asesor") && password) {
          // Admin o Asesor: necesita validar contraseña
          const resPass = await fetch("http://127.0.0.1:8000/validar_password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cedula, password }),
          })
          const tokenData = await resPass.json()

          if (resPass.ok) {
            localStorage.setItem("token", tokenData.token)
            setUser({ cedula, rol })
            alert("Sesión iniciada correctamente")
          } else {
            alert(tokenData.message || "Contraseña incorrecta")
          }
        } else {
          alert("Se requiere contraseña para este rol")
        }
      } else {
        alert(data.message || "Usuario no encontrado")
      }
    } catch (error) {
      console.error("Error de login:", error)
      alert("Error de conexión con el servidor")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
