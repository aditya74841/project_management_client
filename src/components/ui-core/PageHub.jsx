"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * PageHub Components
 * Standardized layout wrappers for all dashboard pages to ensure
 * consistency in spacing, typography, and animation.
 */

// 1. The Main Page Wrapper
export const PageContainer = ({ children, className }) => (
  <motion.main
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={cn(
      "p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 min-h-[calc(100vh-4rem)]",
      className
    )}
  >
    {children}
  </motion.main>
);

// 2. Standardized Page Header
export const PageHeader = ({ title, subtitle, actions, icon: Icon }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>

    {actions && (
      <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
        {actions}
      </div>
    )}
  </div>
);

// 3. Section Header (for sub-parts of a page)
export const SectionHeader = ({ title, subtitle, className }) => (
  <div className={cn("space-y-1 mb-6", className)}>
    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
    {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
  </div>
);
