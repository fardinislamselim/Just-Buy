"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState } from "react";
import Link from "next/link";
import { exploreProducts } from "@/data/products";
import { SectionHeading } from "./SectionHeading";
import { ProductGrid } from "../products/ProductGrid";
import type { Product } from "@/types";

interface ExploreProductsProps {
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: Set<string | number>;
}

export function ExploreProducts({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: ExploreProductsProps) {
  // Arrow buttons cycle or paginate products
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="explore-products"
      className="py-10 sm:py-14 border-t border-neutral-100"
      aria-label="Explore Our Products"
    >
      {/* Section Header with Left/Right Navigation buttons */}
      <SectionHeading
        badge="Our Products"
        title="Explore Our Products"
        showNavigation={true}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* 8 Products (4x2 Grid) */}
      <ProductGrid
        products={exploreProducts}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistIds={wishlistIds}
      />

      {/* Bottom Center "View All Products" Button */}
      <div className="mt-12 sm:mt-14 flex items-center justify-center">
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-[#FF5A0A] hover:bg-[#e04e08] text-white font-medium text-sm sm:text-base px-10 py-3.5 rounded-md transition-all shadow-xs active:scale-95"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

export default ExploreProducts;
