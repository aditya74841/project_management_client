// lib/validations/auth.js
import { z } from "zod";

export const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, { message: "Email or phone is required" })
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }, { 
      message: "Must be a valid email address or phone number (10-15 digits)" 
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});
