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
  UserPlus,
  CheckCircle,
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
  userProfile,
} from "@/redux/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

// Registration validation schema
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

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function RegisterSheet({ isOpen, onOpenChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Handle successful registration
  useEffect(() => {
    if (registrationSuccess) {
      reset();
      // Close modal after 3 seconds and show success message
      const timer = setTimeout(() => {
        onOpenChange(false);
        dispatch(clearRegistrationSuccess());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, reset, onOpenChange, dispatch]);

  // Set server-side errors to form fields
  useEffect(() => {
    if (error && typeof error === "string") {
      // Handle specific error cases
      if (error.toLowerCase().includes("email")) {
        setError("email", {
          type: "server",
          message: error,
        });
      } else {
        // General error - you can show it in a toast/notification
        // console.error("Registration error:", error);
      }
    }
  }, [error, setError]);

  // Clear messages when component unmounts or modal closes
  useEffect(() => {
    if (!isOpen) {
      dispatch(clearMessages());
      reset();
    }
  }, [isOpen, dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      // Dispatch registration action
      await dispatch(
        userRegister({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "USER", // Default role
          phoneNumber: null,
        })
      ).unwrap();
      
      // Success is handled by useEffect watching registrationSuccess
    } catch (err) {
      // Error is handled by useEffect watching error state
      console.error("Registration failed:", err);
    }
  };
  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // Store tokens in Redux
      dispatch({
        type: "auth/socialLogin/fulfilled",
        payload: {
          data: {
            accessToken,
            refreshToken,
          },
          message: "Login successful",
        },
      });

      // Fetch user profile
      dispatch(userProfile());

      // Clean up URL
      router.replace("/dashboard"); // or wherever you want to redirect
    }
  }, [searchParams, dispatch, router]);

  const handleGoogleClick = () => {
    // Open Google OAuth in same window
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/google`;
  };

  const handleGithubClick = () => {
    // Open GitHub OAuth in same window
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/github`;
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
        {/* <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          <span className="relative z-10 flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Register
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
        </motion.button> */}
      </SheetTrigger>

      <SheetContent className="sm:max-w-lg w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-0 shadow-2xl overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full flex flex-col"
        >
          {/* Success Message */}
          <AnimatePresence>
            {registrationSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-green-800 font-semibold">
                      Registration Successful!
                    </p>
                    <p className="text-green-600 text-sm">{message}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && !errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header Section */}
          <SheetHeader className="space-y-6 pt-8 pb-6 text-center">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Create Account
                </SheetTitle>
                <p className="text-slate-500 text-base">
                  Join Audit Pro and start managing audits
                </p>
              </div>
            </motion.div>
          </SheetHeader>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="px-2 space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 rounded-2xl font-medium group"
              onClick={handleGoogleClick}
              disabled={loading || registrationSuccess}
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
              disabled={loading || registrationSuccess}
            >
              <Github className="w-5 h-5 mr-3 text-slate-700" />
              <span className="text-slate-700 group-hover:text-slate-900">
                Continue with GitHub
              </span>
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative px-2 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500 font-medium">
                Or register with email
              </span>
            </div>
          </motion.div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 px-2 space-y-6"
          >
            {/* Name Field */}
            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-500" />
                Full Name
              </Label>
              <div className="relative group">
                <Input
                  {...register("name")}
                  placeholder="Enter your full name"
                  disabled={loading || registrationSuccess}
                  className={`h-12 pl-6 pr-6 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                />
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address"
                  disabled={loading || registrationSuccess}
                  className={`h-12 pl-6 pr-6 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                />
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Password
              </Label>
              <div className="relative group">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  disabled={loading || registrationSuccess}
                  className={`h-12 pl-6 pr-16 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  disabled={loading || registrationSuccess}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-16 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Confirm Password
              </Label>
              <div className="relative group">
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  disabled={loading || registrationSuccess}
                  className={`h-12 pl-6 pr-16 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                  disabled={loading || registrationSuccess}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-16 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <div className="pt-6 pb-6 px-2 space-y-6">
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={
                    !isFormValid || loading || isSubmitting || registrationSuccess
                  }
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
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
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating your account...
                      </motion.div>
                    ) : registrationSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Account Created!
                      </motion.div>
                    ) : (
                      <motion.span
                        key="register"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <UserPlus className="w-5 h-5" />
                        Create Account
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-slate-400">
                  By registering, you agree to our Terms & Privacy Policy
                </p>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}






// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Button } from "../ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   Sparkles,
//   ArrowRight,
//   User,
//   AlertCircle,
//   Github,
//   UserPlus,
// } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { userRegister, clearMessages, clearRegistrationSuccess } from "@/store/slices/authSlice";


// // Registration validation schema
// const registerSchema = z
//   .object({
//     name: z
//       .string()
//       .min(2, "Name must be at least 2 characters")
//       .max(100, "Name must be less than 100 characters"),
//     email: z.string().email("Please enter a valid email address"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .max(32, "Password must be less than 32 characters")
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//         "Password must contain uppercase, lowercase, and number"
//       ),
//     confirmPassword: z.string().min(1, "Please confirm your password"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   });

// const buttonVariants = {
//   hover: {
//     scale: 1.02,
//     boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
//     transition: { duration: 0.2 },
//   },
//   tap: { scale: 0.98 },
// };

// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, staggerChildren: 0.1 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 15 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function RegisterSheet({
//   isOpen,
//   onOpenChange,
//   onRegister,
//   onGoogleLogin,
//   onGithubLogin,
//   isLoading = false,
// }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     watch,
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const watchedValues = watch();

//   const onRegister = async (data) => {
//     try {
//       await dispatch(userRegister(data)).unwrap();
//       // Success - show success message
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };


//   const onSubmit = async (data) => {
//     try {
//       await onRegister(data);
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   const handleGoogleClick = async () => {
//     try {
//       await onGoogleLogin();
//     } catch (error) {
//       console.error("Google login error:", error);
//     }
//   };

//   const handleGithubClick = async () => {
//     try {
//       await onGithubLogin();
//     } catch (error) {
//       console.error("GitHub login error:", error);
//     }
//   };

//   const isFormValid =
//     watchedValues.name &&
//     watchedValues.email &&
//     watchedValues.password &&
//     watchedValues.confirmPassword &&
//     Object.keys(errors).length === 0;

//   return (
//     <Sheet open={isOpen} onOpenChange={onOpenChange}>
//       <SheetTrigger asChild>
//         <motion.button
//           variants={buttonVariants}
//           whileHover="hover"
//           whileTap="tap"
//           className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
//         >
//           <span className="relative z-10 flex items-center gap-2">
//             <UserPlus className="w-4 h-4" />
//             Register
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </span>
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
//         </motion.button>
//       </SheetTrigger>

//       <SheetContent className="sm:max-w-lg w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-0 shadow-2xl overflow-y-auto">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="h-full flex flex-col"
//         >
//           {/* Header Section */}
//           <SheetHeader className="space-y-6 pt-8 pb-6 text-center">
//             <motion.div
//               variants={itemVariants}
//               className="flex flex-col items-center gap-4"
//             >
//               <div className="relative">
//                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
//                 <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
//                   <Sparkles className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                   Create Account
//                 </SheetTitle>
//                 <p className="text-slate-500 text-base">
//                   Join Audit Pro and start managing audits
//                 </p>
//               </div>
//             </motion.div>
//           </SheetHeader>

//           {/* Social Login Buttons */}
//           <motion.div variants={itemVariants} className="px-2 space-y-3 mb-6">
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 rounded-2xl font-medium group"
//               onClick={handleGoogleClick}
//               disabled={isLoading}
//             >
//               <svg
//                 className="w-5 h-5 mr-3"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 />
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 />
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 />
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 />
//               </svg>
//               <span className="text-slate-700 group-hover:text-slate-900">
//                 Continue with Google
//               </span>
//             </Button>

//             <Button
//               type="button"
//               variant="outline"
//               className="w-full h-12 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 rounded-2xl font-medium group"
//               onClick={handleGithubClick}
//               disabled={isLoading}
//             >
//               <Github className="w-5 h-5 mr-3 text-slate-700" />
//               <span className="text-slate-700 group-hover:text-slate-900">
//                 Continue with GitHub
//               </span>
//             </Button>
//           </motion.div>

//           {/* Divider */}
//           <motion.div
//             variants={itemVariants}
//             className="relative px-2 mb-6"
//           >
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-200"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-slate-500 font-medium">
//                 Or register with email
//               </span>
//             </div>
//           </motion.div>

//           {/* Form Content */}
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex-1 px-2 space-y-6"
//           >
//             {/* Name Field */}
//             <motion.div variants={itemVariants} className="space-y-3">
//               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
//                 <User className="w-4 h-4 text-blue-500" />
//                 Full Name
//               </Label>
//               <div className="relative group">
//                 <Input
//                   {...register("name")}
//                   placeholder="Enter your full name"
//                   className={`h-12 pl-6 pr-6 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
//                     errors.name
//                       ? "border-red-500 focus:border-red-500"
//                       : "border-slate-200 focus:border-blue-500"
//                   }`}
//                 />
//                 {errors.name && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     <AlertCircle className="w-5 h-5 text-red-500" />
//                   </motion.div>
//                 )}
//               </div>
//               {errors.name && (
//                 <motion.p
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-red-500 text-sm flex items-center gap-2 mt-2"
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.name.message}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Email Field */}
//             <motion.div variants={itemVariants} className="space-y-3">
//               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
//                 <Mail className="w-4 h-4 text-blue-500" />
//                 Email Address
//               </Label>
//               <div className="relative group">
//                 <Input
//                   {...register("email")}
//                   type="email"
//                   placeholder="Enter your email address"
//                   className={`h-12 pl-6 pr-6 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
//                     errors.email
//                       ? "border-red-500 focus:border-red-500"
//                       : "border-slate-200 focus:border-blue-500"
//                   }`}
//                 />
//                 {errors.email && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     <AlertCircle className="w-5 h-5 text-red-500" />
//                   </motion.div>
//                 )}
//               </div>
//               {errors.email && (
//                 <motion.p
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-red-500 text-sm flex items-center gap-2 mt-2"
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.email.message}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Password Field */}
//             <motion.div variants={itemVariants} className="space-y-3">
//               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
//                 <Lock className="w-4 h-4 text-blue-500" />
//                 Password
//               </Label>
//               <div className="relative group">
//                 <Input
//                   {...register("password")}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a strong password"
//                   className={`h-12 pl-6 pr-16 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
//                     errors.password
//                       ? "border-red-500 focus:border-red-500"
//                       : "border-slate-200 focus:border-blue-500"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//                 {errors.password && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute right-16 top-1/2 -translate-y-1/2"
//                   >
//                     <AlertCircle className="w-5 h-5 text-red-500" />
//                   </motion.div>
//                 )}
//               </div>
//               {errors.password && (
//                 <motion.p
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-red-500 text-sm flex items-center gap-2 mt-2"
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.password.message}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Confirm Password Field */}
//             <motion.div variants={itemVariants} className="space-y-3">
//               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
//                 <Lock className="w-4 h-4 text-blue-500" />
//                 Confirm Password
//               </Label>
//               <div className="relative group">
//                 <Input
//                   {...register("confirmPassword")}
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Re-enter your password"
//                   className={`h-12 pl-6 pr-16 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
//                     errors.confirmPassword
//                       ? "border-red-500 focus:border-red-500"
//                       : "border-slate-200 focus:border-blue-500"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//                 {errors.confirmPassword && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute right-16 top-1/2 -translate-y-1/2"
//                   >
//                     <AlertCircle className="w-5 h-5 text-red-500" />
//                   </motion.div>
//                 )}
//               </div>
//               {errors.confirmPassword && (
//                 <motion.p
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-red-500 text-sm flex items-center gap-2 mt-2"
//                 >
//                   <AlertCircle className="w-4 h-4" />
//                   {errors.confirmPassword.message}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Submit Button */}
//             <div className="pt-6 pb-6 px-2 space-y-6">
//               <motion.div variants={itemVariants}>
//                 <Button
//                   type="submit"
//                   disabled={!isFormValid || isSubmitting || isLoading}
//                   className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
//                 >
//                   <AnimatePresence mode="wait">
//                     {isSubmitting || isLoading ? (
//                       <motion.div
//                         key="loading"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="flex items-center gap-3"
//                       >
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Creating your account...
//                       </motion.div>
//                     ) : (
//                       <motion.span
//                         key="register"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="flex items-center gap-3"
//                       >
//                         <UserPlus className="w-5 h-5" />
//                         Create Account
//                         <ArrowRight className="w-5 h-5" />
//                       </motion.span>
//                     )}
//                   </AnimatePresence>
//                 </Button>
//               </motion.div>

