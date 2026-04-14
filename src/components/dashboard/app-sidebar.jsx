"use client";
import * as React from "react";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Store,
  Users,
  Settings,
  Home,
  ChevronRight,
  FolderOpen,
  UserCircle,
  Database,
  Layers
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuthStore } from "@/store/authStore";

const navGroups = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ADMIN", "USER", "SUPERADMIN"],
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        title: "Projects & Features",
        icon: Layers,
        roles: ["USER", "ADMIN", "SUPERADMIN"],
        isSub: true,
        children: [
          { title: "All Projects", url: "/dashboard/projects" },
          { title: "Feature Boards", url: "/dashboard/features" },
          { title: "Project Diary", url: "/dashboard/project-diary" },
        ],
      },
    ],
  },
  {
    label: "Administration",
    items: [
       {
        title: "Management",
        icon: Database,
        roles: ["ADMIN", "SUPERADMIN"],
        isSub: true,
        children: [
          { title: "Company Profile", url: "/dashboard/company" },
          { title: "Team / Users", url: "/dashboard/users" },
        ],
      },
    ],
  },
];

const NavItem = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!item.isSub) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-accent rounded-xl text-foreground font-medium py-5">
          <a href={item.url}>
            {item.icon && <item.icon className="w-4.5 h-4.5" />}
            <span className="text-sm tracking-tight">{item.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton 
            onClick={() => setIsOpen(!isOpen)}
            tooltip={item.title} 
            className="hover:bg-accent rounded-xl text-foreground font-medium py-5"
          >
            {item.icon && <item.icon className="w-4.5 h-4.5" />}
            <span className="text-sm">{item.title}</span>
            <ChevronRight className={`ml-auto h-4 w-4 transition-transform duration-200 text-muted-foreground ${isOpen ? 'rotate-90' : ''}`} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent open={isOpen}>
          <SidebarMenuSub className="border-l border-primary/10 ml-6 py-1 space-y-0.5 mt-0.5">
            {item.children.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild className="hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground">
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  const { user } = useAuthStore();

  const filterByRole = (items) => {
    return items.filter(item => item.roles.includes(user?.role));
  };

  return (
    <Sidebar className="border-r border-border bg-sidebar shadow-xl">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2 py-3 rounded-2xl bg-primary/5 border border-primary/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
             <Layers className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-foreground uppercase">Zen Prism</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
               {user?.role?.toLowerCase() || "guest"} node
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2 space-y-4">
        {navGroups.map((group) => {
          const filteredItems = filterByRole(group.items);
          if (filteredItems.length === 0) return null;

          return (
            <SidebarGroup key={group.label} className="p-0">
              <SidebarGroupLabel className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredItems.map((item) => (
                    <NavItem key={item.title} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-2 py-0.5">
           <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center border border-border">
              <UserCircle className="w-4 h-4 text-muted-foreground" />
           </div>
           <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{user?.name}</p>
              <p className="text-[10px] text-muted-foreground font-medium tracking-tight">Active Session</p>
           </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
