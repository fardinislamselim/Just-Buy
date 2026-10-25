"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState, useEffect, Suspense, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductPagination } from "@/components/products/ProductPagination";
import { useProducts, type PriceTier, type SortOption } from "@/hooks/use-products";
import type { Product } from "@/types";

function ProductsViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read URL query parameters
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialPriceTier = (searchParams.get("priceTier") as PriceTier) || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialBudget = searchParams.get("budget") || "";

  // Local state synced with URL
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedPriceTier, setSelectedPriceTier] = useState<PriceTier>(initialPriceTier);
  const [customBudget, setCustomBudget] = useState<string>(initialBudget);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Mobile filter drawer toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("jusbuy_wishlist");
      if (savedWishlist) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWishlistIds(new Set(JSON.parse(savedWishlist)));
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Sync state when URL search params change externally (e.g. from navbar search or category click)
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    const urlSearch = searchParams.get("search") || "";
    const urlPriceTier = (searchParams.get("priceTier") as PriceTier) || "all";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    const urlBudget = searchParams.get("budget") || "";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(urlCategory);
    setSearchQuery(urlSearch);
    setSelectedPriceTier(urlPriceTier);
    setCurrentPage(urlPage);
    setCustomBudget(urlBudget);
  }, [searchParams]);

  // Update URL search parameters when filters change
  const updateUrl = (
    newCategory: string,
    newSearch: string,
    newPriceTier: PriceTier,
    newBudget: string,
    newPage: number,
  ) => {
    const params = new URLSearchParams();
    if (newCategory && newCategory !== "all") params.set("category", newCategory);
    if (newSearch && newSearch.trim()) params.set("search", newSearch.trim());
    if (newPriceTier && newPriceTier !== "all") params.set("priceTier", newPriceTier);
    if (newBudget && newBudget.trim()) params.set("budget", newBudget.trim());
    if (newPage > 1) params.set("page", newPage.toString());

    const queryString = params.toString();
    startTransition(() => {
      router.push(`/products${queryString ? `?${queryString}` : ""}`, { scroll: false });
    });
  };

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrl(category, searchQuery, selectedPriceTier, customBudget, 1);
  };

  const handlePriceTierChange = (tier: PriceTier) => {
    setSelectedPriceTier(tier);
    setCurrentPage(1);
    updateUrl(selectedCategory, searchQuery, tier, customBudget, 1);
  };

  const handleCustomBudgetChange = (budget: string) => {
    setCustomBudget(budget);
    setCurrentPage(1);
    updateUrl(selectedCategory, searchQuery, selectedPriceTier, budget, 1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    updateUrl(selectedCategory, searchQuery, selectedPriceTier, customBudget, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl(selectedCategory, searchQuery, selectedPriceTier, customBudget, page);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedPriceTier("all");
    setCustomBudget("");
    setCurrentPage(1);
    updateUrl("all", "", "all", "", 1);
  };

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    try {
      const savedCount = parseInt(localStorage.getItem("jusbuy_cart_count") || "0", 10);
      const newCount = savedCount + 1;
      localStorage.setItem("jusbuy_cart_count", newCount.toString());
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // LocalStorage ignore
    }
  };

  // Toggle wishlist handler
  const handleToggleWishlist = (product: Product) => {
    const prodId = String(product._id || product.id);
    const updated = new Set(wishlistIds);
    if (updated.has(prodId)) {
      updated.delete(prodId);
    } else {
      updated.add(prodId);
    }
    setWishlistIds(updated);
    try {
      localStorage.setItem("jusbuy_wishlist", JSON.stringify(Array.from(updated)));
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // LocalStorage ignore
    }
  };

  // Fetch products with our custom hook
  const numBudget = customBudget ? parseFloat(customBudget) : null;
  const {
    products,
    totalCount,
    totalPages,
    currentPage: validatedPage,
    fromIndex,
    toIndex,
    isLoading,
  } = useProducts({
    category: selectedCategory,
    search: searchQuery,
    priceTier: selectedPriceTier,
    customBudget: isNaN(numBudget as number) ? null : numBudget,
    page: currentPage,
    limit: 15,
    sortBy,
  });

  const hasActiveFilters =
    Boolean(selectedCategory && selectedCategory !== "all") ||
    Boolean(searchQuery && searchQuery.trim() !== "") ||
    selectedPriceTier !== "all" ||
    Boolean(customBudget && customBudget.trim() !== "");

  return (
    <>
      {/* Top Section Heading Row (Matches Reference Screenshot) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-10">
        {/* Left: Orange Badge "This Month" & Main Title "New Arrival" */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3.5">
            <span className="w-3.5 h-7 sm:w-4 sm:h-8 bg-brand-orange rounded-xs inline-block shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-brand-orange">
              This Month
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-neutral-900 tracking-tight">
            {selectedCategory && selectedCategory !== "all"
              ? selectedCategory
              : "New Arrival"}
          </h1>
        </div>

        {/* Right: Search Input (Light Gray Background with Search Icon) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 md:w-72 lg:w-80"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full pl-4 pr-11 py-2.5 text-xs sm:text-sm bg-neutral-100 text-neutral-800 placeholder:text-neutral-400 rounded-md border border-transparent focus:outline-none focus:border-brand-orange/40 focus:bg-white transition-all shadow-2xs"
            />
            <button
              type="submit"
              aria-label="Submit Search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-brand-orange transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-semibold transition-colors"
            aria-label="Toggle Filters"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid Layout: Sidebar Filters + Products Grid */}
      <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
        {/* Desktop Left Sidebar: Filters */}
        <div className="hidden md:block">
          <ProductFilters
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            selectedPriceTier={selectedPriceTier}
            onSelectPriceTier={handlePriceTierChange}
            customBudget={customBudget}
            onCustomBudgetChange={handleCustomBudgetChange}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Accordion / Modal Drawer */}
        {isMobileFilterOpen && (
          <div className="md:hidden w-full bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-3">
              <span className="font-semibold text-sm">Filter Options</span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-neutral-500 hover:text-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ProductFilters
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                handleCategoryChange(cat);
                setIsMobileFilterOpen(false);
              } }
              onSelectPriceTier={(tier) => {
                handlePriceTierChange(tier);
                setIsMobileFilterOpen(false);
              } }
              customBudget={customBudget}
              onCustomBudgetChange={handleCustomBudgetChange}
              onResetFilters={() => {
                handleResetFilters();
                setIsMobileFilterOpen(false);
              } } selectedPriceTier={"all"}            />
          </div>
        )}

        {/* Right Column: Active Badges + Products Grid + Pagination */}
        <div className="flex-1 w-full flex flex-col">
          {/* Active Filter Tags Row & Sort Option */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-2">
            <div className="flex items-center flex-wrap gap-2 text-xs">
              {hasActiveFilters && (
                <span className="text-neutral-400 font-medium mr-1">Active:</span>
              )}

              {selectedCategory && selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100/70 text-brand-orange font-medium">
                  Category: {selectedCategory}
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("all")}
                    className="hover:text-neutral-900"
                    aria-label="Remove category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedPriceTier !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100/70 text-brand-orange font-medium">
                  Price: {selectedPriceTier === "under25"
                    ? "Under $25"
                    : selectedPriceTier === "midrange"
                    ? "$25 - $50"
                    : "$50 & Above"}
                  <button
                    type="button"
                    onClick={() => handlePriceTierChange("all")}
                    className="hover:text-neutral-900"
                    aria-label="Remove price filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {customBudget && customBudget.trim() !== "" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100/70 text-brand-orange font-medium">
                  Budget: Up to ${customBudget}
                  <button
                    type="button"
                    onClick={() => handleCustomBudgetChange("")}
                    className="hover:text-neutral-900"
                    aria-label="Remove budget filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100/70 text-brand-orange font-medium">
                  Search: &ldquo;{searchQuery}&rdquo;
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      updateUrl(selectedCategory, "", selectedPriceTier, customBudget, 1);
                    }}
                    className="hover:text-neutral-900"
                    aria-label="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center space-x-2 text-xs ml-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <label htmlFor="sort-select" className="text-neutral-500 font-medium">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent border-0 text-neutral-800 font-medium focus:ring-0 cursor-pointer hover:text-brand-orange text-xs py-1 pr-2"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid (3 Columns on Desktop matching Screenshot) */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-3 animate-pulse"
                >
                  <div className="aspect-square bg-neutral-100 rounded-md" />
                  <div className="h-4 bg-neutral-100 rounded w-3/4" />
                  <div className="h-4 bg-neutral-100 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
              <p className="text-neutral-500 text-base">
                No products found matching your current filter criteria.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2 text-xs font-semibold text-white bg-brand-orange hover:bg-[#e04e08] rounded-md transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product, index) => {
                const prodId = String(product._id || product.id || index);

                return (
                  <ProductCard
                    key={prodId}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistIds.has(prodId)}
                  />
                );
              })}
            </div>
          )}

          {/* Pagination Bar */}
          <ProductPagination
            currentPage={validatedPage}
            totalPages={totalPages}
            fromIndex={fromIndex}
            toIndex={toIndex}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            className="mt-10"
          />
        </div>
      </div>
    </>
  );
}

export function ProductsView() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange" />
        </div>
      }
    >
      <ProductsViewContent />
    </Suspense>
  );
}

export default ProductsView;
