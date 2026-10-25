"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductDescription } from "./ProductDescription";
import { ProductReviews } from "./ProductReviews";
import { RelatedProducts } from "./RelatedProducts";
import type { Product } from "@/types";
import { volcomProduct, allProducts } from "@/data/products";

function subscribeWishlist(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cart_updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cart_updated", callback);
  };
}

function getWishlistSnapshot(): string {
  try {
    return localStorage.getItem("jusbuy_wishlist") || "[]";
  } catch {
    return "[]";
  }
}

function getServerWishlistSnapshot(): string {
  return "[]";
}

interface ProductDetailViewProps {
  initialProduct?: Product | null;
}

export function ProductDetailView({ initialProduct }: ProductDetailViewProps) {
  // Use provided product or fallback to the screenshot hero product
  const product = initialProduct || volcomProduct;

  // Subscribe to wishlist store safely without cascading renders or hydration mismatch
  const wishlistRaw = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getServerWishlistSnapshot,
  );

  const isWishlisted = useMemo(() => {
    try {
      const list: string[] = JSON.parse(wishlistRaw);
      const prodId = String(product._id || product.id);
      return Array.isArray(list) && list.includes(prodId);
    } catch {
      return false;
    }
  }, [wishlistRaw, product]);

  // Gallery images array
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [{ publicId: "main", url: product.image }]
      : volcomProduct.images || [];

  // Related items - find items in same category or fallback to curated relatedProducts
  const relatedList = allProducts
    .filter((p) => String(p._id || p.id) !== String(product._id || product.id))
    .slice(0, 4);

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-400 mb-8 sm:mb-12"
      >
        <Link href="/" className="hover:text-neutral-900 transition-colors">
          Account
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category || "Men's Fashion")}`}
          className="hover:text-neutral-900 transition-colors"
        >
          {product.category || "Men's Fashion"}
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-50 sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Top Section: Image Gallery + Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 sm:mb-16">
        {/* Left: Image Gallery (Thumbnails + Main Image) */}
        <div className="lg:col-span-7">
          <ProductImageGallery
            images={galleryImages}
            productName={product.name}
          />
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-5">
          <ProductInfo
            product={product}
            isWishlisted={isWishlisted}
          />
        </div>
      </div>

      {/* Narrative Description Section */}
      <ProductDescription customDescription={product.description} />

      {/* Ratings & Customer Reviews Section */}
      <ProductReviews />

      {/* Related Items Section */}
      <RelatedProducts products={relatedList} />
    </div>
  );
}

export default ProductDetailView;
