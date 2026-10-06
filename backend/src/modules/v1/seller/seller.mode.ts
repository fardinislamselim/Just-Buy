/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Seller Model
 */

/**
 * Third-Party Modules
 */
import { Schema, model } from "mongoose";

/**
 * Application Modules
 */
import {
    SellerVerificationStatus,
  type ISellerProfile,
} from "./seller.interface";

/**
 * Seller Profile Schema
 */
const sellerProfileSchema = new Schema<ISellerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    store_name: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
      maxlength: 150,
    },

    shop_address: {
      type: String,
      trim: true,
    },

    verification_status: {
      type: String,
      enum: Object.values(SellerVerificationStatus),
      default: SellerVerificationStatus.PENDING,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

/**
 * Models
 */
export const SellerProfile = model<ISellerProfile>(
  "SellerProfile",
  sellerProfileSchema,
);
