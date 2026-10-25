"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { relatedProducts } from "@/data/products";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products?: Product[];
}

export function RelatedProducts({ products = relatedProducts }: RelatedProductsProps) {
  const displayItems = products.slice(0, 4);

  return (
    <section className="py-8 sm:py-12 border-t border-neutral-200/90" aria-labelledby="related-products-heading">
      {/* Orange Accent Bar & Title Matching Screenshot */}
      <div className="flex items-center space-x-3.5 mb-8">
        <span className="w-3.5 h-7 sm:w-4 sm:h-8 bg-brand-orange rounded-xs inline-block shrink-0" />
        <h2 id="related-products-heading" className="text-sm sm:text-base font-semibold text-brand-orange">
          Related Item
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {displayItems.map((prod, idx) => (
          <ProductCard
            key={prod._id || prod.id || idx}
            product={prod}
            alwaysShowAddToCart={idx === 1}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
