"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  // Ensure we have at least 1 image
  const displayImages = images && images.length > 0 
    ? images 
    : [{ url: "/images/products/the-north-coat.svg", publicId: "default" }];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 items-start w-full">
      {/* Thumbnails (Vertical on SM+ screens, Horizontal on mobile) */}
      <div className="flex sm:flex-col gap-3 w-full sm:w-28 sm:shrink-0 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none">
        {displayImages.map((img, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={img.publicId || idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative w-20 h-24 sm:w-full sm:h-28 rounded-md bg-[#F5F5F5] flex items-center justify-center p-2 shrink-0 cursor-pointer transition-all duration-200 overflow-hidden",
                isSelected
                  ? "border-2 border-neutral-900 shadow-xs"
                  : "border border-neutral-200/80 hover:border-neutral-400 opacity-80 hover:opacity-100",
              )}
              aria-label={`View image ${idx + 1} of ${productName}`}
            >
              <Image
                src={img.url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 80px, 112px"
                className="object-contain p-1"
                priority={idx === 0}
                unoptimized
              />
            </button>
          );
        })}
      </div>

      {/* Main Large Image Display */}
      <div className="relative flex-1 w-full aspect-square sm:aspect-4/5 bg-[#F5F5F5] rounded-md flex items-center justify-center p-6 sm:p-10 overflow-hidden border border-neutral-100">
        <div className="relative w-full h-full flex items-center justify-center transition-all duration-300">
          <Image
            src={activeImage.url}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 550px"
            className="object-contain transition-transform duration-300 hover:scale-105"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

export default ProductImageGallery;
