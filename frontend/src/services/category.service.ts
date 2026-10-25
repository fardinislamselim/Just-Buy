/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import api from "@/lib/axios";
import type { Category } from "@/types";

export interface CategoriesApiResponse {
  statusCode: number;
  success: boolean;
  message?: string;
  data: Category[];
  total?: number;
}

/**
 * Category Service
 * Handles fetching categories from the backend API.
 * Note: Never use this service or endpoint to fetch product data.
 */
export const categoryService = {
  /**
   * Fetch all categories
   * Endpoint: GET /api/v1/category/list
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<CategoriesApiResponse>("/category/list");
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      // Re-throw or handle in calling hook/component
      throw error;
    }
  },

  /**
   * Fetch category by ID
   * Endpoint: GET /api/v1/category/:categoryId
   */
  async getCategoryById(categoryId: string): Promise<Category | null> {
    const response = await api.get<{
      statusCode: number;
      success: boolean;
      data: Category;
    }>(`/category/${categoryId}`);
    return response.data?.data || null;
  },
};
