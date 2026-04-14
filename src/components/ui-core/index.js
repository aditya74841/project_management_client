"use client";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming a standard utility for class merging

/**
 * Senior UI Core
 * Standardized, accessible, and variable-driven components 
 * to ensure UI consistency across the entire application.
 */

// 1. Premium Card
export const Card = ({ children, className }) => (
  <div className={cn(
    "bg-card text-card-foreground rounded-2xl border border-border shadow-sm backdrop-blur-sm transition-all duration-300",
    className
  )}>
    {children}
  </div>
);

// 2. Variable-Driven Button
export const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading = false, 
  className, 
  ...props 
}) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {children}
    </button>
  );
};

// 3. Simple Input
export const Input = ({ label, error, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">{label}</label>}
    <input
      className={cn(
        "w-full px-4 py-2.5 bg-background text-foreground border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50",
        error && "border-destructive focus:ring-destructive/20 focus:border-destructive",
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-destructive font-medium ml-1">{error}</p>}
  </div>
);

// 4. Standardized Textarea
export const Textarea = ({ label, error, className, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">{label}</label>}
    <textarea
      className={cn(
        "w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 resize-none min-h-[120px]",
        error && "border-destructive focus:ring-destructive/20 focus:border-destructive",
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-destructive font-medium ml-1">{error}</p>}
  </div>
);

// 5. Page Layout Core (Consolidated)
export * from "./PageHub";
