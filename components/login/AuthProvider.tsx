"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: number;
  nombre: string;
  puntoAtencion: string;
  cedula?: string;
  rol?: string;
}

interface AuthContextType {
  user: User | null;
  login: (cedula: string, password: string) => Promise<{ success: boolean; rol?: string; errorMessage?: string }>;
  logout: () => void;
  isLoading: boolean;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "https://projectdesarrollo.onrender.com/auth";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async (token: string): Promise<User | null> => {
    try {
      const headers = {
        Authorization: `Bearer ${token.trim()}`,
        "Content-Type": "application/json",
      };

      const res = await fetch(`${API_BASE_URL}/validar_token`, {
        method: "GET",
        headers,
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
  };

  const checkAuthStatus = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      const userData = await validateToken(token);
      setUser(userData);
    }

    setIsLoading(false);
  };

  const login = async (cedula: string, password: string): Promise<{ success: boolean; rol?: string; errorMessage?: string }> => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula, password }),
      });

      const data = await res.json();
      console.log("Respuesta login:", res.status, data);

      if (res.ok && data && data.token && data.message) {
        const cleanToken = data.token.trim().replace(/^"|"$/g, "");
        localStorage.setItem("token", cleanToken);

        const userData = await validateToken(cleanToken);
        if (userData) {
          setUser({ ...userData, cedula, rol: data.message });
        }

        return { success: true, rol: data.message };
      }

      // Manejar error 423 (usuario bloqueado)
      if (res.status === 423 && data && data.message) {
        return { success: false, errorMessage: data.message };
      }

      // Manejar error 401 (contraseña incorrecta)
      if (res.status === 401 && data && data.message) {
        // Puedes incluir los intentos restantes si lo deseas
        let msg = data.message;
        if (typeof data.intentos_restantes === "number") {
          msg += ` Intentos restantes: ${data.intentos_restantes}`;
        }
        return { success: false, errorMessage: msg };
      }

      return { success: false };
    } catch (error) {
      console.error("Error de login:", error);
      return { success: false, errorMessage: "Error de conexión con el servidor. Intente nuevamente." };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
