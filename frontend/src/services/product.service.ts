/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import api from "@/lib/axios";
import type { Product } from "@/types";

export interface ProductsApiResponse {
  statusCode: number;
  success: boolean;
  message?: string;
  data: Product[];
  total: number;
  skip?: number;
  limit?: number;
}

export interface ProductQueryParams {
  category?: string;
  search?: string;
  name?: string;
  price?: number;
  limit?: number;
  offset?: number;
}

/**
 * Product Service
 * Handles fetching products from the backend API.
 */
export const productService = {
  /**
   * Fetch all products with query filtering & pagination
   * Endpoint: GET /api/v1/product/list
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductsApiResponse> {
    try {
      const response = await api.get<ProductsApiResponse>("/product/list", {
        params,
      });
      return response.data;
    } catch (error) {
      // Re-throw to be handled by caller or React Query
      throw error;
    }
  },

  /**
   * Fetch single product by ID
   * Endpoint: GET /api/v1/product/:productId
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      const response = await api.get<{
        statusCode: number;
        success: boolean;
        data: Product;
      }>(`/product/${productId}`);
      return response.data?.data || null;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
