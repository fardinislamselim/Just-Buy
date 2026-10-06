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
import { updateSellerService } from "@/modules/v1/seller/seller.service";

/**
 * Type
 */
import type { Request, Response } from "express";

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

    console.log(data);

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
