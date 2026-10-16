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
import {
  addWishlistController,
  removeWishlistController,
} from "./wishlist.controller";

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
 * All Wishlist
 * @access - Private (Buyer)
 * @method - GET
 * @route - /api/v1/wishlist/list
 */
router.delete(
  "/:productId",
  authenticate,
  authorize([UserRole.BUYER]),
  validation(productIdSchema, "params"),
  removeWishlistController,
);

/**
 * Export router
 */
export default router;
