

/* Esta cosa basicamente se usa para cuando la estructura es repetida, es decir 
quiero que el contenido cambie en función de la página seleccionada.

Por lo tanto integra:
Sidebar (fijo a la izquierda)
Header (barra superior)
Contenido principal (área flexible)

Usa props en:
Props:
children: Contenido de la página actual
activeLink: Para pasar al Sidebar
pageTitle: Para pasar al Header
*/


import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AdminLayoutProps {
  children: ReactNode;
  activeLink: string;
  title: string;
  pageTitle?: string; // Título para la pestaña del navegador
}

export const AdminLayout = ({
  children,
  activeLink,
  title,
  pageTitle
}: AdminLayoutProps): ReactElement => (
  <>
    <Head>
      <title>{pageTitle || "Panel de Administración"}</title>
    </Head>

    <div className="min-h-screen flex">
      <Sidebar activeLink={activeLink} />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="flex-1 p-4 md:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  </>
);
