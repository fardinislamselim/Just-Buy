/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
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
import fileUpload from "@/utils/fileUpload";

/**
 * Roles & Types
 */
import { UserRole } from "@/modules/v1/auth/auth.intarface";

/**
 * Validations
 */
import {
  categoryIdSchema,
  categorySlugSchema,
  createCategorySchema,
  getCategoriesQuerySchema,
  updateCategorySchema,
} from "@/modules/v1/category/category.validation";

/**
 * Controllers
 */
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryBySlugController,
  toggleCategoryStatusController,
  updateCategoryController,
} from "@/modules/v1/category/category.controller";

/**
 * Router instance
 */
const router = Router();

/**
 * Create Category
 * @access - Private (Admin)
 * @method - POST
 * @route - /api/v1/category
 */
router.post(
  "/",
  authenticate,
  authorize([UserRole.ADMIN]),
  fileUpload.single("image"),
  validation(createCategorySchema),
  createCategoryController,
);

/**
 * Get All Categories
 * @access - Public
 * @method - GET
 * @route - /api/v1/category
 */
router.get(
  "/",
  validation(getCategoriesQuerySchema, "query"),
  getAllCategoriesController,
);

/**
 * Get Category by Slug
 * @access - Public
 * @method - GET
 * @route - /api/v1/category/slug/:slug
 */
router.get(
  "/slug/:slug",
  validation(categorySlugSchema, "params"),
  getCategoryBySlugController,
);

/**
 * Get Category by ID
 * @access - Public
 * @method - GET
 * @route - /api/v1/category/:id
 */
router.get(
  "/:id",
  validation(categoryIdSchema, "params"),
  getCategoryByIdController,
);

/**
 * Update Category
 * @access - Private (Admin)
 * @method - PATCH
 * @route - /api/v1/category/:id
 */
router.patch(
  "/:id",
  authenticate,
  authorize([UserRole.ADMIN]),
  fileUpload.single("image"),
  validation(categoryIdSchema, "params"),
  validation(updateCategorySchema),
  updateCategoryController,
);

/**
 * Toggle Category Status
 * @access - Private (Admin)
 * @method - PATCH / PUT
 * @route - /api/v1/category/:id/toggle-status
 */
router.patch(
  "/:id/toggle-status",
  authenticate,
  authorize([UserRole.ADMIN]),
  validation(categoryIdSchema, "params"),
  toggleCategoryStatusController,
);

/**
 * Delete Category
 * @access - Private (Admin)
 * @method - DELETE
 * @route - /api/v1/category/:id
 */
router.delete(
  "/:id",
  authenticate,
  authorize([UserRole.ADMIN]),
  validation(categoryIdSchema, "params"),
  deleteCategoryController,
);

/**
 * Export router
 */
export default router;