//               <motion.div variants={itemVariants} className="text-center">
//                 <p className="text-sm text-slate-400">
//                   By registering, you agree to our Terms & Privacy Policy
//                 </p>
//               </motion.div>
//             </div>
//           </form>
//         </motion.div>
//       </SheetContent>
//     </Sheet>
//   );
// }






// // "use client";

// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import { Input } from "../ui/input";
// // import { Label } from "../ui/label";
// // import { Button } from "../ui/button";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   Eye,
// //   EyeOff,
// //   Mail,
// //   Lock,
// //   Sparkles,
// //   ArrowRight,
// //   User,
// //   AlertCircle,
// // } from "lucide-react";
// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { loginSchema } from "@/lib/validations/auth";

// // const buttonVariants = {
// //   hover: {
// //     scale: 1.02,
// //     boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
// //     transition: { duration: 0.2 },
// //   },
// //   tap: { scale: 0.98 },
// // };

// // const containerVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: { duration: 0.4, staggerChildren: 0.1 },
// //   },
// // };

// // const itemVariants = {
// //   hidden: { opacity: 0, y: 15 },
// //   visible: { opacity: 1, y: 0 },
// // };

// // export default function RegisterSheet({
// //   isOpen,
// //   onOpenChange,
// //   onLogin,
// //   isLoading = false,
// // }) {
// //   const [showPassword, setShowPassword] = useState(false);

