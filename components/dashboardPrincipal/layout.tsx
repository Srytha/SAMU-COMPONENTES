import { ReactElement, ReactNode, useState } from "react";
import Head from "next/head";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AdminLayoutProps {
  children: ReactNode;
  activeLink: string;
  title: string;
  pageTitle?: string;
}

export const AdminLayout = ({
  children,
  activeLink,
  title,
  pageTitle,
}: AdminLayoutProps): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{pageTitle || "Panel de Administración"}</title>
      </Head>

      <div className="min-h-screen flex bg-white">
        <Sidebar activeLink={activeLink} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 flex flex-col">
          <Header title={title} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </>
  );
};
