"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { fallbackCategories } from "@/data/categories";
import type { Category } from "@/types";

/**
 * Hook to retrieve categories from the API.
 * Uses TanStack Query for caching and lifecycle management.
 * Gracefully provides fallback static categories if the API is offline or returns empty.
 */
export function useCategories() {
  const query = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      return await categoryService.getCategories();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const hasApiData = query.data && Array.isArray(query.data) && query.data.length > 0;
  const categories: Category[] = hasApiData ? query.data : fallbackCategories;

  return {
    categories,
    rawCategories: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isUsingFallback: !hasApiData,
    refetch: query.refetch,
  };
}
