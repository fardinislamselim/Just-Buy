/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Auth Routes
 */

/**
 * Third-Party Modules
 */
import { Router } from "express";

/**
 * Application Modules
 */
import {
  registerSchema,
} from "./auth.validation";
import { validate } from "@/middlewares/zod.middleware";
import { authController } from "./auth.controller";

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
 * Module Export
 */
export const AuthRoutes = router;