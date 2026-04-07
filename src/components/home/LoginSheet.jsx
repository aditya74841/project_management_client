"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Shield,
  KeyRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { AuthSheetFrame } from "./AuthSheetFrame";

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

export default function LoginSheet({
  isOpen,
  onOpenChange,
  onLogin,
  onForgotPasswordClick,
  isLoading = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const watchedValues = watch();

  const handleDemoAutoFill = () => {
    setValue("emailOrPhone", "aditya@gmail.com");
    setValue("password", "aditya90060");
  };

  const handleDemoAdminAutoFill = () => {
    setValue("emailOrPhone", "email1@gmail.com");
    setValue("password", "changethepassword");
  };

  const onSubmit = async (data) => {
    try {
      await onLogin(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const isFormValid =
    watchedValues.emailOrPhone &&
    watchedValues.password &&
    Object.keys(errors).length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <span />
      </SheetTrigger>

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
            "Use your email or phone number, whichever is easier to reach for.",
          ]}
          footer={
            <p className="text-xs text-slate-500">
              Trouble signing in? Reset access in a few seconds from the password recovery flow.
            </p>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="grid gap-3">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDemoAutoFill}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-100"
                >
                  <KeyRound className="h-4 w-4" />
                  Fill Demo User
                </button>
                <button
                  type="button"
                  onClick={handleDemoAdminAutoFill}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Shield className="h-4 w-4" />
                  Fill Demo Admin
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Email or Phone
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  {...register("emailOrPhone")}
                  placeholder="name@company.com or phone number"
                  className={`h-13 rounded-2xl border bg-white pl-11 pr-4 text-[15px] shadow-sm transition focus-visible:ring-4 focus-visible:ring-sky-100 ${
                    errors.emailOrPhone
                      ? "border-red-300 focus-visible:ring-red-100"
                      : "border-slate-200 focus-visible:border-sky-400"
                  }`}
                  aria-invalid={!!errors.emailOrPhone}
                />
              </div>
              {errors.emailOrPhone ? (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.emailOrPhone.message}
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  We support either a valid email address or a 10-15 digit phone number.
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-slate-700">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onForgotPasswordClick) onForgotPasswordClick();
                  }}
                  className="text-xs font-semibold text-sky-700 transition hover:text-sky-900"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`h-13 rounded-2xl border bg-white pl-11 pr-12 text-[15px] shadow-sm transition focus-visible:ring-4 focus-visible:ring-sky-100 ${
                    errors.password
                      ? "border-red-300 focus-visible:ring-red-100"
                      : "border-slate-200 focus-visible:border-sky-400"
                  }`}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password.message}
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Keep it private. You can reveal the password briefly if you need to verify it.
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white p-2 shadow-sm">
                  <Shield className="h-4 w-4 text-sky-700" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Session note
                  </p>
                  <p className="text-xs leading-5 text-slate-600">
                    We’ll keep your session active so you can move between dashboard areas with less friction.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting || isLoading}
                className="h-13 w-full rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#155e75_55%,#06b6d4_100%)] text-base font-semibold text-white shadow-[0_18px_34px_rgba(8,47,73,0.24)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting || isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Signing you in...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="signin"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      Enter Workspace
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </AuthSheetFrame>
      </SheetContent>
    </Sheet>
  );
}
