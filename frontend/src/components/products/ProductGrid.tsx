"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: Set<string | number>;
  highlightedCardId?: string | number;
  className?: string;
}

export function ProductGrid({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  highlightedCardId,
  className,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500">
        <p>No products available in this section.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
        className,
      )}
    >
      {products.map((product) => {
        const prodId = String(product._id || product.id || "");
        return (
          <ProductCard
            key={prodId}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={
              wishlistIds
                ? wishlistIds.has(prodId) || (product.id ? wishlistIds.has(product.id) : false)
                : undefined
            }
            alwaysShowAddToCart={
              highlightedCardId === prodId || highlightedCardId === product.id
            }
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
