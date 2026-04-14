"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  KeyRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { AuthSheetFrame } from "./AuthSheetFrame";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { Button, Input } from "../ui-core";
import { useRouter } from "next/navigation";

export default function LoginSheet({ isOpen, onOpenChange }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // ─── Global State ───
  const { login, isLoading: authLoading } = useAuthStore();
  const ui = useUiStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  // Demo Helpers
  const handleDemoAutoFill = (type) => {
    if (type === "user") {
      setValue("emailOrPhone", "aditya@gmail.com");
      setValue("password", "Aditya90060@");
    } else {
      setValue("emailOrPhone", "email1@gmail.com");
      setValue("password", "changethepassword");
    }
  };

  const onSubmit = async (data) => {
    const success = await login({
      email: data.emailOrPhone,
      password: data.password
    });

    if (success) {
      ui.closeAllAuthSheets();
      router.push("/dashboard");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-0 p-0 shadow-2xl sm:max-w-5xl">
        <SheetHeader className="sr-only">
          <SheetTitle>Sign In</SheetTitle>
        </SheetHeader>

        <AuthSheetFrame
          eyebrow="Sign In"
          title="Step back into your workspace."
          description="Use your account credentials to open projects, feature boards, and team activity in one focused place."
          badgeIcon={Shield}
          sideTone="signin"
          highlights={[
            "Protected sessions with refresh-token support already wired into the app.",
            "Jump back into active projects without hunting through separate tools.",
            "Standardized Zen Prism security layers.",
          ]}
          footer={
            <p className="text-xs text-slate-500">
              Trouble signing in? Reset access in a few seconds from the password recovery flow.
            </p>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleDemoAutoFill("user")}
                className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-800 dark:text-sky-300 transition hover:bg-sky-100 dark:hover:bg-sky-500/20"
              >
                <KeyRound className="h-4 w-4" />
                Fill Demo User
              </button>
              <button
                type="button"
                onClick={() => handleDemoAutoFill("admin")}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Shield className="h-4 w-4" />
                Fill Demo Admin
              </button>
            </div>

            <div>
              <Input
                label="Email or Phone"
                {...register("emailOrPhone")}
                placeholder="name@company.com"
                error={errors.emailOrPhone?.message}
                className="pl-11"
                icon={<Mail className="w-4 h-4 text-slate-400" />}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Password</label>
                <button
                  type="button"
                  onClick={ui.openForgotPassword}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  className="pl-11 pr-12"
                  icon={<Lock className="w-4 h-4 text-slate-400" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[10px] p-2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 text-base"
                isLoading={isSubmitting || authLoading}
              >
                Enter Workspace
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </AuthSheetFrame>
      </SheetContent>
    </Sheet>
  );
}
