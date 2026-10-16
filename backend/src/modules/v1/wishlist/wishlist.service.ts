/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import Product from "@/modules/v1/product/product.model";
import Wishlist from "@/modules/v1/wishlist/wishlist.model";
import AppError from "@/utils/appError";
import { API_MESSAGES, ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Type
 */
import type {
  BuyerId,
  IAddWishlistRequest,
  IWishlistResponse,
} from "@/modules/v1/wishlist/wishlist.interface";

/**
 * Add Product to Wishlist
 */
export const addWishlistService = async ({
  buyerId,
  productId,
}: IAddWishlistRequest): Promise<void> => {
  //Check whether the product exists
  const productExists = await Product.exists({
    _id: productId,
  });

  if (!productExists) {
    logger.warn("Product not found", { productId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.PRODUCT_NOT_FOUND,
      API_MESSAGES.PRODUCT_NOT_FOUND,
    );
  }

  // heck whether the product is already wishlisted
  const isWished = await Wishlist.exists({
    buyer: buyerId,
    products: productId,
  });

  if (isWished) {
    logger.warn("Product already exists in wishlist", {
      buyerId,
      productId,
    });

    throw new AppError(
      HTTP_STATUS.CONFLICT,
      ERROR_CODE.PRODUCT_ALREADY_WISHED,
      API_MESSAGES.PRODUCT_ALREADY_WISHED,
    );
  }

  // Add the product to the buyer's wishlist
  await Wishlist.findOneAndUpdate(
    { buyer: buyerId },
    {
      $addToSet: {
        products: productId,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );
};

/**
 * Get all wishlists service
 * @param {BuyerId} buyerId - Buyer ID
 * @returns {Promise<IWishlistResponse | null>}
 */
export const getAllWishlistsService = async (
  buyerId: BuyerId,
): Promise<IWishlistResponse | null> => {
  const wishlist = await Wishlist.findOne({
    buyer: buyerId,
  })
    .populate("products", "name images price")
    .lean()
    .exec();

  return wishlist;
};

export const removeWishlistService = async ({
  buyerId,
  productId,
}: IAddWishlistRequest): Promise<void> => {
  // heck whether the product is already wishlisted
  const isWished = await Wishlist.exists({
    buyer: buyerId,
    products: productId,
  });

  if (!isWished) {
    logger.warn("Product not found in wishlist", {
      buyerId,
      productId,
    });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.WISHLIST_NOT_FOUND,
      API_MESSAGES.WISHLIST_ITEM_NOT_FOUND,
    );
  }

  // Remove the product from the buyer's wishlist
  await Wishlist.findOneAndUpdate(
    { buyer: buyerId },
    {
      $pull: {
        products: productId,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};
