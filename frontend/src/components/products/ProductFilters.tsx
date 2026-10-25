"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState } from "react";
import { ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { fallbackCategories } from "@/data/categories";
import type { PriceTier } from "@/hooks/use-products";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedPriceTier: PriceTier;
  onSelectPriceTier: (tier: PriceTier) => void;
  customBudget: string;
  onCustomBudgetChange: (val: string) => void;
  onResetFilters: () => void;
  className?: string;
}

export function ProductFilters({
  selectedCategory,
  onSelectCategory,
  selectedPriceTier,
  onSelectPriceTier,
  customBudget,
  onCustomBudgetChange,
  onResetFilters,
  className,
}: ProductFiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const categories = fallbackCategories;

  const hasActiveFilters =
    Boolean(selectedCategory && selectedCategory !== "all") ||
    selectedPriceTier !== "all" ||
    Boolean(customBudget && customBudget.trim() !== "");

  const handleCategoryClick = (catName: string) => {
    if (selectedCategory.toLowerCase() === catName.toLowerCase()) {
      onSelectCategory("all");
    } else {
      onSelectCategory(catName);
    }
  };

  const handlePriceTierClick = (tier: PriceTier) => {
    if (selectedPriceTier === tier) {
      onSelectPriceTier("all");
    } else {
      onSelectPriceTier(tier);
    }
  };

  return (
    <aside
      className={cn(
        "w-full md:w-64 lg:w-72 shrink-0 flex flex-col space-y-4",
        className,
      )}
      aria-label="Product Search Filters"
    >
      {/* Filters Title Banner (Orange Background Matching Mockup) */}
      <div className="bg-brand-orange text-white px-4 py-2.5 rounded-md flex items-center justify-between shadow-2xs">
        <h2 className="text-base font-bold tracking-wide">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-white/90 hover:text-white underline cursor-pointer transition-opacity"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Category Accordion Section */}
      <div className="border-b border-neutral-200/80 pb-5">
        <button
          type="button"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex items-center justify-between text-left py-2 font-semibold text-neutral-900 hover:text-brand-orange transition-colors"
          aria-expanded={isCategoryOpen}
        >
          <span className="text-sm sm:text-base">Category</span>
          {isCategoryOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {isCategoryOpen && (
          <div className="mt-2.5 flex flex-col space-y-2.5 pl-0.5 animate-in fade-in duration-150">
            {categories.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <label
                  key={cat._id || cat.id || cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group flex items-center space-x-3 cursor-pointer py-0.5 select-none"
                >
                  {/* Custom Round Radio / Checkbox Indicator */}
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                      isSelected
                        ? "border-brand-orange bg-brand-orange"
                        : "border-neutral-300 bg-white group-hover:border-neutral-400",
                    )}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-xs sm:text-sm transition-colors",
                      isSelected
                        ? "text-brand-orange font-semibold"
                        : "text-neutral-700 group-hover:text-neutral-900",
                    )}
                  >
                    {cat.name}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Accordion Section */}
      <div className="border-b border-neutral-200/80 pb-6">
        <button
          type="button"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex items-center justify-between text-left py-2 font-semibold text-neutral-900 hover:text-brand-orange transition-colors"
          aria-expanded={isPriceOpen}
        >
          <span className="text-sm sm:text-base">Price</span>
          {isPriceOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {isPriceOpen && (
          <div className="mt-2.5 flex flex-col space-y-3 pl-0.5 animate-in fade-in duration-150">
            {/* Price Tier: Under $25 */}
            <label
              onClick={() => handlePriceTierClick("under25")}
              className="group flex items-center space-x-3 cursor-pointer select-none"
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                  selectedPriceTier === "under25"
                    ? "border-brand-orange bg-brand-orange"
                    : "border-neutral-300 bg-white group-hover:border-neutral-400",
                )}
              >
                {selectedPriceTier === "under25" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm transition-colors",
                  selectedPriceTier === "under25"
                    ? "text-brand-orange font-semibold"
                    : "text-neutral-700 group-hover:text-neutral-900",
                )}
              >
                Value Under $25
              </span>
            </label>

            {/* Price Tier: Mid-range $25-$50 */}
            <label
              onClick={() => handlePriceTierClick("midrange")}
              className="group flex items-center space-x-3 cursor-pointer select-none"
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                  selectedPriceTier === "midrange"
                    ? "border-brand-orange bg-brand-orange"
                    : "border-neutral-300 bg-white group-hover:border-neutral-400",
                )}
              >
                {selectedPriceTier === "midrange" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm transition-colors",
                  selectedPriceTier === "midrange"
                    ? "text-brand-orange font-semibold"
                    : "text-neutral-700 group-hover:text-neutral-900",
                )}
              >
                Mid-range $25-$50
              </span>
            </label>

            {/* Price Tier: High-end $50 & Above */}
            <label
              onClick={() => handlePriceTierClick("highend")}
              className="group flex items-center space-x-3 cursor-pointer select-none"
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                  selectedPriceTier === "highend"
                    ? "border-brand-orange bg-brand-orange"
                    : "border-neutral-300 bg-white group-hover:border-neutral-400",
                )}
              >
                {selectedPriceTier === "highend" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm transition-colors",
                  selectedPriceTier === "highend"
                    ? "text-brand-orange font-semibold"
                    : "text-neutral-700 group-hover:text-neutral-900",
                )}
              >
                High-end $50 & Above
              </span>
            </label>

            {/* Custom Budget Input Box with '$' suffix */}
            <div className="pt-2">
              <div className="relative flex items-center">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={customBudget}
                  onChange={(e) => onCustomBudgetChange(e.target.value)}
                  placeholder="Enter budget"
                  className="w-full pl-3 pr-8 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-md placeholder:text-neutral-400 text-neutral-800 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 transition-all"
                />
                <span className="absolute right-3 text-neutral-500 font-medium text-sm pointer-events-none">
                  $
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear All Filters Button (Mobile & Desktop helper) */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full py-2 px-3 text-xs sm:text-sm text-brand-orange bg-orange-50/80 hover:bg-orange-100/80 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
        </button>
      )}
    </aside>
  );
}

export default ProductFilters;
