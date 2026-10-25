"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";

interface ProductDescriptionProps {
  customDescription?: string;
}

export function ProductDescription({ customDescription }: ProductDescriptionProps) {
  return (
    <section className="py-8 sm:py-10 border-t border-neutral-200/90" aria-labelledby="product-description-heading">
      {/* Orange Description Tab / Badge */}
      <div className="mb-6">
        <span
          id="product-description-heading"
          className="inline-block bg-brand-orange text-white text-xs sm:text-sm font-semibold px-7 py-2.5 rounded-xs tracking-wide shadow-xs"
        >
          Description
        </span>
      </div>

      {/* Narrative Body Copy Matching Screenshot */}
      <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-4xl">
        <p>
          Symbol of lightness and delicacy, the hummingbird evokes curiosity and joy. Studio Design
          PolyFaune collection features classic products with colorful patterns, inspired by traditional
          Japanese origami. To wear with a chino or jeans. The sublimation textile printing process
          provides an exceptional color rendering and a color guaranteed over time.
        </p>

        {customDescription && (
          <p className="p-3 bg-neutral-50 rounded border-l-2 border-brand-orange text-neutral-700 italic">
            {customDescription}
          </p>
        )}

        <div className="pt-2">
          <h3 className="font-semibold text-neutral-800 text-xs sm:text-sm mb-1">
            The standard Lorem Ipsum passage, used since the 1500s
          </h3>
          <p>
            Fashion has been creating well-designed collections since 2010. The brand offers feminine
            designs delivering stylish separates and statement dresses which has since evolved into a
            full ready-to-wear collection in which every item is a vital part of a woman&apos;s wardrobe.
            The result? Cool, easy, chic looks with youthful elegance.
          </p>
        </div>

        <div className="pt-2">
          <h3 className="font-semibold text-neutral-800 text-xs sm:text-sm mb-1">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </h3>
          <p>
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their
            infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;
