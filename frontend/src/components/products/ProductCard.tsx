"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
  alwaysShowAddToCart?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted: externalWishlisted,
  alwaysShowAddToCart = false,
  className,
}: ProductCardProps) {
  const [internalWishlist, setInternalWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = externalWishlisted !== undefined ? externalWishlisted : internalWishlist;
  const productId = String(product._id || product.id || "volcom-mens-crisp-stone");
  const productHref = `/products/${productId}`;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInternalWishlist(!isFavorited);
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Render 5 stars based on rating number
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const isFilled = index < Math.floor(rating);
      const isHalf = !isFilled && index < rating;
      return (
        <Star
          key={index}
          className={cn(
            "w-3.5 h-3.5 sm:w-4 sm:h-4",
            isFilled
              ? "fill-brand-secondary text-brand-secondary"
              : isHalf
              ? "fill-brand-secondary/60 text-brand-secondary"
              : "fill-neutral-200 text-neutral-300",
          )}
        />
      );
    });
  };

  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-lg transition-all duration-200",
        className,
      )}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full rounded-md bg-brand-bg flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Optional "NEW" or Discount Badge (Top Left) */}
        {product.isNew && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#00D084] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-sm shadow-2xs">
            NEW
          </span>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition-transform active:scale-90 hover:scale-105"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isFavorited
                ? "fill-brand-orange text-brand-orange"
                : "text-neutral-600 hover:text-brand-orange",
            )}
          />
        </button>

        {/* Product Image Link */}
        <Link
          href={productHref}
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        >
          <Image
            src={
              product.image ||
              (product.images && product.images.length > 0
                ? product.images[0].url
                : "/images/placeholder.png")
            }
            alt={product.name}
            width={240}
            height={240}
            className="max-h-full max-w-full object-contain"
            priority={false}
            unoptimized
          />
        </Link>

        {/* Add to Cart Bar / Button */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 transition-all duration-200 z-10",
            alwaysShowAddToCart
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
          )}
        >
          <button
            type="button"
            onClick={handleAddToCart}
            className={cn(
              "w-full py-2.5 px-3 text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
              isAdded
                ? "bg-emerald-600"
                : "bg-brand-orange hover:bg-[#e04e08]",
            )}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add To Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Area Below Image */}
      <div className="pt-3 flex flex-col space-y-1">
        {/* Product Name */}
        <Link href={productHref} className="block">
          <h3
            title={product.name}
            className="text-sm sm:text-base font-semibold text-neutral-900 truncate group-hover:text-brand-orange transition-colors"
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-sm sm:text-base font-semibold text-brand-orange">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-neutral-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Star Rating & Review Count */}
        <div className="flex items-center space-x-1.5 pt-0.5">
          <div className="flex items-center">
            {renderStars(product.rating ?? 5)}
          </div>
          <span className="text-xs font-medium text-neutral-500">
            ({product.reviewCount ?? 0})
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
