/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import { Schema, model, models } from "mongoose";

/**
 * Application Modules
 */
import type { IUser } from "@/modules/v1/auth/auth.intarface";
import { UserRole } from "@/modules/v1/auth/auth.intarface";

/**
 * User Schema
 */
const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 255,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.BUYER,
      required: true,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/**
 * Model
 */
export const User = models.User || model<IUser>("User", userSchema);
