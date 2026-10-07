/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import { Types } from "mongoose";

/**
 * Category Image
 */
export interface ICategoryImage {
  publicId: string;
  url: string;
  width: number | null;
  height: number | null;
}

/**
 * Category Interface
 */
export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  image: ICategoryImage;
  isActive: boolean;
  createdBy: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Category Payload
 */
export interface ICreateCategoryPayload {
  name: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Create Category Request
 */
export interface ICreateCategoryRequest {
  userId: Types.ObjectId;
  payload: ICreateCategoryPayload;
  file?: Express.Multer.File;
}

/**
 * Update Category Payload
 */
export interface IUpdateCategoryPayload {
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Update Category Request
 */
export interface IUpdateCategoryRequest {
  categoryId: string;
  payload: IUpdateCategoryPayload;
  file?: Express.Multer.File;
}

/**
 * Get Categories Query Parameters
 */
export interface IGetCategoriesQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

/**
 * Paginated Categories Result
 */
export interface IGetCategoriesResult {
  categories: ICategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  skip: number;
}