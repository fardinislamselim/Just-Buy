/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Buyer Interface
 */

/**
 * Third-Party Modules
 */
import type { Types } from "mongoose";

/**
 * Buyer Profile
 */
export interface IBuyerProfile {
  user: Types.ObjectId;
  shipping_address?: string;
  created_at?: Date;
  updated_at?: Date;
}
