/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import bcrypt from "bcrypt";

/**
 * Application Modules
 */
import AppError from "@/utils/appError";
import { API_MESSAGES, ERROR_CODE, HTTP_STATUS } from "@/utils/constants";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";

/**
 * Models
 */
import { User } from "@/modules/v1/auth/auth.model";
import { BuyerProfile } from "@/modules/v1/buyer/buyer.model";
import { SellerProfile } from "@/modules/v1/seller/seller.mode";

/**
 * Types
 */
import type {
  AuthResponse,
  IRegisterRequest,
} from "@/modules/v1/auth/auth.intarface";

/**
 * Register Service
 * @param { IRegisterRequest } payload
 * @returns { Promise<AuthResponse> }
 */
const register = async (payload: IRegisterRequest): Promise<AuthResponse> => {
  // Destructure the all payload
  const { fullName, email, password, role } = payload;

  // Check existing user
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new AppError(
      HTTP_STATUS.CONFLICT,
      ERROR_CODE.AUTH_EMAIL_EXISTS,
      API_MESSAGES.EMAIL_ALREADY_EXISTS,
    );
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create User
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role,
    is_active: true,
  });

  // Create Profile based on role
  if (role === "buyer") {
    await BuyerProfile.create({
      user: user?._id,
    });
  }
  if (role === "seller") {
    await SellerProfile.create({
      user: user?._id,
    });
  }

  // Create Token
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Return the user, access & and refresh token
  return {
    user: {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const authService = {
  register,
};
