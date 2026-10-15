/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { Router } from "express";

/**
 * Middlewares
 */
import authenticate from "@/middlewares/authenticate";
import authorize from "@/middlewares/authorize";
import validation from "@/middlewares/validation";

/**
 * Roles & Types
 */
import { UserRole } from "@/modules/v1/auth/auth.intarface";

/**
 * Validations
 */

/**
 * Controllers
 */
import { productIdSchema } from "../product/product.validation";
import { addWishlistController } from "./wishlist.controller";

/**
 * Router instance
 */
const router = Router();

/**
 * Add Wishlist
 * @access - Private (Buyer)
 * @method - POST
 * @route - /api/v1/wishlist/:productId
 */
router.post(
  "/:productId",
  authenticate,
  authorize([UserRole.BUYER]),
  validation(productIdSchema, "params"),
  addWishlistController,
);

/**
 * Export router
 */
export default router;
