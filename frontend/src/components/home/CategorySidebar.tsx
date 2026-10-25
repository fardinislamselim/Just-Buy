"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fallbackCategories } from "@/data/categories";

interface CategorySidebarProps {
  onSelectCategory?: (categoryName: string) => void;
  activeCategory?: string;
}

export function CategorySidebar({
  onSelectCategory,
  activeCategory,
}: CategorySidebarProps) {
  // Use static categories matching API schema without network calls
  const categories = fallbackCategories;

  return (
    <aside
      className="hidden md:flex flex-col w-56 lg:w-64 pt-6 pb-6 pr-6 border-r border-neutral-200/80 flex-shrink-0"
      aria-label="Product Categories Sidebar"
    >
      <nav className="flex flex-col space-y-3">
        {categories && categories.length > 0 ? (
          categories.map((cat, index) => {
            const hasSubmenu = index < 2; // Woman's Fashion and Men's Fashion have chevrons in reference
            const isActive = activeCategory === cat.name;

            return (
              <Link
                key={cat._id || cat.id || index}
                href={`#category-${cat._id || cat.id || encodeURIComponent(cat.name)}`}
                onClick={(e) => {
                  if (onSelectCategory) {
                    e.preventDefault();
                    onSelectCategory(cat.name);
                  }
                }}
                className={`group flex items-center justify-between text-sm transition-colors py-1 px-1 rounded-sm ${
                  isActive
                    ? "text-[#FF5A0A] font-semibold"
                    : "text-neutral-800 hover:text-[#FF5A0A]"
                }`}
              >
                <span className="capitalize transition-transform group-hover:translate-x-1 duration-150">
                  {cat.name}
                </span>
                {hasSubmenu && (
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FF5A0A] transition-colors" />
                )}
              </Link>
            );
          })
        ) : (
          <p className="text-xs text-neutral-400">No categories found</p>
        )}
      </nav>
    </aside>
  );
}

export default CategorySidebar;
