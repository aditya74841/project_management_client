"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, LogIn, Eye, EyeOff, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const LoginModal = ({ open, onEmailLogin, onGoogleLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async () => {
    setError("");
    
    // Validation
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    
    try {
      await onEmailLogin({ emailOrPhone: email, password });
      // Clear form on success
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await onGoogleLogin();
    } catch (err) {
      setError(err?.message || "Google login failed");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Sign In</DialogTitle>
          <DialogDescription className="text-center mb-4">
            Sign in with your email & password or Google account
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-2">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleEmailLogin();
                }
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Email Login Button */}
          <Button
            onClick={handleEmailLogin}
            disabled={isLoading || !email || !password}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400 font-semibold text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <FcGoogle className="w-6 h-6" />
            Continue with Google
          </Button>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;




// "use client"

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Lock, LogIn, UserPlus, CheckCircle2, Eye, EyeOff, Mail, Globe } from "lucide-react";
// import { FcGoogle } from "react-icons/fc"; // FcGoogle is Google icon

// const LoginModal = ({ open, onEmailLogin, onGoogleLogin, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleEmailLogin = async () => {
//     setError("");
//     if (!email) {
//       setError("Email is required");
//       return;
//     }
//     if (!password) {
//       setError("Password is required");
//       return;
//     }
//     try {
//       await onEmailLogin({ email, password });
//     } catch (err) {
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//               <Lock className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>
//           <DialogTitle className="text-center text-2xl">Sign In</DialogTitle>
//           <DialogDescription className="text-center mb-4">
//             Sign in with your email & password or Google account
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col space-y-4 py-2">
//           {/* Email Input */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="email"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleEmailLogin();
//                 }
//               }}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <EyeOff /> : <Eye />}
//             </button>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <p className="text-sm text-red-600 text-center font-medium">{error}</p>
//           )}

//           {/* Email Login Button */}
//           <Button
//             onClick={handleEmailLogin}
//             className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
//             size="lg"
//           >
//             <LogIn className="w-5 h-5" />
//             Sign In
//           </Button>

//           {/* Divider */}
//           <div className="flex items-center my-2">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-4 text-gray-400 font-semibold">OR</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Google Login Button */}
//           <Button
//             onClick={onGoogleLogin}
//             variant="outline"
//             className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
//             size="lg"
//           >
//             <FcGoogle className="w-5 h-5 text-red-600" />
//             Continue with Google
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default LoginModal;
