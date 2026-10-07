/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Modules
 */
import { Request, Response } from "express";

/**
 * Application Modules
 */
import { logger } from "@/lib/winston";
import asyncHandler from "@/utils/asyncHandler";
import { API_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import sendResponse from "@/utils/sendResponse";

/**
 * Application Services
 */
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  getCategoryBySlugService,
  toggleCategoryStatusService,
  updateCategoryService,
} from "@/modules/v1/category/category.service";

/**
 * Create Category Controller
 * @access - Private (Admin)
 * @method - POST
 * @route - /api/v1/category
 */
export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await createCategoryService({
      userId: req.userId!,
      payload: req.body,
      file: req.file,
    });

    logger.info(API_MESSAGES.CATEGORY_CREATED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: API_MESSAGES.CATEGORY_CREATED,
      data,
    });
  },
);

/**
 * Get All Categories Controller
 * @access - Public
 * @method - GET
 * @route - /api/v1/category
 */
export const getAllCategoriesController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllCategoriesService(req.query);

    logger.info(API_MESSAGES.CATEGORIES_FETCHED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.CATEGORIES_FETCHED,
      data: result.categories,
      total: result.total,
      skip: result.skip,
      limit: result.limit,
    });
  },
);

/**
 * Get Category By ID Controller
 * @access - Public
 * @method - GET
 * @route - /api/v1/category/:id
 */
export const getCategoryByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getCategoryByIdService(req.params.id as string);

    logger.info(API_MESSAGES.CATEGORY_FETCHED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.CATEGORY_FETCHED,
      data,
    });
  },
);

/**
 * Get Category By Slug Controller
 * @access - Public
 * @method - GET
 * @route - /api/v1/category/slug/:slug
 */
export const getCategoryBySlugController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getCategoryBySlugService(req.params.slug as string);

    logger.info(API_MESSAGES.CATEGORY_FETCHED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.CATEGORY_FETCHED,
      data,
    });
  },
);

/**
 * Update Category Controller
 * @access - Private (Admin)
 * @method - PATCH
 * @route - /api/v1/category/:id
 */
export const updateCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await updateCategoryService({
      categoryId: req.params.id as string,
      payload: req.body,
      file: req.file,
    });

    logger.info(API_MESSAGES.CATEGORY_UPDATED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.CATEGORY_UPDATED,
      data,
    });
  },
);

/**
 * Toggle Category Status Controller
 * @access - Private (Admin)
 * @method - PATCH / PUT
 * @route - /api/v1/category/:id/toggle-status
 */
export const toggleCategoryStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await toggleCategoryStatusService(req.params.id as string);

    logger.info(API_MESSAGES.CATEGORY_STATUS_UPDATED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.CATEGORY_STATUS_UPDATED,
      data,
    });
  },
);

/**
 * Delete Category Controller
 * @access - Private (Admin)
 * @method - DELETE
 * @route - /api/v1/category/:id
 */
export const deleteCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteCategoryService(req.params.id as string);

    logger.info(API_MESSAGES.CATEGORY_DELETED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.CATEGORY_DELETED,
    });
  },
);