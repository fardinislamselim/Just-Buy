/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import { Router } from "express";

/**
 * Application Modules
 */
import {
  loginSchema,
  registerSchema,
} from "./auth.validation";
import { validate } from "@/middlewares/zod.middleware";
import { authController } from "@/modules/v1/auth/auth.controller";

const router = Router();

/**
 * Register
 *
 * POST /api/v1/auth/register
 */
router.post(
  "/register",
  validate(registerSchema),
  authController.register,
);

/**
 * Login
 *
 * POST /api/v1/auth/login
 */
router.post(
  "/login",
  validate(loginSchema),
  authController.login,
);

/**
 * Logout
 *
 * GET /api/v1/auth/logout
 */
router.get(
  "/logout",
  authController.logout,
);

/**
 * Refresh Token
 *
 * POST /api/v1/auth/refresh-token
 */
router.post(
  "/refresh-token",
  authController.refreshToken,
);

/**
 * Forgot Password
 *
 * POST /api/v1/auth/forgot-password
 */
router.post(
  "/forgot-password",
  authController.forgotPassword,
);

/**
 * Module Export
 */
export const AuthRoutes = router;