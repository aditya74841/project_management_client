"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearMessages } from "@/redux/slices/authSlice";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    KeyRound,
    ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const resetPasswordSchema = z
    .object({
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

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
};

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const token = params?.token;

    const { loading, error, message } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const watchedValues = watch();

    // Clean up messages on mount
    useEffect(() => {
        dispatch(clearMessages());
        return () => dispatch(clearMessages());
    }, [dispatch]);

    // Redirect on success
    useEffect(() => {
        if (message && message.includes("successfully")) {
            setIsSuccess(true);
            const timer = setTimeout(() => {
                router.push("/");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, router]);

    const onSubmit = async (data) => {
        if (!token) return;
        try {
            await dispatch(
                resetPassword({ token, newPassword: data.password })
            ).unwrap();
        } catch (err) {
            console.error("Reset password failed:", err);
        }
    };

    const isFormValid =
        watchedValues.password &&
        watchedValues.confirmPassword &&
        Object.keys(errors).length === 0;

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-slate-800">Invalid Link</h2>
                    <p className="text-slate-500">
                        This password reset link is invalid or missing the security token.
                    </p>
                    <Button onClick={() => router.push("/")} className="mt-4">
                        Return to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 p-8"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                        <KeyRound className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Set New Password
                    </h1>
                    <p className="text-slate-500">
                        Please enter your new password below.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                Password Reset!
                            </h2>
                            <p className="text-slate-500 mb-6">
                                Your password has been successfully updated. Redirecting you to
                                login...
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3 text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* Password Field */}
                                <motion.div variants={itemVariants} className="space-y-2">
                                    <Label className="text-sm font-medium text-slate-700">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <Input
                                            {...register("password")}
                                            type={showPassword ? "text" : "password"}
                                            className={`pl-10 pr-10 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${errors.password ? "border-red-500" : ""
                                                }`}
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Confirm Password Field */}
                                <motion.div variants={itemVariants} className="space-y-2">
                                    <Label className="text-sm font-medium text-slate-700">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <Input
                                            {...register("confirmPassword")}
                                            type={showConfirmPassword ? "text" : "password"}
                                            className={`pl-10 pr-10 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${errors.confirmPassword ? "border-red-500" : ""
                                                }`}
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants} className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={!isFormValid || loading || isSubmitting}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
                                >
                                    {loading || isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Updating Password...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            Update Password
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
