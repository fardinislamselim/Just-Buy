/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Types
 */
import type { IAvatar } from "@/modules/v1/seller/seller.interface";
import type { Types } from "mongoose";

/**
 * Gender Enum
 */
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

/**
 * Buyer Interface
 */
export interface IBuyer {
  user: Types.ObjectId;
  avatar: IAvatar;
  phoneNumber: string;
  gender: Gender;
}
