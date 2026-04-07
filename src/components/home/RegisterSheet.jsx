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
  User,
  AlertCircle,
  UserPlus,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  userRegister,
  clearMessages,
  clearRegistrationSuccess,
} from "@/redux/slices/authSlice";
import { AuthSheetFrame } from "./AuthSheetFrame";

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

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

export default function RegisterSheet({ isOpen, onOpenChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, message, registrationSuccess } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (registrationSuccess) {
      reset();
      const timer = setTimeout(() => {
        onOpenChange(false);
        dispatch(clearRegistrationSuccess());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, reset, onOpenChange, dispatch]);

  useEffect(() => {
    if (error && typeof error === "string" && error.toLowerCase().includes("email")) {
      setError("email", {
        type: "server",
        message: error,
      });
    }
  }, [error, setError]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(clearMessages());
      reset();
    }
  }, [isOpen, dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(
        userRegister({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "USER",
          phoneNumber: null,
        })
      ).unwrap();
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const isFormValid =
    watchedValues.name &&
    watchedValues.email &&
    watchedValues.password &&
    watchedValues.confirmPassword &&
    Object.keys(errors).length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <span />
      </SheetTrigger>

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
            "Your account starts as a standard user so onboarding stays simple.",
          ]}
          footer={
            <p className="text-xs text-slate-500">
              By creating an account, you agree to the product terms and privacy policy.
            </p>
          }
        >
          <AnimatePresence>
            {registrationSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="mb-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white p-2 shadow-sm">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-emerald-900">
                      Account created successfully
                    </p>
                    <p className="text-sm leading-6 text-emerald-700">
                      {message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {error && !errors.email ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="mb-5 rounded-3xl border border-red-200 bg-red-50 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white p-2 shadow-sm">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="text-sm leading-6 text-red-700">{error}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Full name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  {...register("name")}
                  placeholder="Enter your full name"
                  disabled={loading || registrationSuccess}
                  className={`h-13 rounded-2xl border bg-white pl-11 pr-4 text-[15px] shadow-sm transition focus-visible:ring-4 focus-visible:ring-amber-100 ${
                    errors.name
                      ? "border-red-300 focus-visible:ring-red-100"
                      : "border-slate-200 focus-visible:border-amber-400"
                  }`}
                />
              </div>
              {errors.name ? (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name.message}
                </p>
              ) : null}
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Email address
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@company.com"
                  disabled={loading || registrationSuccess}
                  className={`h-13 rounded-2xl border bg-white pl-11 pr-4 text-[15px] shadow-sm transition focus-visible:ring-4 focus-visible:ring-amber-100 ${
                    errors.email
                      ? "border-red-300 focus-visible:ring-red-100"
                      : "border-slate-200 focus-visible:border-amber-400"
                  }`}
                />
              </div>
              {errors.email ? (
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  Use an address you can access easily for future account recovery.
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    disabled={loading || registrationSuccess}
                    className={`h-13 rounded-2xl border bg-white pl-11 pr-12 text-[15px] shadow-sm transition focus-visible:ring-4 focus-visible:ring-amber-100 ${
                      errors.password
                        ? "border-red-300 focus-visible:ring-red-100"
                        : "border-slate-200 focus-visible:border-amber-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    disabled={loading || registrationSuccess}
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
                ) : null}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">
                  Confirm password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    disabled={loading || registrationSuccess}
                    className={`h-13 rounded-2xl border bg-white pl-11 pr-12 text-[15px] shadow-sm transition focus-visible:ring-4 focus-visible:ring-amber-100 ${
                      errors.confirmPassword
                        ? "border-red-300 focus-visible:ring-red-100"
                        : "border-slate-200 focus-visible:border-amber-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-3 top-1/2 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    disabled={loading || registrationSuccess}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword ? (
                  <p className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.confirmPassword.message}
                  </p>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white p-2 shadow-sm">
                  <Sparkles className="h-4 w-4 text-amber-700" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Password rule
                  </p>
                  <p className="text-xs leading-5 text-slate-600">
                    Use at least 8 characters with uppercase, lowercase, and a number for a stronger first setup.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <Button
                type="submit"
                disabled={!isFormValid || loading || isSubmitting || registrationSuccess}
                className="h-13 w-full rounded-2xl bg-[linear-gradient(135deg,#292524_0%,#a16207_52%,#f59e0b_100%)] text-base font-semibold text-white shadow-[0_18px_34px_rgba(146,64,14,0.22)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {loading || isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Creating your account...
                    </motion.div>
                  ) : registrationSuccess ? (
                    <motion.div
                      key="success-button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5" />
                      Account Created
                    </motion.div>
                  ) : (
                    <motion.span
                      key="register"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <UserPlus className="h-5 w-5" />
                      Create Account
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
