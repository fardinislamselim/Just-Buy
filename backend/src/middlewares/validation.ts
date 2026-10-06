/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-Party Module
 */
import { z } from "zod";

/**
 * Type
 */
import type { NextFunction, Request, Response } from "express";

/**
 * Validate Middleware
 */
const validation =
  (schema: z.ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;
    next();
  };

export default validation;
