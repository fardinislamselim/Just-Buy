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
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "@/modules/v1/product/product.service";

/**
 * Create Product Controller (Add product)
 * @access - Private (Seller, Admin)
 * @method - POST
 * @route - /api/v1/products
 */
export const createProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const files =
      (req.files as Express.Multer.File[]) ||
      (req.file ? [req.file] : undefined);

    const data = await createProductService({
      userId: req.userId!,
      payload: req.body,
      files,
    });

    logger.info(API_MESSAGES.PRODUCT_CREATED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: API_MESSAGES.PRODUCT_CREATED,
      data,
    });
  },
);

/**
 * Get All Products Controller (Product list)
 * @access - Public
 * @method - GET
 * @route - /api/v1/products
 */
export const getAllProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllProductsService(req.query);

    logger.info(API_MESSAGES.PRODUCTS_FETCHED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.PRODUCTS_FETCHED,
      data: result.products,
      total: result.total,
      skip: result.skip,
      limit: result.limit,
    });
  },
);

/**
 * Get Product By ID Controller (Product details)
 * @access - Public
 * @method - GET
 * @route - /api/v1/products/:id
 */
export const getProductByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getProductByIdService(req.params.id as string);

    logger.info(API_MESSAGES.PRODUCT_FETCHED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.PRODUCT_FETCHED,
      data,
    });
  },
);

/**
 * Update Product Controller
 * @access - Private (Seller, Admin)
 * @method - PATCH
 * @route - /api/v1/products/:id
 */
export const updateProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const files =
      (req.files as Express.Multer.File[]) ||
      (req.file ? [req.file] : undefined);

    const data = await updateProductService({
      productId: req.params.id as string,
      userId: req.userId,
      payload: req.body,
      files,
    });

    logger.info(API_MESSAGES.PRODUCT_UPDATED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.PRODUCT_UPDATED,
      data,
    });
  },
);

/**
 * Delete Product Controller
 * @access - Private (Seller, Admin)
 * @method - DELETE
 * @route - /api/v1/products/:id
 */
export const deleteProductController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteProductService(req.params.id as string, req.userId);

    logger.info(API_MESSAGES.PRODUCT_DELETED);

    sendResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: API_MESSAGES.PRODUCT_DELETED,
    });
  },
);
