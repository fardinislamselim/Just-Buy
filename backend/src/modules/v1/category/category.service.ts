/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import { Types } from "mongoose";

/**
 * Application Modules
 */
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { logger } from "@/lib/winston";
import AppError from "@/utils/appError";
import { API_MESSAGES, ERROR_CODE, HTTP_STATUS } from "@/utils/constants";

/**
 * Model
 */
import Category from "@/modules/v1/category/category.model";

/**
 * Types
 */
import type {
  ICategory,
  ICreateCategoryRequest,
  IGetCategoriesQuery,
  IGetCategoriesResult,
  IUpdateCategoryRequest,
} from "@/modules/v1/category/category.interface";

/**
 * Create Category Service
 * @param {ICreateCategoryRequest} params - user ID, payload and optional file
 * @returns {Promise<ICategory>} Created category document
 */
export const createCategoryService = async ({
  userId,
  payload,
  file,
}: ICreateCategoryRequest): Promise<ICategory> => {
  const trimmedName = payload.name.trim();

  // Check if category with the same name already exists
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
  });

  if (existingCategory) {
    logger.warn(API_MESSAGES.CATEGORY_ALREADY_EXISTS, { name: trimmedName });
    throw new AppError(
      HTTP_STATUS.CONFLICT,
      ERROR_CODE.CATEGORY_ALREADY_EXISTS,
      API_MESSAGES.CATEGORY_ALREADY_EXISTS,
    );
  }

  // Generate unique slug
  let baseSlug = payload.slug
    ? payload.slug.trim().toLowerCase()
    : trimmedName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
  if (!baseSlug) {
    baseSlug = `category-${Date.now()}`;
  }

  let slug = baseSlug;
  let counter = 1;
  while (await Category.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  // Handle image upload if provided
  let image = {
    publicId: "",
    url: "",
    width: null as number | null,
    height: null as number | null,
  };

  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      throw new AppError(
        HTTP_STATUS.PAYLOAD_TOO_LARGE,
        ERROR_CODE.FILE_TOO_LARGE,
        API_MESSAGES.FILE_TOO_LARGE,
      );
    }

    const cloudinaryData = await uploadToCloudinary(
      file.buffer,
      "Just-Buy-API/categories",
    );

    image = {
      publicId: cloudinaryData.public_id,
      url: cloudinaryData.secure_url,
      width: cloudinaryData.width ?? null,
      height: cloudinaryData.height ?? null,
    };
  }

  // Create new category document
  const category = await Category.create({
    name: trimmedName,
    slug,
    description: payload.description ? payload.description.trim() : "",
    image,
    isActive: payload.isActive !== undefined ? payload.isActive : true,
    createdBy: userId,
  });

  return category;
};

/**
 * Get All Categories Service
 * @param {IGetCategoriesQuery} query - Filtering, pagination and sorting options
 * @returns {Promise<IGetCategoriesResult>} Paginated category results
 */
export const getAllCategoriesService = async (
  query: IGetCategoriesQuery,
): Promise<IGetCategoriesResult> => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};

  if (query.search) {
    const searchRegex = new RegExp(query.search.trim(), "i");
    filter.$or = [{ name: searchRegex }, { description: searchRegex }];
  }

  if (query.isActive !== undefined) {
    filter.isActive = query.isActive;
  }

  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  const [categories, total] = await Promise.all([
    Category.find(filter)
      .populate("createdBy", "fullName email role")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(),
    Category.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    categories: categories as unknown as ICategory[],
    total,
    page,
    limit,
    totalPages,
    skip,
  };
};

/**
 * Get Category By ID Service
 * @param {string} categoryId - Category ObjectId string
 * @returns {Promise<ICategory>} Category document
 */
export const getCategoryByIdService = async (
  categoryId: string,
): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Invalid category ID",
    );
  }

  const category = await Category.findById(categoryId).populate(
    "createdBy",
    "fullName email role",
  );

  if (!category) {
    logger.warn(API_MESSAGES.CATEGORY_NOT_FOUND, { categoryId });
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.CATEGORY_NOT_FOUND,
      API_MESSAGES.CATEGORY_NOT_FOUND,
    );
  }

  return category;
};

/**
 * Get Category By Slug Service
 * @param {string} slug - Category slug string
 * @returns {Promise<ICategory>} Category document
 */
export const getCategoryBySlugService = async (
  slug: string,
): Promise<ICategory> => {
  const formattedSlug = slug.toLowerCase().trim();

  const category = await Category.findOne({ slug: formattedSlug }).populate(
    "createdBy",
    "fullName email role",
  );

  if (!category) {
    logger.warn(API_MESSAGES.CATEGORY_NOT_FOUND, { slug: formattedSlug });
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.CATEGORY_NOT_FOUND,
      API_MESSAGES.CATEGORY_NOT_FOUND,
    );
  }

  return category;
};

