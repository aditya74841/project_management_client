"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Sparkles,
    ArrowRight,
    AlertCircle,
    CheckCircle,
    KeyRound,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearMessages } from "@/redux/slices/authSlice";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

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

export default function ForgotPasswordSheet({ isOpen, onOpenChange, onBackToLogin }) {
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const watchedEmail = watch("email");

    // Handle successful execution 
    useEffect(() => {
        if (message && message.includes("Reset link sent")) {
            setIsSuccess(true);
            reset();
            // Auto-close after 4 seconds
            const timer = setTimeout(() => {
                onOpenChange(false);
                setIsSuccess(false);
                dispatch(clearMessages());
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message, reset, onOpenChange, dispatch]);

    useEffect(() => {
        if (!isOpen) {
            dispatch(clearMessages());
            setIsSuccess(false);
            reset();
        }
    }, [isOpen, dispatch, reset]);

    const onSubmit = async (data) => {
        try {
            await dispatch(forgotPassword(data.email)).unwrap();
        } catch (err) {
            console.error("Forgot password failed:", err);
        }
    };

    const isFormValid = watchedEmail && !errors.email;

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-0 shadow-2xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-full flex flex-col"
                >
                    {/* Success Message */}
                    <AnimatePresence>
                        {isSuccess && (
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
                                            Check Your Email
                                        </p>
                                        <p className="text-green-600 text-sm">{message}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
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
                    <SheetHeader className="space-y-6 pt-8 pb-8 text-center">
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                                <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl">
                                    <KeyRound className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    Reset Password
                                </SheetTitle>
                                <p className="text-slate-500 text-base">
                                    Enter your email to receive a secure reset link.
                                </p>
                            </div>
                        </motion.div>
                    </SheetHeader>

                    {/* Form Content */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex-1 px-2 space-y-8"
                    >
                        <motion.div variants={itemVariants} className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                                <Mail className="w-4 h-4 text-blue-500" />
                                Email Address
                            </Label>
                            <div className="relative group">
                                <Input
                                    {...register("email")}
                                    placeholder="Enter your registered email"
                                    disabled={loading || isSuccess}
                                    className={`h-14 pl-6 pr-6 text-base border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md ${errors.email
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-slate-200 focus:border-blue-500"
                                        }`}
                                    aria-invalid={!!errors.email}
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

                        {/* Submit Button */}
                        <div className="pt-4 pb-6 px-2 space-y-4">
                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    disabled={!isFormValid || loading || isSubmitting || isSuccess}
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
                                                Sending Link...
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key="send"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-3"
                                            >
                                                <Sparkles className="w-5 h-5" />
                                                Send Reset Link
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.div>

                            <motion.div variants={itemVariants} className="text-center">
                                <button
                                    type="button"
                                    onClick={onBackToLogin}
                                    className="text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Back to Login
                                </button>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>
            </SheetContent>
        </Sheet>
    );
}
