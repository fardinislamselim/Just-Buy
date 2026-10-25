/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import type { Category } from "@/types";

/**
 * Static fallback categories matching the reference design.
 * Used when the category API is loading, empty, or offline.
 */
export const fallbackCategories: Category[] = [
  {
    _id: "660c1f2e8b4e2a1b9c3d4e01",
    id: "cat-1",
    name: "Woman's Fashion",
    image: {
      publicId: "categories/woman-fashion",
      url: "/images/categories/category-woman.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e02",
    id: "cat-2",
    name: "Men's Fashion",
    image: {
      publicId: "categories/mens-fashion",
      url: "/images/categories/category-man.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e03",
    id: "cat-3",
    name: "Electronics",
    image: {
      publicId: "categories/electronics",
      url: "/images/categories/category-electronics.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e04",
    id: "cat-4",
    name: "Home & Lifestyle",
    image: {
      publicId: "categories/home-lifestyle",
      url: "/images/categories/category-home.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e05",
    id: "cat-5",
    name: "Medicine",
    image: {
      publicId: "categories/medicine",
      url: "/images/categories/category-medicine.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e06",
    id: "cat-6",
    name: "Sports & Outdoor",
    image: {
      publicId: "categories/sports-outdoor",
      url: "/images/categories/category-sports.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e07",
    id: "cat-7",
    name: "Baby's & Toys",
    image: {
      publicId: "categories/babys-toys",
      url: "/images/categories/category-toys.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e08",
    id: "cat-8",
    name: "Groceries & Pets",
    image: {
      publicId: "categories/groceries-pets",
      url: "/images/categories/category-groceries.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e09",
    id: "cat-9",
    name: "Health & Beauty",
    image: {
      publicId: "categories/health-beauty",
      url: "/images/categories/category-beauty.svg",
      width: 96,
      height: 96,
    },
  },
];

/**
 * Categories showcased in the "Browse By Category" horizontal card section
 */
export const browseCategories: Category[] = [
  {
    _id: "660c1f2e8b4e2a1b9c3d4e01",
    id: "browse-1",
    name: "Woman's Fashion",
    image: {
      publicId: "categories/woman-fashion",
      url: "/images/categories/category-woman.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e02",
    id: "browse-2",
    name: "Men's Fashion",
    image: {
      publicId: "categories/mens-fashion",
      url: "/images/categories/category-man.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e03",
    id: "browse-3",
    name: "Electronics",
    image: {
      publicId: "categories/electronics",
      url: "/images/categories/category-electronics.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e06",
    id: "browse-4",
    name: "Sports & Outdoor",
    image: {
      publicId: "categories/sports-outdoor",
      url: "/images/categories/category-sports.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e07",
    id: "browse-5",
    name: "Baby's & Toys",
    image: {
      publicId: "categories/babys-toys",
      url: "/images/categories/category-toys.svg",
      width: 96,
      height: 96,
    },
  },
  {
    _id: "660c1f2e8b4e2a1b9c3d4e04",
    id: "browse-6",
    name: "Home & Lifestyle",
    image: {
      publicId: "categories/home-lifestyle",
      url: "/images/categories/category-home.svg",
      width: 96,
      height: 96,
    },
  },
];
