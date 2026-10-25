/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CategorySidebar } from "@/components/home/CategorySidebar";
import { HeroSlider } from "@/components/home/HeroSlider";
import { BrowseByCategory } from "@/components/home/BrowseByCategory";
import { NewArrivals } from "@/components/home/NewArrivals";
import { ExploreProducts } from "@/components/home/ExploreProducts";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        <Container>
          {/* Hero Section: Category Sidebar + Hero Slider */}
          <section className="flex flex-col md:flex-row items-stretch md:space-x-8 mb-6 sm:mb-10">
            <CategorySidebar />
            <HeroSlider />
          </section>

          {/* Browse By Category Section */}
          <BrowseByCategory />

          {/* New Arrival Section (4 Products) */}
          <NewArrivals />

          {/* Explore Our Products Section (8 Products, 4x2 Grid) */}
          <ExploreProducts />
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