/**
 * Update Category Service
 * @param {IUpdateCategoryRequest} params - category ID, payload and optional file
 * @returns {Promise<ICategory>} Updated category document
 */
export const updateCategoryService = async ({
  categoryId,
  payload,
  file,
}: IUpdateCategoryRequest): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Invalid category ID",
    );
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    logger.warn(API_MESSAGES.CATEGORY_NOT_FOUND, { categoryId });
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.CATEGORY_NOT_FOUND,
      API_MESSAGES.CATEGORY_NOT_FOUND,
    );
  }

  // If category name is updated
  if (payload.name && payload.name.trim() !== category.name) {
    const trimmedName = payload.name.trim();

    // Check duplicate name on other categories
    const duplicate = await Category.findOne({
      _id: { $ne: category._id },
      name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
    });

    if (duplicate) {
      logger.warn(API_MESSAGES.CATEGORY_ALREADY_EXISTS, { name: trimmedName });
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        ERROR_CODE.CATEGORY_ALREADY_EXISTS,
        API_MESSAGES.CATEGORY_ALREADY_EXISTS,
      );
    }

    category.name = trimmedName;

    // Automatically update slug if new slug not explicitly provided
    if (!payload.slug) {
      const baseSlug =
        trimmedName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "") || `category-${Date.now()}`;
      let newSlug = baseSlug;
      let counter = 1;

      while (
        await Category.exists({ _id: { $ne: category._id }, slug: newSlug })
      ) {
        newSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      category.slug = newSlug;
    }
  }

  // If custom slug is updated
  if (payload.slug) {
    const customSlug = payload.slug.trim().toLowerCase();
    const duplicateSlug = await Category.findOne({
      _id: { $ne: category._id },
      slug: customSlug,
    });

    if (duplicateSlug) {
      logger.warn("Category slug already in use", { slug: customSlug });
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        ERROR_CODE.CATEGORY_ALREADY_EXISTS,
        "Category slug already in use",
      );
    }

    category.slug = customSlug;
  }

  // Update description if provided
  if (payload.description !== undefined) {
    category.description = payload.description.trim();
  }

  // Update isActive if provided
  if (payload.isActive !== undefined) {
    category.isActive = payload.isActive;
  }

  // Handle new image file upload
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      throw new AppError(
        HTTP_STATUS.PAYLOAD_TOO_LARGE,
        ERROR_CODE.FILE_TOO_LARGE,
        API_MESSAGES.FILE_TOO_LARGE,
      );
    }

    // Delete old image from Cloudinary if it exists
    if (category.image?.publicId) {
      try {
        await deleteFromCloudinary(category.image.publicId);
      } catch (error) {
        logger.error("Failed to delete previous category image", { error });
      }
    }

    const cloudinaryData = await uploadToCloudinary(
      file.buffer,
      "Just-Buy-API/categories",
    );

    category.image = {
      publicId: cloudinaryData.public_id,
      url: cloudinaryData.secure_url,
      width: cloudinaryData.width ?? null,
      height: cloudinaryData.height ?? null,
    };
  }

  await category.save();
  return category;
};

/**
 * Toggle Category Status Service
 * @param {string} categoryId - Category ObjectId string
 * @returns {Promise<ICategory>} Updated category document
 */
export const toggleCategoryStatusService = async (
  categoryId: string,
): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Invalid category ID",
    );
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    logger.warn(API_MESSAGES.CATEGORY_NOT_FOUND, { categoryId });
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.CATEGORY_NOT_FOUND,
      API_MESSAGES.CATEGORY_NOT_FOUND,
    );
  }

  category.isActive = !category.isActive;
  await category.save();

  return category;
};

/**
 * Delete Category Service
 * @param {string} categoryId - Category ObjectId string
 * @returns {Promise<void>}
 */
export const deleteCategoryService = async (
  categoryId: string,
): Promise<void> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODE.BAD_REQUEST,
      "Invalid category ID",
    );
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    logger.warn(API_MESSAGES.CATEGORY_NOT_FOUND, { categoryId });
    throw new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.CATEGORY_NOT_FOUND,
      API_MESSAGES.CATEGORY_NOT_FOUND,
    );
  }

  // Delete image from Cloudinary if it exists
  if (category.image?.publicId) {
    try {
      await deleteFromCloudinary(category.image.publicId);
    } catch (error) {
      logger.error("Failed to delete category image from Cloudinary", { error });
    }
  }

  await Category.findByIdAndDelete(categoryId);
};