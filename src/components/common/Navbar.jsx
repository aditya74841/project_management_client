"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { showMessage } from "@/utils/showMessage";

import LoginSheet from "../home/LoginSheet";
import RegisterSheet from "../home/RegisterSheet";
import ForgotPasswordSheet from "../home/ForgotPasswordSheet";
import { Button } from "../ui-core";
import { LogIn, UserPlus, LayoutDashboard, Menu, X, Rocket, Sun, Moon, Monitor } from "lucide-react";

/**
 * Modern Senior Navbar
 * Standardized for Zustand state management and Zen Prism aesthetic.
 * All sheet management is now handled through the global useUiStore.
 */
export default function Navbar() {
  const router = useRouter();
  
  // ─── Global State ───
  const { isLoggedIn, user, fetchProfile, message, error, clearMessages } = useAuthStore();
  const ui = useUiStore();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 0. Hydration Lock
  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Init: Fetch Profile
  useEffect(() => {
    if (isLoggedIn && !user) {
      fetchProfile();
    }
  }, [isLoggedIn, user, fetchProfile]);

  // 2. Observer: Handle Feedback
  useEffect(() => {
    if (message) {
      showMessage(message, "success");
      clearMessages();
    }
    if (error) {
      showMessage(error, "error");
      clearMessages();
    }
  }, [message, error, clearMessages]);

  // 3. UI: Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2.5 rounded-2xl bg-primary shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
            <Rocket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            ZenPrism
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {["Features", "Pricing", "FAQ", "Docs"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={ui.toggleTheme}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-all shadow-sm border border-slate-200/50 dark:border-slate-700/50 group"
            aria-label="Toggle Theme"
          >
            {ui.theme === "light" && <Sun className="w-4 h-4" />}
            {ui.theme === "dark" && <Moon className="w-4 h-4" />}
            {ui.theme === "system" && <Monitor className="w-4 h-4" />}
            <span className="text-[10px] font-bold uppercase tracking-wider hidden group-hover:inline-block transition-all">
              {ui.theme}
            </span>
          </button>
        </div>

        {/* Auth Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {(!mounted || !isLoggedIn || !user) ? (
            <>
              <Button 
                variant="ghost" 
                size="md" 
                className="gap-2"
                onClick={ui.openLogin}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                className="gap-2"
                onClick={ui.openRegister}
              >
                <UserPlus className="w-4 h-4" />
                Get Started
              </Button>
            </>
          ) : (
            <Button 
              variant="primary" 
              size="md" 
              className="gap-2"
              onClick={() => router.push("/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Button>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={ui.toggleTheme}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
          >
            {ui.theme === "light" && <Sun className="w-5 h-5" />}
            {ui.theme === "dark" && <Moon className="w-5 h-5" />}
            {ui.theme === "system" && <Monitor className="w-5 h-5" />}
          </button>
          <button 
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
            onClick={ui.toggleMobileMenu}
          >
            {ui.mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Global Auth Sheets */}
      <LoginSheet
        isOpen={ui.loginSheetOpen}
        onOpenChange={ui.setLoginSheetOpen}
      />
      
      <RegisterSheet
        isOpen={ui.registerSheetOpen}
        onOpenChange={ui.setRegisterSheetOpen}
      />
      
      <ForgotPasswordSheet
        isOpen={ui.forgotPasswordSheetOpen}
        onOpenChange={ui.setForgotPasswordSheetOpen}
      />
    </nav>
  );
}
