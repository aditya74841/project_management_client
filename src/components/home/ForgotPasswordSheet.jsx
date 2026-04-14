"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Mail,
  Sparkles,
  ArrowRight,
  CheckCircle,
  KeyRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { Button, Input } from "../ui-core";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordSheet({ isOpen, onOpenChange }) {
  const [isSuccess, setIsSuccess] = useState(false);
  
  // ─── Global State ───
  const { forgotPassword, isLoading, message, clearMessages } = useAuthStore();
  const ui = useUiStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
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
    const success = await forgotPassword(data.email);
    if (success) {
      setIsSuccess(true);
      // Auto-switch back to login after showing success for a bit
      setTimeout(() => {
        ui.openLogin();
      }, 3500);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl w-full bg-white dark:bg-slate-950 border-0 dark:border-l dark:border-slate-800 shadow-2xl overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>Reset Password</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col pt-8 space-y-8">
          {/* Visual Header */}
          <div
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="relative p-4 bg-primary/10 rounded-2xl text-primary">
              <KeyRound className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Recover Access</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto font-medium">
                Enter your identity email to receive a secure recovery link.
              </p>
            </div>
          </div>

          {isSuccess && (
            <div
              className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 flex items-start gap-4"
            >
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-emerald-600 dark:text-emerald-400 shadow-sm">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100">Link Sent</p>
                 <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  {message || "If an account exists for this email, you will receive a reset link shortly."}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-2">
            <div>
              <Input
                label="Registered Email"
                {...register("email")}
                placeholder="you@company.com"
                icon={<Mail className="w-4 h-4 text-slate-400" />}
                error={errors.email?.message}
                className="pl-11"
                disabled={isLoading || isSuccess}
              />
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full h-14 text-base"
                isLoading={isSubmitting || isLoading}
                disabled={isSuccess}
              >
                Send Recovery Link
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <button
                type="button"
                onClick={ui.openLogin}
                className="w-full text-center text-sm font-bold text-slate-500 hover:text-primary transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </form>

          <div className="pt-8 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200/50 dark:border-slate-800">
                <Sparkles className="w-3 h-3" />
                Standard Secure Protocol
             </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
