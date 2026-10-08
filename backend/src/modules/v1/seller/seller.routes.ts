/**
 * @copyright 2026
 * @author Rohanul Hauqe Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { Router } from "express";

/**
 * Application Module
 */
import fileUpload from "@/utils/fileUpload";

/**
 * Middlewares
 */
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import validation from "@/middlewares/validation";

/**
 * API Controllers
 */
import {
  getCurrentSellerProfileController,
  updateSellerController,
} from "@/modules/v1/seller/seller.controller";

/**
 * Validations
 */
import { updateSellerSchema } from "@/modules/v1/seller/seller.validation";
import { UserRole } from "../auth/auth.intarface";

/**
 * Router Instance
 */
const router = Router();

/**
 * Update Seller Profile
 * @access - private
 * @method - GET  
 * @route - /api/v1/seller/current
 */
router.get(
  "/current",
  authenticate,
  authorize([UserRole.SELLER]),
  getCurrentSellerProfileController,
);

/**
 * Update Seller Profile
 * @access - private
 * @method - PATCH  
 * @route - /api/v1/seller/current
 */
router.patch(
  "/current",
  authenticate,
  authorize([UserRole.SELLER]),
  fileUpload.single("avatar"),
  validation(updateSellerSchema),
  updateSellerController,
);

export default router;
