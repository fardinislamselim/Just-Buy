"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import Link from "next/link";
import { newArrivalsProducts } from "@/data/products";
import { SectionHeading } from "./SectionHeading";
import { ProductGrid } from "../products/ProductGrid";
import type { Product } from "@/types";

interface NewArrivalsProps {
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: Set<string | number>;
}

export function NewArrivals({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: NewArrivalsProps) {
  const viewAllButton = (
    <Link
      href="#all-products"
      className="inline-flex items-center justify-center bg-[#FF5A0A] hover:bg-[#e04e08] text-white font-medium text-xs sm:text-sm px-6 sm:px-8 py-2.5 rounded-md transition-colors shadow-xs active:scale-95"
    >
      View All
    </Link>
  );

  return (
    <section id="new-arrivals" className="py-10 sm:py-14 border-t border-neutral-100" aria-label="New Arrivals">
      {/* Section Header with "This Month" badge and "View All" button */}
      <SectionHeading
        badge="This Month"
        title="New Arrival"
        rightElement={viewAllButton}
      />

      {/* 4 Product Cards Grid */}
      <ProductGrid
        products={newArrivalsProducts}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistIds={wishlistIds}
      />
    </section>
  );
}

export default NewArrivals;
