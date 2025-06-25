// Constantes para la API
// Usamos una ruta relativa que será manejada por el proxy de Next.js
export const API_BASE_URL = "/api"

// Función reutilizable para hacer peticiones a la API
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // Configuración por defecto para todas las peticiones
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  try {
    const response = await fetch(url, defaultOptions)

    // Para respuestas no-JSON (como 204 No Content)
    if (response.status === 204) {
      return { success: true }
    }

    // Intentar parsear la respuesta como JSON
    let data
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    // Si la respuesta no es exitosa, lanzar un error con los detalles
    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
        data,
      }
    }

    return data
  } catch (error) {
    // Manejar errores de red o de parsing
    if (!error || typeof error !== 'object' || !('status' in error)) {
      error = {
        status: 0,
        statusText: "Error de red",
        data: { message: "No se pudo conectar con el servidor" },
      }
    }
    throw error
  }
}

// Funciones específicas para cada endpoint
export const authAPI = {
  registro: async (userData: {
    cedula: number
    nombre: string
    edad: number
    celular: string
    correo: string
    password: string
  }) => {
    return fetchAPI("/auth/registro", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  login: async (credentials: { correo: string; password: string }) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },
}
