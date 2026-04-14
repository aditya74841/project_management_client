"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AppSidebar } from "../../components/dashboard/app-sidebar";
import TopNavbar from "../../components/dashboard/TopNavbar";
import { SidebarProvider } from "../../components/ui/sidebar";

function DashboardLayoutContent({ children }) {
  const searchParams = useSearchParams();
  const minimal = searchParams.get("minimal") === "true";

  if (minimal) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
        {/* Sidebar */}
        <AppSidebar />

        {/* Right side (TopNavbar + main content) */}
        <div className="flex flex-col flex-1 min-w-0 bg-background/50">
          {/* Top Navbar */}
          <TopNavbar />

          {/* Main Content */}
          <main className="flex-1 overflow-auto px-6 py-4">
            {/* <SidebarTrigger /> */}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function Layout({ children }) {
  return (
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Loading...</div>}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
