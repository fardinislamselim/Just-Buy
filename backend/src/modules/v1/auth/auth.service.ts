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
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt";

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
  ILoginRequest,
  IRegisterRequest,
} from "@/modules/v1/auth/auth.intarface";
import type { Request } from "express";

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

/**
 * Login Service
 * @param { ILoginRequest } payload
 * @returns { Promise<AuthResponse> }
 */
const login = async (payload: ILoginRequest): Promise<AuthResponse> => {
  // Destructure the all payload
  const { email, password } = payload;

  // Check existing user
  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.AUTH_ACCOUNT_NOT_FOUND,
      API_MESSAGES.ACCOUNT_NOT_FOUND,
    );
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser?.password,
  );

  if (!isPasswordValid) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODE.AUTH_INVALID_CREDENTIALS,
      API_MESSAGES.INVALID_CREDENTIALS,
    );
  }

  // Create Token
  const accessToken = generateAccessToken(existingUser._id);
  const refreshToken = generateRefreshToken(existingUser._id);

  // Return the user, access & and refresh token
  return {
    user: {
      fullName: existingUser.fullName,
      email: existingUser.email,
      role: existingUser.role,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh Token Service
 * @param { string } payload
 * @returns { Promise<AuthResponse> }
 */
const refreshToken = async (req: Request): Promise<AuthResponse> => {
  const refreshToken = req.cookies.refreshToken;

 

  if (!refreshToken) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODE.AUTH_REFRESH_TOKEN_MISSING,
      API_MESSAGES.REFRESH_TOKEN_MISSING,
    );
  }

  const decoded = verifyRefreshToken(refreshToken);

   console.log("this is from service", decoded);

  if (!decoded) {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODE.AUTH_REFRESH_TOKEN_INVALID,
      API_MESSAGES.REFRESH_TOKEN_INVALID,
    );
  }

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.AUTH_ACCOUNT_NOT_FOUND,
      API_MESSAGES.ACCOUNT_NOT_FOUND,
    );
  }

  const accessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  return {
    user: {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const authService = {
  register,
  login,
  refreshToken,
};
