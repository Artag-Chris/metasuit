import Navbar from "@/components/navbar/Navbar";
import React, { Suspense } from "react";
const Sidebar = React.lazy(() => import("@/components/sidebar/Sidebar"));

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar children={children} />
      </Suspense>
    </>
  );
}
