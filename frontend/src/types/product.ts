/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

export interface ProductImage {
  publicId?: string;
  url: string;
  width?: number | null;
  height?: number | null;
}

export interface ProductSeller {
  _id?: string;
  fullName: string;
  email: string;
  role?: "seller" | "admin";
}

export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  description: string;
  category: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  stockQuantity?: number;
  sizes?: ProductSize[];
  images?: ProductImage[];
  image?: string;
  seller?: ProductSeller;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  discountPercent?: number;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
