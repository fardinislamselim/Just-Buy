/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Admin Model
 */

/**
 * Third-Party Modules
 */
import { Schema, model } from "mongoose";

/**
 * Application Modules
 */
import type {
  IAdminProfile,
} from "./admin.interface";


/**
 * Admin Profile Schema
 */
const adminProfileSchema = new Schema<IAdminProfile>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const AdminProfile = model<IAdminProfile>(
  "AdminProfile",
  adminProfileSchema,
);