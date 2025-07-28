import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sección de Contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Sistema de Atención a Usuarios</h3>
            <ContactInfo />
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Enlaces Rápidos</h3>
            <QuickLinks />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-blue-700 text-center text-sm text-blue-200">
          © {currentYear} SAMU - Sistema de Atención y Manejo de Usuarios. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

const ContactInfo = () => (
  <ul className="space-y-2 text-blue-100">
    <ContactItem icon="email" text="Email: sistema.atencion@gmail.com" />
    <ContactItem icon="phone" text="Teléfono: (322) 416-0881" />
    <ContactItem icon="location" text="Avenida Principal #13-43, Ciudad Cali" />
  </ul>
);

const QuickLinks = () => (
  <ul className="space-y-1 text-blue-100">
    {[
      "Solicitar Turno",
      "Consultar Estado",
      "Preguntas Frecuentes",
      "Términos y Condiciones",
      "Política de Privacidad",
    ].map((link) => (
      <li key={link}>
        <Link href="#" className="hover:underline">
          {link}
        </Link>
      </li>
    ))}
  </ul>
);

const ContactItem = ({ icon, text }: { icon: string; text: string }) => (
  <li className="flex items-center gap-2">
    <IconSVG type={icon} />
    <span>{text}</span>
  </li>
);

const IconSVG = ({ type }: { type: string }) => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {type === "email" && (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    )}
    {type === "phone" && (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    )}
    {type === "location" && (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    )}
  </svg>
);

export default AppFooter;
