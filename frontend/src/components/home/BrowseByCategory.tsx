"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { browseCategories } from "@/data/categories";
import { SectionHeading } from "./SectionHeading";

export function BrowseByCategory() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 sm:py-14 border-t border-neutral-100" aria-label="Browse By Category">
      {/* Section Header with Left/Right Navigation controls */}
      <SectionHeading
        badge="Categories"
        title="Browse By Category"
        showNavigation={true}
        onPrev={scrollLeft}
        onNext={scrollRight}
      />

      {/* Horizontal Category Cards Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {browseCategories.map((category) => {
          const imageSrc =
            typeof category.image === "string"
              ? category.image
              : category.image?.url || "/images/categories/category-woman.svg";

          return (
            <Link
              key={category._id || category.id || category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group flex-shrink-0 w-[140px] sm:w-[175px] lg:w-[195px] flex flex-col items-center justify-center p-4 sm:p-6 bg-[#F5F6F8] rounded-lg border border-neutral-200/50 hover:border-[#FF5A0A] hover:bg-white hover:shadow-md transition-all duration-200"
            >
              {/* Category Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <Image
                  src={imageSrc}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Category Title */}
              <span className="text-xs sm:text-sm font-medium text-neutral-800 text-center group-hover:text-[#FF5A0A] transition-colors line-clamp-1">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BrowseByCategory;
