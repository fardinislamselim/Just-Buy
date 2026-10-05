/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Admin Interface
 */

/**
 * Third-Party Modules
 */
import type { Types } from "mongoose";

/**
 * Admin Profile
 */
export interface IAdminProfile {
  _id?: Types.ObjectId;

  user_id: Types.ObjectId;

  created_at?: Date;
  updated_at?: Date;
}
