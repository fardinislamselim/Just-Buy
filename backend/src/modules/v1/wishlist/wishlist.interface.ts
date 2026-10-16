/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Thired-party Modules
 */
import { Types } from "mongoose";

/**
 * Type
 */
import type { IAvatar } from "@/modules/v1/seller/seller.interface";

/**
 * Wishlist Interface Definition
 */
export interface IWishlist {
  buyer: Types.ObjectId;
  products: Types.ObjectId[];
}

export interface IAddWishlistRequest {
  buyerId: Types.ObjectId;
  productId: Types.ObjectId;
}

export type BuyerId = IWishlist["buyer"];

/**
 * Populated Product inside Wishlist
 */
export interface IWishlistProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
  images: IAvatar[];
}

/**
 * Wishlist Response with Populated Products
 */
export interface IWishlistResponse {
  _id: Types.ObjectId;
  buyer: Types.ObjectId;
  products: IWishlistProduct[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
