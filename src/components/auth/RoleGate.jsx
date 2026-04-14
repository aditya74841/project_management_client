"use client";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { ShieldAlert } from "lucide-react";
import { Card } from "../ui-core";

/**
 * RoleGate Component (RBAC)
 * Standardized way to restrict UI access based on user roles.
 * 
 * @param {string[]} allowed - List of roles permitted to see the child content
 * @param {React.ReactNode} fallback - Optional UI to show when access is denied
 */
export const RoleGate = ({ allowed = [], children, fallback = null }) => {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 1. If not logged in, show nothing or fallback
  if (!isLoggedIn || !user) return fallback;

  // 2. Check if user role is in the allowed list
  const hasAccess = allowed.includes(user.role);

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
};

/**
 * Standard NoAccess Fallback UI
 */
export const NoAccess = ({ message = "You don't have permission to view this section." }) => (
  <Card className="p-12 text-center bg-slate-50/50 border-dashed border-2 flex flex-col items-center gap-4">
    <div className="p-3 rounded-full bg-slate-200 text-slate-400">
      <ShieldAlert className="w-8 h-8" />
    </div>
    <div className="space-y-1">
      <h3 className="text-lg font-bold text-slate-800">Access Restricted</h3>
      <p className="text-sm text-slate-500 max-w-xs">{message}</p>
    </div>
  </Card>
);
