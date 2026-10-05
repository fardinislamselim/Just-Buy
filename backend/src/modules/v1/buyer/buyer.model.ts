/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Auth Model
 */

/**
 * Third-Party Modules
 */
import { Schema, model } from "mongoose";

/**
 * Application Modules
 */
import type {
  IBuyerProfile,
} from "./buyer.interface";

/**
 * Buyer Profile Schema
 */
const buyerProfileSchema = new Schema<IBuyerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey:false,
  },
);

/**
 * Models
 */
export const BuyerProfile = model<IBuyerProfile>(
  "BuyerProfile",
  buyerProfileSchema,
);