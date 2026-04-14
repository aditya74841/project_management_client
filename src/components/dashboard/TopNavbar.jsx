"use client";

import { 
  Bell, 
  LogOut, 
  User as UserIcon, 
  Settings as SettingsIcon,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { SidebarTrigger } from "../ui/sidebar";

export default function TopNavbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useUiStore();

  const onLogout = async () => {
    await logout();
    router.push("/");
  };

  const ThemeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }[theme];

  return (
    <header className="w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 z-10 sticky top-0">
      {/* Left: App/Section Name */}
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg hover:bg-accent transition-all duration-300">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        </div>
        <div className="text-lg font-bold">
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="group relative h-10 w-10 flex items-center justify-center rounded-xl bg-accent/50 hover:bg-accent border border-border transition-all hover:scale-105 active:scale-95"
          title={`Appearance: ${theme}`}
        >
          <ThemeIcon className="h-[1.1rem] w-[1.1rem] text-primary transition-all group-hover:rotate-12" />
        </button>

        {/* Notification Bell */}
        <button className="relative group p-2.5 rounded-xl bg-accent/50 hover:bg-accent border border-border transition-all duration-300">
          <Bell className="w-4.5 h-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        {/* Profile Avatar with Dropdown */}
        <div className="relative group">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-105 border border-primary/20">
            <span className="text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </span>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-12 w-56 bg-popover rounded-2xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 p-2 overflow-hidden">
             {/* User Info Section */}
             <div className="px-3 py-3 border-b border-border/50 mb-1">
               <p className="text-sm font-bold text-foreground">{user?.name}</p>
               <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
             </div>

             {/* Menu Items */}
             <div className="space-y-0.5">
               <a
                 href="/dashboard/profile"
                 className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all"
               >
                 <UserIcon className="w-4 h-4" />
                 Profile
               </a>
               <a
                 href="/dashboard/settings"
                 className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all"
               >
                 <SettingsIcon className="w-4 h-4" />
                 Settings
               </a>
             </div>

             <div className="h-px bg-border/50 my-1 mx-2"></div>

             <button
               onClick={onLogout}
               className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-xl transition-all"
             >
               <LogOut className="w-4 h-4" />
               Logout
             </button>
          </div>
        </div>
      </div>
    </header>
  );
}
