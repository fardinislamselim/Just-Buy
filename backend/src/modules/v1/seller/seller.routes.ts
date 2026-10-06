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
import validation from "@/middlewares/validation";

/**
 * API Controllers
 */
import { updateSellerController } from "@/modules/v1/seller/seller.controller";

/**
 * Validations
 */
import { updateSellerSchema } from "@/modules/v1/seller/seller.validation";

/**
 * Router Instance
 */
const router = Router();

/**
 * Update Seller Profile
 * @access - private
 * @method - PATCH  
 * @route - /api/v1/seller/update-profile
 */
router.patch(
  "/current",
  authenticate,
  fileUpload.single("avatar"),
  validation(updateSellerSchema),
  updateSellerController,
);

export default router;