// //   // console.log("Tge is Loading is ", isLoading);
// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     watch,
// //     formState: { errors, isSubmitting },
// //     reset,
// //   } = useForm({
// //     resolver: zodResolver(loginSchema),
// //     defaultValues: {
// //       emailOrPhone: "",
// //       password: "",
// //     },
// //   });

// //   const watchedValues = watch();

// //   const handleDemoAutoFill = () => {
// //     setValue("emailOrPhone", "aditya@gmail.com");
// //     setValue("password", "aditya90060");
// //   };

// //   const handleDemoAdminAutoFill = () => {
// //     setValue("emailOrPhone", "email1@gmail.com");
// //     setValue("password", "changethepassword");
// //   };

// //   const onSubmit = async (data) => {
// //     try {
// //       await onLogin(data);
// //       // reset();
// //       // onOpenChange(false);
// //     } catch (error) {
// //       console.error("Login error:", error);
// //     }
// //   };

// //   const isFormValid =
// //     watchedValues.emailOrPhone &&
// //     watchedValues.password &&
// //     Object.keys(errors).length === 0;

// //   return (
// //     <Sheet open={isOpen} onOpenChange={onOpenChange}>
// //       <SheetTrigger asChild>
// //         <motion.button
// //           variants={buttonVariants}
// //           whileHover="hover"
// //           whileTap="tap"
// //           className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
// //         >
// //           <span className="relative z-10 flex items-center gap-2">
// //             <User className="w-4 h-4" />
// //             Register
// //             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //           </span>
// //           <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
// //         </motion.button>
// //       </SheetTrigger>

