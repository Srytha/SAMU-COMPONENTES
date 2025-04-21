export default function Footer() {
    return (
      <footer className="bg-blue-800 text-white py-4 mt-10">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} SAMU - Sistema de Atención y Manejo de Usuarios
        </div>
      </footer>
    )
  }
  