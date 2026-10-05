/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 * @description JWT Utilities
 */

/**
 * Third-Party Module
 */
import jwt, { type JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Application Module
 */
import config from "@/config";


/**
 * Type
 */

/**
 * JWT Payload
 */
export interface IJwtPayload extends JwtPayload {
  userId: mongoose.Types.ObjectId;
}

/**
 * Generate User Access Token
 */
export const generateAccessToken = (
  userId: mongoose.Types.ObjectId,
): string => {
  return jwt.sign(
    { userId },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRY,
      subject: "accessToken",
    },
  );
};

/**
 * Generate User Refresh Token
 */
export const generateRefreshToken = (
  userId: mongoose.Types.ObjectId,
): string => {
  return jwt.sign(
    { userId },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRY,
      subject: "refreshToken",
    },
  );
};

/**
 * Verify User Access Token
 */
export const verifyAccessToken = (
  token: string,
): IJwtPayload => {
  return jwt.verify(
    token,
    config.JWT_ACCESS_SECRET,
  ) as IJwtPayload;
};

/**
 * Verify User Refresh Token
 */
export const verifyRefreshToken = (
  token: string,
): IJwtPayload => {
  return jwt.verify(
    token,
    config.JWT_REFRESH_SECRET,
  ) as IJwtPayload;
};