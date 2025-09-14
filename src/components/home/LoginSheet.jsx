
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, User, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";

const buttonVariants = {
  hover: { 
    scale: 1.02, 
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

export default function LoginSheet({
  isOpen,
  onOpenChange,
  onLogin,
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

  const onSubmit = async (data) => {
    try {
      await onLogin(data);
      // reset();
      // onOpenChange(false);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const isFormValid = watchedValues.emailOrPhone && watchedValues.password && Object.keys(errors).length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          <span className="relative z-10 flex items-center gap-2">
            <User className="w-4 h-4" />
            Login
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
        </motion.button>
      </SheetTrigger>
      
      <SheetContent className="sm:max-w-lg w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-0 shadow-2xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full flex flex-col"
        >
          {/* Header Section */}
          <SheetHeader className="space-y-6 pt-8 pb-8 text-center">
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Welcome Back
                </SheetTitle>
                <p className="text-slate-500 text-lg">Sign in to your Audit Pro account</p>
              </div>
            </motion.div>
          </SheetHeader>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 px-2 space-y-8">
            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email or Phone Number
              </Label>
              <div className="relative group">
                <Input
                  {...register("emailOrPhone")}
                  placeholder="Enter your email or phone number"
                  className={`h-14 pl-6 pr-6 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
                    errors.emailOrPhone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                  aria-invalid={!!errors.emailOrPhone}
                  aria-describedby={errors.emailOrPhone ? "emailOrPhone-error" : undefined}
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
                  id="emailOrPhone-error"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.emailOrPhone.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Password
              </Label>
              <div className="relative group">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`h-14 pl-6 pr-16 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 focus:border-blue-500'
                  }`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  id="password-error"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 rounded-2xl text-slate-600 hover:text-blue-600 font-medium"
                onClick={handleDemoAutoFill}
              >
                <Sparkles className="w-5 h-5 mr-3 text-amber-500" />
                Try Demo Account
              </Button>
            </motion.div>

            {/* Submit Button */}
            <div className="pt-8 pb-6 px-2 space-y-6">
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting || isLoading}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  <AnimatePresence mode="wait">
                    {(isSubmitting || isLoading) ? (
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
                        Sign In to Audit Pro
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-slate-400">
                  Secure login powered by advanced encryption
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

// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Button } from "../ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, User } from "lucide-react";
// import { useState } from "react";

// const buttonVariants = {
//   hover: { 
//     scale: 1.02, 
//     boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
//     transition: { duration: 0.2 }
//   },
//   tap: { scale: 0.98 },
// };

// const containerVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.4, staggerChildren: 0.1 }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 15 },
//   visible: { opacity: 1, y: 0 }
// };

// export default function LoginSheet({
//   isOpen,
//   onOpenChange,
//   email,
//   setEmail,
//   password,
//   setPassword,
//   handleInputChange,
//   handleLogin,
// }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDemoAutoFill = () => {
//     setEmail("a@gmail.com");
//     setPassword("aditya90060");
//   };

//   const handleLoginClick = async (e) => {
//     setIsLoading(true);
//     await handleLogin(e);
//     setTimeout(() => setIsLoading(false), 500); // Ensure loading state shows briefly
//   };

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
//             <User className="w-4 h-4" />
//             Login
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </span>
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
//         </motion.button>
//       </SheetTrigger>
      
//       <SheetContent className="sm:max-w-lg w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-0 shadow-2xl">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="h-full flex flex-col"
//         >
//           {/* Header Section with more space */}
//           <SheetHeader className="space-y-6 pt-8 pb-8 text-center">
//             <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
//               <div className="relative">
//                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
//                 <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
//                   <Sparkles className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                   Welcome Back
//                 </SheetTitle>
//                 <p className="text-slate-500 text-lg">Sign in to your Audit Pro account</p>
//               </div>
//             </motion.div>
//           </SheetHeader>

//           {/* Form Content with improved spacing */}
//           <div className="flex-1 px-2 space-y-8">
//             <motion.div variants={itemVariants} className="space-y-3">
//               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
//                 <Mail className="w-4 h-4 text-blue-500" />
//                 Email or Phone Number
//               </Label>
//               <div className="relative group">
//                 <Input
//                   value={email}
//                   onChange={handleInputChange}
//                   placeholder="Enter your email or phone number"
//                   className="h-14 pl-6 pr-6 text-base border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md"
//                 />
//               </div>
//             </motion.div>

//             <motion.div variants={itemVariants} className="space-y-3">
//               <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
//                 <Lock className="w-4 h-4 text-blue-500" />
//                 Password
//               </Label>
//               <div className="relative group">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="h-14 pl-6 pr-16 text-base border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </motion.div>

//             <motion.div variants={itemVariants} className="pt-4">
//               <Button
//                 variant="outline"
//                 className="w-full h-12 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 rounded-2xl text-slate-600 hover:text-blue-600 font-medium"
//                 onClick={handleDemoAutoFill}
//               >
//                 <Sparkles className="w-5 h-5 mr-3 text-amber-500" />
//                 Try Demo Account
//               </Button>
//             </motion.div>
//           </div>

//           {/* Footer with better spacing */}
//           <div className="pt-8 pb-6 px-2 space-y-6">
//             <motion.div variants={itemVariants}>
//               <Button
//                 onClick={handleLoginClick}
//                 disabled={isLoading || (!email && !password)}
//                 className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
//               >
//                 <AnimatePresence mode="wait">
//                   {isLoading ? (
//                     <motion.div
//                       key="loading"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center gap-3"
//                     >
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Signing you in...
//                     </motion.div>
//                   ) : (
//                     <motion.span
//                       key="signin"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center gap-3"
//                     >
//                       <User className="w-5 h-5" />
//                       Sign In to Audit Pro
//                       <ArrowRight className="w-5 h-5" />
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </Button>
//             </motion.div>

//             <motion.div variants={itemVariants} className="text-center">
//               <p className="text-sm text-slate-400">
//                 Secure login powered by advanced encryption
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </SheetContent>
//     </Sheet>
//   );
// }
