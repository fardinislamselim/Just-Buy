/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * Third-party module
 */
import { Schema, model, models } from "mongoose";

/**
 * Type
 */
import type { IProduct } from "@/modules/v1/product/product.interface";

/**
 * Product Schema
 */
const productSchema = new Schema<IProduct>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required"],
      alias: "seller_id",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      alias: "category_id",
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },

    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, "Stock quantity cannot be negative"],
      alias: "stock_quantity",
    },

    images: {
      type: [
        {
          publicId: {
            type: String,
            default: "",
          },
          url: {
            type: String,
            default: "",
          },
          width: {
            type: Number,
            default: null,
          },
          height: {
            type: Number,
            default: null,
          },
          _id: false,
        },
      ],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
      alias: "is_featured",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/**
 * Virtual fields to support relational ERD naming conventions
 */
productSchema.virtual("product_id").get(function () {
  return this._id;
});

productSchema.virtual("productId").get(function () {
  return this._id;
});

productSchema.virtual("created_at").get(function () {
  return this.createdAt;
});

productSchema.virtual("updated_at").get(function () {
  return this.updatedAt;
});

/**
 * Indexes for query performance
 */
productSchema.index({ seller: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

/**
 * Product Model Definition
 */
const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
