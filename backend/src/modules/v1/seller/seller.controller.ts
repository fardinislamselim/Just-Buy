/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import asyncHandler from "@/utils/asyncHandler";
import { API_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Service
 */
import {
  deleteControllerSellerService,
  getAllSellerProfileService,
  getCurrentSellerProfileService,
  getSellerProfileByIdService,
  updateSellerService,
} from "@/modules/v1/seller/seller.service";

/**
 * Type
 */
import config from "@/config";
import { SellerVerificationStatus } from "@/modules/v1/seller/seller.interface";
import type { Request, Response } from "express";
import { Types } from "mongoose";

/**
 * Controller for seller update
 */
export const updateSellerController = asyncHandler(
  async (req: Request, res: Response) => {
    // Call update seller service
    const data = await updateSellerService({
      userId: req.userId!,
      payload: req.body,
      file: req.file,
    });

    // Log the success message
    logger.info(API_MESSAGES.SELLER_PROFILE_UPDATED);

    // Send success response
    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.SELLER_PROFILE_UPDATED,
    });
  },
);

export const getCurrentSellerProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getCurrentSellerProfileService({
      userId: req.userId!,
    });

    logger.info("Seller Profile Get Successfully");

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      data: result,
    });
  },
);

export const deleteSellerProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    await deleteControllerSellerService({
      userId: userId as unknown as Types.ObjectId,
    });

    sendResponse(res, {
      statusCode: HTTP_STATUS.NO_CONTENT,
      success: true,
      message: API_MESSAGES.SELLER_PROFILE_DELETED,
    });
  },
);

export const getSellerProfileByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await getSellerProfileByIdService({
      userId: userId as unknown as Types.ObjectId,
    });

    logger.info("Seller profile fetched successfully");

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      data: result,
    });
  },
);

export const getAllSellerProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const limit =
      parseInt(req.query.limit as string, 15) || config.DEFAULT_LIMIT;

    const offset =
      parseInt(req.query.offset as string, 15) || config.DEFAULT_OFFSET;

    const verificationStatus = req.query
      .verificationStatus as SellerVerificationStatus;

    const result = await getAllSellerProfileService({
      limit,
      offset,
      verificationStatus: verificationStatus || undefined,
    });

    logger.info("Seller profiles fetched successfully");

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      data: result.allSellers,
      total: result.total,
      skip: result.skip,
      limit: result.limit,
    });
  },
);
