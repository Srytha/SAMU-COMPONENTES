import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FormEvent,
} from "react";

// Tipo del usuario
interface User {
  cedula: string;
}

// Tipo del contexto
interface AuthContextType {
  user: User | null;
  login: (cedula: string) => void;
  logout: () => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Componente proveedor
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (cedula: string) => {
    setUser({ cedula });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente que usa el contexto
const Login = () => {
  const { user, login, logout } = useAuth();
  const [cedulaInput, setCedulaInput] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(cedulaInput);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {user ? (
        <div>
          <h2>Bienvenido, {user.cedula}</h2>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Cédula"
            value={cedulaInput}
            onChange={(e) => setCedulaInput(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      )}
    </div>
  );
};

// Renderizar todo en un solo componente
export default function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
