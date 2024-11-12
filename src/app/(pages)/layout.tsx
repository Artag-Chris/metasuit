
import Navbar from "@/components/navbar/Navbar";
import React, { Suspense } from "react";
import dynamic from 'next/dynamic';


// Componente cliente para el Sidebar
const ClientSidebar = dynamic(() => import("@/components/sidebar/ClientSidebar"), {

  loading: () => <div></div>
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>aqui</div>}>
      <ClientSidebar>{children}</ClientSidebar>
      </Suspense>
    </>
  );
}