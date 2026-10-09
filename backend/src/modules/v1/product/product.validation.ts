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
 * MongoDB ObjectId Regex Pattern
 */
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

/**
 * Product Image Validation Schema
 */
export const productImageSchema = z.object({
  publicId: z.string().default(""),
  url: z.string().default(""),
  width: z.number().nullable().default(null).optional(),
  height: z.number().nullable().default(null).optional(),
});

/**
 * Create Product Validation Schema
 */
export const createProductSchema = z
  .object({
    name: z
      .string()
      .min(2, "Product name must be at least 2 characters")
      .max(200, "Product name cannot exceed 200 characters")
      .trim(),

    description: z.string().trim().optional(),

    price: z.coerce.number().min(0, "Price cannot be negative"),

    stockQuantity: z.coerce
      .number()
      .int("Stock quantity must be an integer")
      .min(0, "Stock quantity cannot be negative")
      .default(0)
      .optional(),

    stock_quantity: z.coerce
      .number()
      .int("Stock quantity must be an integer")
      .min(0, "Stock quantity cannot be negative")
      .optional(),

    images: z
      .union([
        z.array(productImageSchema),
        z.string().transform((val) => {
          try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        }),
      ])
      .default([])
      .optional(),

    isFeatured: z
      .union([
        z.boolean(),
        z.enum(["true", "false"]).transform((val) => val === "true"),
      ])
      .default(false)
      .optional(),

    is_featured: z
      .union([
        z.boolean(),
        z.enum(["true", "false"]).transform((val) => val === "true"),
      ])
      .optional(),

    category: z
      .string()
      .regex(objectIdRegex, "Invalid category ID")
      .trim()
      .optional(),

    categoryId: z
      .string()
      .regex(objectIdRegex, "Invalid category ID")
      .trim()
      .optional(),

    category_id: z
      .string()
      .regex(objectIdRegex, "Invalid category ID")
      .trim()
      .optional(),

    seller: z
      .string()
      .regex(objectIdRegex, "Invalid seller ID")
      .trim()
      .optional(),

    sellerId: z
      .string()
      .regex(objectIdRegex, "Invalid seller ID")
      .trim()
      .optional(),

    seller_id: z
      .string()
      .regex(objectIdRegex, "Invalid seller ID")
      .trim()
      .optional(),
  })
  .refine(
    (data) => Boolean(data.category || data.categoryId || data.category_id),
    {
      message: "Category ID is required",
      path: ["category"],
    },
  )
  .transform((data) => ({
    name: data.name,
    description: data.description ?? "",
    price: data.price,
    stockQuantity: data.stockQuantity ?? data.stock_quantity ?? 0,
    images: data.images ?? [],
    isFeatured: data.isFeatured ?? data.is_featured ?? false,
    category: data.category || data.categoryId || data.category_id!,
    seller: data.seller || data.sellerId || data.seller_id,
  }));

/**
 * Update Product Validation Schema
 */
export const updateProductSchema = z
  .object({
    name: z
      .string()
      .min(2, "Product name must be at least 2 characters")
      .max(200, "Product name cannot exceed 200 characters")
      .trim()
      .optional(),

    description: z.string().trim().optional(),

    price: z.coerce.number().min(0, "Price cannot be negative").optional(),

    stockQuantity: z.coerce
      .number()
      .int("Stock quantity must be an integer")
      .min(0, "Stock quantity cannot be negative")
      .optional(),

    stock_quantity: z.coerce
      .number()
      .int("Stock quantity must be an integer")
      .min(0, "Stock quantity cannot be negative")
      .optional(),

    images: z
      .union([
        z.array(productImageSchema),
        z.string().transform((val) => {
          try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        }),
      ])
      .optional(),

    isFeatured: z
      .union([
        z.boolean(),
        z.enum(["true", "false"]).transform((val) => val === "true"),
      ])
      .optional(),

    is_featured: z
      .union([
        z.boolean(),
        z.enum(["true", "false"]).transform((val) => val === "true"),
      ])
      .optional(),

    category: z
      .string()
      .regex(objectIdRegex, "Invalid category ID")
      .trim()
      .optional(),

    categoryId: z
      .string()
      .regex(objectIdRegex, "Invalid category ID")
      .trim()
      .optional(),

    category_id: z
      .string()
      .regex(objectIdRegex, "Invalid category ID")
      .trim()
      .optional(),

    seller: z
      .string()
      .regex(objectIdRegex, "Invalid seller ID")
      .trim()
      .optional(),

    sellerId: z
      .string()
      .regex(objectIdRegex, "Invalid seller ID")
      .trim()
      .optional(),

    seller_id: z
      .string()
      .regex(objectIdRegex, "Invalid seller ID")
      .trim()
      .optional(),
  })
  .transform((data) => ({
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.price !== undefined && { price: data.price }),
    ...((data.stockQuantity !== undefined ||
      data.stock_quantity !== undefined) && {
      stockQuantity: data.stockQuantity ?? data.stock_quantity,
    }),
    ...(data.images !== undefined && { images: data.images }),
    ...((data.isFeatured !== undefined || data.is_featured !== undefined) && {
      isFeatured: data.isFeatured ?? data.is_featured,
    }),
    ...((data.category || data.categoryId || data.category_id) && {
      category: data.category || data.categoryId || data.category_id,
    }),
    ...((data.seller || data.sellerId || data.seller_id) && {
      seller: data.seller || data.sellerId || data.seller_id,
    }),
  }));

/**
 * Product ID Param Validation Schema
 */
export const productIdSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid product ID"),
});

/**
 * Product ID Param Validation Schema (Alternative parameter name)
 */
export const productIdParamSchema = z.object({
  productId: z.string().regex(objectIdRegex, "Invalid product ID"),
});

/**
 * Get Products Query Validation Schema
 */
export const getProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  categoryId: z.string().trim().optional(),
  category_id: z.string().trim().optional(),
  seller: z.string().trim().optional(),
  sellerId: z.string().trim().optional(),
  seller_id: z.string().trim().optional(),
  isFeatured: z
    .union([
      z.boolean(),
      z.enum(["true", "false"]).transform((val) => val === "true"),
    ])
    .optional(),
  is_featured: z
    .union([
      z.boolean(),
      z.enum(["true", "false"]).transform((val) => val === "true"),
    ])
    .optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sortBy: z
    .enum(["name", "price", "stockQuantity", "createdAt", "updatedAt"])
    .default("createdAt")
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
});

/**
 * Types
 */
export type ProductImageInput = z.infer<typeof productImageSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductIdInput = z.infer<typeof productIdSchema>;
export type ProductIdParamInput = z.infer<typeof productIdParamSchema>;
export type GetProductsQueryInput = z.infer<typeof getProductsQuerySchema>;
