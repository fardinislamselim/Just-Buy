/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

export interface CategoryImage {
  publicId?: string;
  url: string;
  width?: number | null;
  height?: number | null;
}

export interface Category {
  _id?: string;
  id?: string;
  name: string;
  image?: CategoryImage | string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  itemCount?: number;
  icon?: string;
}
