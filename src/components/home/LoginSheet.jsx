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
  Sparkles,
  ArrowRight,
  User,
  AlertCircle,
  Github,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
    reset,
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

  const handleGoogleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/google`;
  };

  const handleGithubClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/github`;
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

      <SheetContent className="sm:max-w-lg w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-0 shadow-2xl overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full flex flex-col"
        >
          {/* Header Section */}
          <SheetHeader className="space-y-4 pt-6 pb-4 text-center">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 animate-pulse" />
                <div className="relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Welcome Back
                </SheetTitle>
                <p className="text-slate-500 text-base">
                  Sign in to your Audit Pro account
                </p>
              </div>
            </motion.div>
          </SheetHeader>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="px-2 space-y-3 mb-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 rounded-2xl font-medium group"
              onClick={handleGoogleClick}
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-slate-700 group-hover:text-slate-900">
                Continue with Google
              </span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 rounded-2xl font-medium group"
              onClick={handleGithubClick}
            >
              <Github className="w-5 h-5 mr-3 text-slate-700" />
              <span className="text-slate-700 group-hover:text-slate-900">
                Continue with GitHub
              </span>
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative px-2 mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">
                Or sign in with email
              </span>
            </div>
          </motion.div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 px-2 space-y-5"
          >
            {/* Email/Phone Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email or Phone Number
              </Label>
              <div className="relative group">
                <Input
                  {...register("emailOrPhone")}
                  placeholder="Enter your email or phone number"
                  className={`h-12 pl-5 pr-5 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${errors.emailOrPhone
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                    }`}
                  aria-invalid={!!errors.emailOrPhone}
                />
                {errors.emailOrPhone && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              {errors.emailOrPhone && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.emailOrPhone.message}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Password
              </Label>
              <div className="relative group">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`h-12 pl-5 pr-14 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                    }`}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </motion.p>
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onForgotPasswordClick) onForgotPasswordClick();
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting || isLoading}
                className="w-full h-13 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
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
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                      <User className="w-5 h-5" />
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Demo Account Buttons */}
            <motion.div variants={itemVariants} className="space-y-2 pt-1">
              <p className="text-xs text-center text-slate-400 font-medium uppercase tracking-wider">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 rounded-xl text-slate-500 hover:text-blue-600 text-sm font-medium"
                  onClick={handleDemoAutoFill}
                >
                  <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                  SuperAdmin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 rounded-xl text-slate-500 hover:text-blue-600 text-sm font-medium"
                  onClick={handleDemoAdminAutoFill}
                >
                  <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                  Admin
                </Button>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants} className="text-center pb-4">
              <p className="text-xs text-slate-400">
                Secure login powered by advanced encryption
              </p>
            </motion.div>
          </form>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
