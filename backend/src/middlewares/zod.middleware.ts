/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @description Zod Middleware
 */

/**
 * Third-Party Modules
 */
import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { z } from "zod";


/**
 * Validate Middleware
 */
export const validate =
  (schema: z.ZodType) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;

    next();
  };