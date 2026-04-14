"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  UserPlus,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthSheetFrame } from "./AuthSheetFrame";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { Button, Input } from "../ui-core";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function RegisterSheet({ isOpen, onOpenChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // ─── Global State ───
  const { register: registerAction, isLoading, message, clearMessages } = useAuthStore();
  const ui = useUiStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle Sheet Close
  useEffect(() => {
    if (!isOpen) {
      clearMessages();
      setIsSuccess(false);
      reset();
    }
  }, [isOpen, clearMessages, reset]);

  const onSubmit = async (data) => {
    const success = await registerAction({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        ui.closeAllAuthSheets();
        ui.openLogin();
      }, 2500);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-0 p-0 shadow-2xl sm:max-w-5xl">
        <SheetHeader className="sr-only">
          <SheetTitle>Create Account</SheetTitle>
        </SheetHeader>

        <AuthSheetFrame
          eyebrow="Create Account"
          title="Open a clean workspace for your next project cycle."
          description="Set up your account once, then move into features, projects, and collaboration with a calmer first-run experience."
          badgeIcon={Sparkles}
          sideTone="signup"
          highlights={[
            "Built for solo builders and teams who want project tracking in one place.",
            "Strong password guidance is built in before the account is created.",
            "Standardized Zen Prism foundational security.",
          ]}
          footer={
            <p className="text-xs text-slate-500">
              By creating an account, you agree to the product terms and privacy policy.
            </p>
          }
        >
          {isSuccess && (
            <div
              className="mb-6 rounded-3xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-6 flex items-start gap-4"
            >
              <div className="p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100">Registration Successful</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  {message || "Your account has been created. We're redirecting you to sign in..."}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                label="Full Name"
                {...register("name")}
                placeholder="John Doe"
                icon={<User className="w-4 h-4 text-slate-400" />}
                error={errors.name?.message}
                className="pl-11"
                disabled={isLoading || isSuccess}
              />
            </div>

            <div>
              <Input
                label="Email Address"
                {...register("email")}
                placeholder="john@example.com"
                icon={<Mail className="w-4 h-4 text-slate-400" />}
                error={errors.email?.message}
                className="pl-11"
                disabled={isLoading || isSuccess}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-slate-400" />}
                error={errors.password?.message}
                className="pl-11"
                disabled={isLoading || isSuccess}
              />
              <Input
                label="Confirm Password"
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4 text-slate-400" />}
                error={errors.confirmPassword?.message}
                className="pl-11"
                disabled={isLoading || isSuccess}
              />
            </div>

            <div 
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
            >
               <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-primary">
                  <Sparkles className="w-4 h-4" />
               </div>
               <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Pro Tip</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Use a strong password with symbols and numbers to ensure your project data stays protected within the Zen Prism network.
                  </p>
               </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 text-base"
                isLoading={isSubmitting || isLoading}
                disabled={isSuccess}
              >
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </AuthSheetFrame>
      </SheetContent>
    </Sheet>
  );
}
