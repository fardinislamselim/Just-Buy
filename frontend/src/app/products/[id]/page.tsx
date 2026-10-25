/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ProductDetailView } from "@/components/products/detail/ProductDetailView";
import { allProducts, volcomProduct } from "@/data/products";
import { productService } from "@/services/product.service";
import type { Product } from "@/types";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Helper to retrieve product data with fallback
 */
async function getProduct(id: string): Promise<Product> {
  // 1. Try finding in local catalog first for instant response
  const decodedId = decodeURIComponent(id).toLowerCase();
  const foundLocal = allProducts.find(
    (p) =>
      String(p._id).toLowerCase() === decodedId ||
      String(p.id).toLowerCase() === decodedId ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === decodedId,
  );

  if (foundLocal) {
    return foundLocal;
  }

  // 2. Try fetching from backend API if online
  try {
    const apiProduct = await productService.getProductById(id);
    if (apiProduct) {
      return apiProduct;
    }
  } catch {
    // API offline, fallback to hero product
  }

  // 3. Fallback to default Volcom product
  return volcomProduct;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: `${product.name} | Jus Buy`,
    description: product.description || "Discover premium products with unbeatable deals on Jus Buy.",
    openGraph: {
      title: `${product.name} | Jus Buy`,
      description: product.description,
      images: [
        {
          url: product.image || "/images/products/the-north-coat.svg",
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 py-6 sm:py-10">
        <Container>
          <ProductDetailView initialProduct={product} />
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
