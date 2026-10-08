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
const validation = (
  schema: z.ZodType,
  source: "body" | "params" | "query" = "body",
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      next(result.error);
      return;
    }

    if (source === "body") {
      req.body = result.data;
    }

    if (source === "params") {
      Object.assign(req.params, result.data);
    }

    if (source === "query") {
      const data = result.data as Record<string, any>;
      Object.keys(data).forEach((key) => {
        Object.defineProperty(req.query, key, {
          value: data[key],
          writable: true,
          enumerable: true,
          configurable: true,
        });
      });
    }

    next();
  };
};

export default validation;
