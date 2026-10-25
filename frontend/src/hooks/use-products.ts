"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { productService, type ProductQueryParams } from "@/services/product.service";
import { catalogProducts } from "@/data/products";
import type { Product } from "@/types";

export type PriceTier = "all" | "under25" | "midrange" | "highend";

export interface UseProductsOptions {
  category?: string;
  search?: string;
  priceTier?: PriceTier;
  customBudget?: number | null;
  page?: number;
  limit?: number;
  sortBy?: "default" | "price-asc" | "price-desc" | "rating-desc";
}

/**
 * Hook to retrieve products with search, category filter, price tiers, and pagination.
 * Connects to backend API and seamlessly falls back to rich catalog data if backend is offline.
 */
export function useProducts(options: UseProductsOptions = {}) {
  const {
    category = "",
    search = "",
    priceTier = "all",
    customBudget = null,
    page = 1,
    limit = 15,
    sortBy = "default",
  } = options;

  const queryParams: ProductQueryParams = useMemo(() => {
    const params: ProductQueryParams = {
      limit,
      offset: (page - 1) * limit,
    };
    if (category && category !== "all") {
      params.category = category;
    }
    if (search && search.trim()) {
      params.search = search.trim();
    }
    if (customBudget !== null && customBudget > 0) {
      params.price = customBudget;
    }
    return params;
  }, [category, search, customBudget, page, limit]);

  // TanStack Query for backend product list
  const query = useQuery({
    queryKey: ["products", queryParams, priceTier, sortBy],
    queryFn: async () => {
      try {
        const response = await productService.getProducts(queryParams);
        return response;
      } catch (err) {
        // Return null to signal fallback to catalog data
        return null;
      }
    },
    staleTime: 60 * 1000,
    retry: false,
  });

  // Client-side fallback and filtering
  const fallbackResult = useMemo(() => {
    let list: Product[] = [...catalogProducts];

    // Filter by Category
    if (category && category !== "all") {
      const lowerCat = category.toLowerCase().trim();
      list = list.filter((p) => {
        const prodCat = (p.category || "").toLowerCase().trim();
        return prodCat.includes(lowerCat) || lowerCat.includes(prodCat);
      });
    }

    // Filter by Search Query
    if (search && search.trim()) {
      const queryStr = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(queryStr) ||
          p.description.toLowerCase().includes(queryStr) ||
          (p.brand && p.brand.toLowerCase().includes(queryStr)) ||
          p.category.toLowerCase().includes(queryStr),
      );
    }

    // Filter by Price Tier
    if (priceTier === "under25") {
      list = list.filter((p) => p.price < 25);
    } else if (priceTier === "midrange") {
      list = list.filter((p) => p.price >= 25 && p.price <= 50);
    } else if (priceTier === "highend") {
      list = list.filter((p) => p.price > 50);
    }

    // Filter by Custom Budget (Max price)
    if (customBudget !== null && customBudget > 0) {
      list = list.filter((p) => p.price <= customBudget);
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    const totalCount = list.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const validPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (validPage - 1) * limit;
    const paginatedProducts = list.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      totalCount,
      totalPages,
      currentPage: validPage,
      fromIndex: totalCount === 0 ? 0 : startIndex + 1,
      toIndex: Math.min(startIndex + limit, totalCount),
    };
  }, [category, search, priceTier, customBudget, page, limit, sortBy]);

  // Determine if using backend API or local fallback
  const isApiSuccess =
    query.data &&
    query.data.success &&
    Array.isArray(query.data.data) &&
    query.data.data.length > 0;

  if (isApiSuccess && query.data) {
    const apiProducts = query.data.data;
    const totalCount = query.data.total ?? apiProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const startIndex = (page - 1) * limit;

    return {
      products: apiProducts,
      totalCount,
      totalPages,
      currentPage: page,
      fromIndex: totalCount === 0 ? 0 : startIndex + 1,
      toIndex: Math.min(startIndex + apiProducts.length, totalCount),
      isLoading: query.isLoading,
      isError: query.isError,
      isUsingFallback: false,
      refetch: query.refetch,
    };
  }

  return {
    products: fallbackResult.products,
    totalCount: fallbackResult.totalCount,
    totalPages: fallbackResult.totalPages,
    currentPage: fallbackResult.currentPage,
    fromIndex: fallbackResult.fromIndex,
    toIndex: fallbackResult.toIndex,
    isLoading: query.isLoading && !query.isFetched,
    isError: false,
    isUsingFallback: true,
    refetch: query.refetch,
  };
}

export default useProducts;
