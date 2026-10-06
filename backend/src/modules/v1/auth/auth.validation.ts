/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Auth Validation
 */

/**
 * Third-Party Modules
 */
import { z } from "zod";


/**
 * User Roles
 */
export const userRoleSchema = z.enum([
  "buyer",
  "seller",
]);

/**
 * Register Validation Schema
 */
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),

  email: z
    .string()
    .email("Please provide a valid email address")
    .max(150, "Email cannot exceed 150 characters")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password cannot exceed 72 characters"),

  phone: z
    .string()
    .min(10, "Phone number is invalid")
    .max(20, "Phone number is invalid")
    .optional(),

  role: userRoleSchema.default("buyer"),
});

/**
 * Login Validation Schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

/**
 * Refresh Token Validation Schema
 */
export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required"),
});

/**
 * Types
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<
  typeof refreshTokenSchema
>;