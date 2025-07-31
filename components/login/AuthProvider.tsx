"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface User {
  id: number
  nombre: string
  puntoAtencion: string
  cedula?: string
}

interface AuthContextType {
  user: User | null
  login: (cedula: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  checkAuthStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Configuración de la API - USA LA MISMA BASE URL
const API_BASE_URL = "https://projectdesarrollo.onrender.com/auth"

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Función para validar el token actual
  const validateToken = async (token: string): Promise<User | null> => {
    try {
      const headers = {
        "Authorization": `Bearer ${token.trim()}`,
        "Content-Type": "application/json"
      };

      const res = await fetch(`${API_BASE_URL}/validar_token`, {
        method: "GET",
        headers
      });

      console.log("Respuesta validación token:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("Datos del usuario:", data);
        return data.data;
      } else {
        console.log("Token inválido, eliminando...");
        localStorage.removeItem("token");
        return null;
      }
    } catch (error) {
      console.error("Error validando token:", error);
      localStorage.removeItem("token");
      return null;
    }
  }

  // Función para verificar el estado de autenticación al cargar
  const checkAuthStatus = async () => {
    setIsLoading(true)
    const token = localStorage.getItem("token")
    
    if (token) {
      const userData = await validateToken(token)
      setUser(userData)
    }
    
    setIsLoading(false)
  }

  // Función de login actualizada
  const login = async (cedula: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula, password })
      });

      const data = await res.text(); // Cambiar de .json() a .text() porque devuelve string
      console.log("Respuesta login:", res.status, data);

      if (res.ok && data && data.trim() !== "") {
        const cleanToken = data.trim().replace(/^"|"$/g, ""); // Elimina comillas al inicio y al final
        localStorage.setItem("token", cleanToken);
        console.log("Token limpio guardado en localStorage:", cleanToken);

        const userData = await validateToken(cleanToken);
        if (userData) {
          setUser({ ...userData, cedula });
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error de login:", error);
      return false;
    }
  }

  // Función de logout
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  )
}