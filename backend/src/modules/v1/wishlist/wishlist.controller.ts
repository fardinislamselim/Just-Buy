/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-party Modules
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
import { addWishlistService } from "@/modules/v1/wishlist/wishlist.service";

/**
 * Type
 */
import type { Request, Response } from "express";
/**
 * Add Product to Wishlist Controller
 */
export const addWishlistController = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const buyerId = req.userId!;

    await addWishlistService({
      buyerId,
      productId: productId as unknown as Types.ObjectId,
    });

    logger.info("Wishlist item added", {
      buyerId,
      productId,
    });

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.WISHLIST_ITEM_ADDED,
    });
  },
);
