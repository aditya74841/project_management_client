import { AppSidebar } from "../../components/dashboard/app-sidebar";
import TopNavbar from "../../components/dashboard/TopNavbar";
import { SidebarProvider } from "../../components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Right side (TopNavbar + main content) */}
        <div className="flex flex-col flex-1 min-w-0 bg-gray-50">
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
