/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Auth Controller
 */

/**
 * Third-Party Modules
 */
import { Request, Response } from "express";

/**
 * Application Modules
 */
import config from "@/config";
import { logger } from "@/lib/winston";
import { API_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";
import { authService } from "./auth.service";

/**
 * Register Controller
 * @param {Request} req
 * @param {Response} res
 */
const register = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.register(body);

  // Log the user signup
  logger.info("User Signup Successfully", {
    user: {
      fullName: result.user.fullName,
      email: result.user.email,
      role: result.user.role,
    },
  });

  // Set access token in cookie
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  // Set refresh token in cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  sendResponse(res, {
    statusCode: HTTP_STATUS.CREATED,
    success: true,
    message: `${result.user.role === "seller" ? API_MESSAGES.SELLER_PROFILE_CREATED : API_MESSAGES.BUYER_PROFILE_CREATED} `,
    data: {
      user: {
        fullName: result.user.fullName,
        email: result.user.email,
        role: result.user.role,
      },
    },
  });
};

/**
 * Login Controller
 * @param {Request} req
 * @param {Response} res
 */
const login = async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.login(body);

  // Log the user login
  logger.info("User Login Successfully", {
    user: {
      fullName: result.user.fullName,
      email: result.user.email,
      role: result.user.role,
    },
  });

  // Set access token in cookie
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  // Set refresh token in cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV !== "development",
    sameSite: config.NODE_ENV === "development" ? "lax" : "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  sendResponse(res, {
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: `${result.user.role === "seller" ? API_MESSAGES.SELLER_LOGIN_SUCCESS : API_MESSAGES.BUYER_LOGIN_SUCCESS} `,
    data: {
      user: {
        fullName: result.user.fullName,
        email: result.user.email,
        role: result.user.role,
      },
    },
  });
};

export const authController = {
  register,
  login,
};
