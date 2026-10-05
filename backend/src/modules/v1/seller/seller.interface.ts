/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Seller Interface
 */


/**
 * Third-Party Modules
 */
import type { Types } from "mongoose";

/**
 * Seller Verification Status
 */
export enum SellerVerificationStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}


/**
 * Seller Profile
 */
export interface ISellerProfile {
  user: Types.ObjectId;
  store_name: string;
  shop_address?: string;
  verification_status: SellerVerificationStatus;
}