// //       <SheetContent className="sm:max-w-lg w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-0 shadow-2xl">
// //         <motion.div
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //           className="h-full flex flex-col"
// //         >
// //           {/* Header Section */}
// //           <SheetHeader className="space-y-6 pt-8 pb-8 text-center">
// //             <motion.div
// //               variants={itemVariants}
// //               className="flex flex-col items-center gap-4"
// //             >
// //               <div className="relative">
// //                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
// //                 <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
// //                   <Sparkles className="w-8 h-8 text-white" />
// //                 </div>
// //               </div>
// //               <div className="space-y-2">
// //                 <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
// //                   Welcome Back
// //                 </SheetTitle>
// //                 <p className="text-slate-500 text-lg">
// //                   Sign in to your Audit Pro account
// //                 </p>
// //               </div>
// //             </motion.div>
// //           </SheetHeader>

// //           {/* Form Content */}
// //           <form
// //             onSubmit={handleSubmit(onSubmit)}
// //             className="flex-1 px-2 space-y-8"
// //           >
// //             <motion.div variants={itemVariants} className="space-y-3">
// //               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
// //                 <Mail className="w-4 h-4 text-blue-500" />
// //                 Email or Phone Number
// //               </Label>
// //               <div className="relative group">
// //                 <Input
// //                   {...register("emailOrPhone")}
// //                   placeholder="Enter your email or phone number"
// //                   className={`h-14 pl-6 pr-6 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
// //                     errors.emailOrPhone
// //                       ? "border-red-500 focus:border-red-500"
// //                       : "border-slate-200 focus:border-blue-500"
// //                   }`}
// //                   aria-invalid={!!errors.emailOrPhone}
// //                   aria-describedby={
// //                     errors.emailOrPhone ? "emailOrPhone-error" : undefined
// //                   }
// //                 />
// //                 {errors.emailOrPhone && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2"
// //                   >
// //                     <AlertCircle className="w-5 h-5 text-red-500" />
// //                   </motion.div>
// //                 )}
// //               </div>
// //               {errors.emailOrPhone && (
// //                 <motion.p
// //                   id="emailOrPhone-error"
// //                   initial={{ opacity: 0, x: -10 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   className="text-red-500 text-sm flex items-center gap-2 mt-2"
// //                 >
// //                   <AlertCircle className="w-4 h-4" />
// //                   {errors.emailOrPhone.message}
// //                 </motion.p>
// //               )}
// //             </motion.div>

