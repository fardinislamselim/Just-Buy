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
import { ProductsView } from "@/components/products/ProductsView";

export const metadata: Metadata = {
  title: "New Arrival & Products - Jus Buy",
  description:
    "Explore our latest arrivals, electronics, fashion, and lifestyle products with unbeatable deals.",
};

/**
 * Server Component for Products Page
 * Contains no "use client" directive and renders modular client components.
 */
export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <Container>
          {/* Client-side interactive products view with filters, search, and pagination */}
          <ProductsView />
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
