/**
 * @copyright 2026
 * @author MD Rohanul Hauqe Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import { Types } from "mongoose";

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import asyncHandler from "@/utils/asyncHandler";
import { API_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Services
 */
import {
  deleteBuyerProfileService,
  getBuyerProfileByIdService,
  updateBuyerProfileService,
} from "@/modules/v1/buyer/buyer.service";

/**
 * Type
 */
import type { Request, Response } from "express";

/**
 * Controller for get current buyer profile
 */
export const getCurrentBuyerProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    // Call get buyer profile by ID service
    const result = await getBuyerProfileByIdService({
      userId: req.userId!,
    });

    // Log success
    logger.info("Buyer profile fetched successfully");

    // Send success response
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      data: result,
    });
  },
);

/**
 * Controller for get buyer profile by ID
 */
export const getBuyerProfileByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    // Get buyer user ID from params
    const { userId } = req.params;

    // Call get buyer profile by ID service
    const result = await getBuyerProfileByIdService({
      userId: userId as unknown as Types.ObjectId,
    });

    // Log success
    logger.info("Buyer profile fetched successfully");

    // Send success response
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      data: result,
    });
  },
);

/**
 * Controller for update buyer profile
 */
export const updateBuyerProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    // Call update buyer profile service
    await updateBuyerProfileService({
      userId: req.userId!,
      payload: req.body,
      file: req.file,
    });

    // Log success
    logger.info(API_MESSAGES.BUYER_PROFILE_UPDATED, {
      userId: req.userId!,
    });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: API_MESSAGES.BUYER_PROFILE_UPDATED,
    });
  },
);

/**
 * Controller for delete buyer profile
 */
export const deleteBuyerProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    // Get buyer user ID from params
    const { userId } = req.params;

    // Call delete buyer profile service
    await deleteBuyerProfileService({
      userId: userId as unknown as Types.ObjectId,
    });

    // Log success
    logger.info(API_MESSAGES.BUYER_PROFILE_DELETED, {
      userId,
    });

    // Send success response
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: API_MESSAGES.BUYER_PROFILE_DELETED,
    });
  },
);
