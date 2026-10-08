/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { z } from "zod";

/**
 * Category Image Validation Schema
 */
export const categoryImageSchema = z.object({
  publicId: z.string().trim().optional(),
  url: z.string().url("Please provide a valid image URL").trim().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
});

/**
 * Create Category Validation Schema
 */
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters")
    .trim(),

  slug: z
    .string()
    .min(2, "Category slug must be at least 2 characters")
    .max(120, "Category slug cannot exceed 120 characters")
    .trim()
    .toLowerCase()
    .optional(),

  description: z
    .string()
    .max(500, "Category description cannot exceed 500 characters")
    .trim()
    .optional(),

  image: categoryImageSchema.optional(),

  isActive: z
    .union([
      z.boolean(),
      z.enum(["true", "false"]).transform((val) => val === "true"),
    ])
    .optional(),
});

/**
 * Update Category Validation Schema
 */
export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters")
    .trim()
    .optional(),

  slug: z
    .string()
    .min(2, "Category slug must be at least 2 characters")
    .max(120, "Category slug cannot exceed 120 characters")
    .trim()
    .toLowerCase()
    .optional(),

  description: z
    .string()
    .max(500, "Category description cannot exceed 500 characters")
    .trim()
    .optional(),

  image: categoryImageSchema.optional(),

  isActive: z
    .union([
      z.boolean(),
      z.enum(["true", "false"]).transform((val) => val === "true"),
    ])
    .optional(),
});

/**
 * Category ID Param Validation Schema
 */
export const categoryIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
});

/**
 * Category Slug Param Validation Schema
 */
export const categorySlugSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(120, "Category slug cannot exceed 120 characters")
    .trim(),
});

/**
 * Get Categories Query Validation Schema
 */
export const getCategoriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  search: z.string().trim().optional(),
  isActive: z
    .union([
      z.boolean(),
      z.enum(["true", "false"]).transform((val) => val === "true"),
    ])
    .optional(),
  sortBy: z
    .enum(["name", "createdAt", "updatedAt"])
    .default("createdAt")
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
});

/**
 * Types
 */
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryImageInput = z.infer<typeof categoryImageSchema>;
export type CategoryIdInput = z.infer<typeof categoryIdSchema>;
export type CategorySlugInput = z.infer<typeof categorySlugSchema>;
export type GetCategoriesQueryInput = z.infer<typeof getCategoriesQuerySchema>;
