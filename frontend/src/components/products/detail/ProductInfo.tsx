"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";
import type { Product, ProductSize } from "@/types";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number, selectedSize: string) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export function ProductInfo({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}: ProductInfoProps) {
  const router = useRouter();

  // Size selection state
  const availableSizes: ProductSize[] =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");

  // Color selection state
  const colors = [
    { name: "Grey", hex: "#9CA3AF" },
    { name: "Navy", hex: "#1E293B" },
    { name: "Yellow", hex: "#FEF08A" },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  // Quantity stepper state
  const [quantity, setQuantity] = useState<number>(2);

  // Cart feedback states
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [internalWishlist, setInternalWishlist] = useState<boolean | null>(null);

  const effectiveWishlist = internalWishlist !== null ? internalWishlist : isWishlisted;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    const max = product.stockQuantity || 99;
    if (quantity < max) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCartClick = () => {
    setIsAddedToCart(true);

    // Update cart count in localStorage and notify navbar
    try {
      const currentCart = parseInt(localStorage.getItem("jusbuy_cart_count") || "0", 10);
      const newCount = currentCart + quantity;
      localStorage.setItem("jusbuy_cart_count", newCount.toString());
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // LocalStorage fallback
    }

    if (onAddToCart) {
      onAddToCart(product, quantity, selectedSize);
    }

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const handleBuyNowClick = () => {
    handleAddToCartClick();
    // Navigate to checkout or cart
    router.push("/cart");
  };

  const handleWishlistClick = () => {
    const nextState = !effectiveWishlist;
    setInternalWishlist(nextState);

    try {
      const savedWishlist = localStorage.getItem("jusbuy_wishlist");
      const list: string[] = savedWishlist ? JSON.parse(savedWishlist) : [];
      const prodId = String(product._id || product.id);

      let updatedList: string[];
      if (nextState) {
        updatedList = Array.from(new Set([...list, prodId]));
      } else {
        updatedList = list.filter((id) => id !== prodId);
      }
      localStorage.setItem("jusbuy_wishlist", JSON.stringify(updatedList));
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // LocalStorage fallback
    }

    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  // Render 5 stars matching screenshot
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const isFilled = index < Math.floor(rating);
      return (
        <Star
          key={index}
          className={cn(
            "w-4 h-4",
            isFilled
              ? "fill-brand-orange text-brand-orange"
              : "fill-neutral-200 text-neutral-200",
          )}
        />
      );
    });
  };

  return (
    <div className="flex flex-col space-y-4 sm:space-y-5 text-neutral-900">
      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
        {product.name}
      </h1>

      {/* Brand / Store Name */}
      <div>
        <Link
          href={`/products?search=${encodeURIComponent(product.brand || "Game Haven")}`}
          className="text-sm sm:text-base font-semibold text-brand-orange hover:underline transition-colors"
        >
          {product.brand || "Game Haven"}
        </Link>
      </div>

      {/* Ratings & Stock Availability Row */}
      <div className="flex items-center space-x-3 text-xs sm:text-sm">
        {/* Star Icons */}
        <div className="flex items-center space-x-0.5">
          {renderStars(product.rating ?? 5)}
        </div>

        {/* Reviews count */}
        <a
          href="#reviews"
          className="text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          ({product.reviewCount ?? 150} Reviews)
        </a>

        <span className="text-neutral-300">|</span>

        {/* In Stock Badge */}
        <span className="text-[#00BA63] font-medium flex items-center gap-1">
          In Stock
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline space-x-3 pt-1">
        <span className="text-2xl sm:text-3xl font-bold text-neutral-900">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-base sm:text-lg text-neutral-400 line-through font-normal">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl">
        {product.description ||
          "PlayStation 5 Controller with high quality grip with textured handles for easy hold/action for all 4 types of in-game pressure sensitive controls."}
      </p>

      {/* Horizontal Divider */}
      <hr className="border-neutral-200/90 my-2" />

      {/* Brand / Colour Swatches */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-neutral-800">
          Brand: <span className="font-semibold">{selectedColor}</span>
        </span>
        <div className="flex items-center space-x-2">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedColor(c.name)}
              className={cn(
                "w-5 h-5 rounded-full transition-all cursor-pointer relative flex items-center justify-center",
                selectedColor === c.name
                  ? "ring-2 ring-brand-orange ring-offset-2 scale-110"
                  : "hover:scale-105",
              )}
              style={{ backgroundColor: c.hex }}
              aria-label={`Select ${c.name} color`}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="flex items-center space-x-3 pt-1">
        <span className="text-sm font-medium text-neutral-800 min-w-10">Size:</span>
        <div className="flex items-center space-x-2">
          {availableSizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer",
                  isSelected
                    ? "bg-brand-orange text-white border border-brand-orange shadow-xs"
                    : "bg-white text-neutral-800 border border-neutral-300 hover:border-neutral-800",
                )}
                aria-label={`Select size ${size}`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Stepper & Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-3">
        {/* Quantity Stepper */}
        <div className="inline-flex items-center rounded-md border border-neutral-300 bg-white">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            className="p-2 sm:px-3 sm:py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-l-md transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-neutral-900 min-w-10 text-center select-none border-x border-neutral-300">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncreaseQuantity}
            className="p-2 sm:px-3 sm:py-2 bg-brand-orange text-white hover:bg-[#e04e08] rounded-r-md transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          type="button"
          onClick={handleBuyNowClick}
          className="bg-brand-orange hover:bg-[#e04e08] text-white font-medium text-sm sm:text-base px-7 sm:px-9 py-2.5 rounded-md shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          Buy Now
        </button>

        {/* Add to Cart Icon Button */}
        <button
          type="button"
          onClick={handleAddToCartClick}
          className={cn(
            "p-2.5 rounded-md border transition-all cursor-pointer flex items-center justify-center relative",
            isAddedToCart
              ? "border-emerald-600 bg-emerald-50 text-emerald-600"
              : "border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 bg-white",
          )}
          title={isAddedToCart ? "Added to Cart" : "Add to Cart"}
          aria-label="Add to cart"
        >
          {isAddedToCart ? (
            <Check className="w-5 h-5 text-emerald-600" />
          ) : (
            <ShoppingBag className="w-5 h-5" />
          )}
        </button>

        {/* Wishlist Heart Icon Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={cn(
            "p-2.5 rounded-md border transition-all cursor-pointer flex items-center justify-center",
            effectiveWishlist
              ? "border-brand-orange text-brand-orange fill-brand-orange bg-orange-50"
              : "border-neutral-300 hover:border-brand-orange text-neutral-700 hover:text-brand-orange bg-white",
          )}
          title={effectiveWishlist ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Toggle wishlist"
        >
          <Heart
            className={cn(
              "w-5 h-5",
              effectiveWishlist ? "fill-brand-orange text-brand-orange" : "",
            )}
          />
        </button>
      </div>

      {/* Assurance / Fast Delivery Perks */}
      <div className="pt-4 border-t border-neutral-200/90 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
        <div className="flex items-center space-x-2.5 p-2.5 rounded-md bg-neutral-50 border border-neutral-100">
          <Truck className="w-4 h-4 text-brand-orange shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 block">Free Delivery</span>
            <span>Enter your postal code for Delivery Availability</span>
          </div>
        </div>
        <div className="flex items-center space-x-2.5 p-2.5 rounded-md bg-neutral-50 border border-neutral-100">
          <RotateCcw className="w-4 h-4 text-brand-orange shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 block">Return Delivery</span>
            <span>Free 30 Days Delivery Returns. Details</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
