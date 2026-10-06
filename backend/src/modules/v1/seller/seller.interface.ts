/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import type { Types } from "mongoose";

/**
 * Type
 */
import { Gender } from "@/modules/v1/buyer/buyer.interface";

/**
 * Seller Verification Status
 */
export enum SellerVerificationStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

/**
 * Avatar interface
 */
export interface IAvatar {
  publicId: string;
  url: string;
  width: number;
  height: number;
}

/**
 * Seller Profile
 */
export interface ISeller {
  user: Types.ObjectId;
  storeName: string;
  phoneNumber: string;
  shopAddress: string;
  avatar: IAvatar;
  gender: Gender;
  verificationStatus: SellerVerificationStatus;
}