// //             <motion.div variants={itemVariants} className="space-y-3">
// //               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
// //                 <Lock className="w-4 h-4 text-blue-500" />
// //                 Password
// //               </Label>
// //               <div className="relative group">
// //                 <Input
// //                   {...register("password")}
// //                   type={showPassword ? "text" : "password"}
// //                   placeholder="Enter your password"
// //                   className={`h-14 pl-6 pr-16 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
// //                     errors.password
// //                       ? "border-red-500 focus:border-red-500"
// //                       : "border-slate-200 focus:border-blue-500"
// //                   }`}
// //                   aria-invalid={!!errors.password}
// //                   aria-describedby={
// //                     errors.password ? "password-error" : undefined
// //                   }
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className="w-5 h-5" />
// //                   ) : (
// //                     <Eye className="w-5 h-5" />
// //                   )}
// //                 </button>
// //                 {errors.password && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="absolute right-16 top-1/2 -translate-y-1/2"
// //                   >
// //                     <AlertCircle className="w-5 h-5 text-red-500" />
// //                   </motion.div>
// //                 )}
// //               </div>
// //               {errors.password && (
// //                 <motion.p
// //                   id="password-error"
// //                   initial={{ opacity: 0, x: -10 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   className="text-red-500 text-sm flex items-center gap-2 mt-2"
// //                 >
// //                   <AlertCircle className="w-4 h-4" />
// //                   {errors.password.message}
// //                 </motion.p>
// //               )}
// //             </motion.div>

// //             <motion.div variants={itemVariants} className="pt-4">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 className="w-full h-12 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 rounded-2xl text-slate-600 hover:text-blue-600 font-medium"
// //                 onClick={handleDemoAutoFill}
// //               >
// //                 <Sparkles className="w-5 h-5 mr-3 text-amber-500" />
// //                 Try Demo Account SUperADMIN
// //               </Button>
// //             </motion.div>
// //             <motion.div variants={itemVariants} className="pt-4">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 className="w-full h-12 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 rounded-2xl text-slate-600 hover:text-blue-600 font-medium"
// //                 onClick={handleDemoAdminAutoFill}
// //               >
// //                 <Sparkles className="w-5 h-5 mr-3 text-amber-500" />
// //                 Try Demo Account ADMIN
// //               </Button>
// //             </motion.div>


// //             {/* Submit Button */}
// //             <div className="pt-8 pb-6 px-2 space-y-6">
// //               <motion.div variants={itemVariants}>
// //                 <Button
// //                   type="submit"
// //                   disabled={!isFormValid || isSubmitting || isLoading}
// //                   className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
// //                 >
// //                   <AnimatePresence mode="wait">
// //                     {isSubmitting || isLoading ? (
// //                       <motion.div
// //                         key="loading"
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         exit={{ opacity: 0 }}
// //                         className="flex items-center gap-3"
// //                       >
// //                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //                         Signing you in...
// //                       </motion.div>
// //                     ) : (
// //                       <motion.span
// //                         key="signin"
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         exit={{ opacity: 0 }}
// //                         className="flex items-center gap-3"
// //                       >
// //                         <User className="w-5 h-5" />
// //                         Sign In to Audit Pro
// //                         <ArrowRight className="w-5 h-5" />
// //                       </motion.span>
// //                     )}
// //                   </AnimatePresence>
// //                 </Button>
// //               </motion.div>

// //               <motion.div variants={itemVariants} className="text-center">
// //                 <p className="text-sm text-slate-400">
// //                   Secure login powered by advanced encryption
// //                 </p>
// //               </motion.div>
// //             </div>
// //           </form>
// //         </motion.div>
// //       </SheetContent>
// //     </Sheet>
// //   );
// // }