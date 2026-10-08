/**
 * @copyright 2026
 * @author MD Rohanul Hauqe Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Application Modules
 */
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { API_MESSAGES, ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Models
 */
import User from "@/modules/v1/auth/auth.model";
import Buyer from "@/modules/v1/buyer/buyer.model";

/**
 * Types
 */
import type {
  IBuyerProfile,
  IUpdateBuyerRequest,
} from "@/modules/v1/buyer/buyer.interface";
import type { ISellerId } from "../seller/seller.interface";

/**
 * Service for get buyer profile by ID
 * @param userId - Buyer user ID
 * @returns {Promise<IBuyerProfile>}
 */
export const getBuyerProfileByIdService = async ({
  userId,
}: ISellerId): Promise<IBuyerProfile> => {
  // Find buyer profile
  const buyer = await Buyer.findOne({ user: userId })
    .populate("user", "fullName email role isActive")
    .lean()
    .exec();

  // Check if buyer profile found
  if (!buyer) {
    logger.warn(API_MESSAGES.BUYER_PROFILE_NOT_FOUND, {
      userId,
    });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.BUYER_PROFILE_NOT_FOUND,
      API_MESSAGES.BUYER_PROFILE_NOT_FOUND,
    );
  }

  return buyer;
};

/**
 * Service for update buyer profile
 * @param userId - Buyer user ID
 * @param payload - Buyer profile data
 * @param file - Buyer profile picture
 * @returns {Promise<void>}
 */
export const updateBuyerProfileService = async ({
  userId,
  payload,
  file,
}: IUpdateBuyerRequest): Promise<void> => {
  const { fullName, gender, password, phoneNumber } = payload;

  const [user, buyer] = await Promise.all([
    User.findById(userId),
    Buyer.findOne({ user: userId }),
  ]);

  if (!user) {
    logger.warn(API_MESSAGES.USER_NOT_FOUND, { userId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.USER_NOT_FOUND,
      API_MESSAGES.USER_NOT_FOUND,
    );
  }

  if (!buyer) {
    logger.warn(API_MESSAGES.BUYER_PROFILE_NOT_FOUND, { userId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.BUYER_PROFILE_NOT_FOUND,
      API_MESSAGES.BUYER_PROFILE_NOT_FOUND,
    );
  }

  if (fullName) {
    user.fullName = fullName.trim();
  }

  if (password) {
    user.password = password;
  }

  if (gender) {
    buyer.gender = gender;
  }

  if (phoneNumber) {
    buyer.phoneNumber = phoneNumber;
  }

  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      throw new AppError(
        HTTP_STATUS.PAYLOAD_TOO_LARGE,
        ERROR_CODE.FILE_TOO_LARGE,
        API_MESSAGES.FILE_TOO_LARGE,
      );
    }

    if (buyer.avatar?.publicId) {
      await deleteFromCloudinary(buyer.avatar.publicId);
    }

    const cloudinaryData = await uploadToCloudinary(
      file.buffer,
      "Just-Buy-API",
    );

    buyer.avatar = {
      publicId: cloudinaryData.public_id,
      url: cloudinaryData.secure_url,
      height: cloudinaryData.height,
      width: cloudinaryData.width,
    };
  }

  await Promise.all([user.save(), buyer.save()]);
};

/**
 * Service for delete buyer profile
 * @param userId - Buyer user ID
 * @returns {Promise<void>}
 */
export const deleteBuyerProfileService = async ({
  userId,
}: ISellerId): Promise<void> => {
  // Find user and buyer profile
  const [user, buyer] = await Promise.all([
    User.findById(userId).exec(),
    Buyer.findOne({ user: userId }).exec(),
  ]);

  // Check if user found
  if (!user) {
    logger.warn(API_MESSAGES.USER_NOT_FOUND, { userId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.USER_NOT_FOUND,
      API_MESSAGES.USER_NOT_FOUND,
    );
  }

  // Check if buyer profile found
  if (!buyer) {
    logger.warn(API_MESSAGES.BUYER_PROFILE_NOT_FOUND, { userId });

    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.BUYER_PROFILE_NOT_FOUND,
      API_MESSAGES.BUYER_PROFILE_NOT_FOUND,
    );
  }

  // Delete user and buyer profile
  await Promise.all([user.deleteOne(), buyer.deleteOne()]);
};
