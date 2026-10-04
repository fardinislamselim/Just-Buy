/**
 * @copyright 2026
 * @author Rohanul Haque Rohan - MERN Stack Developer
 * @license Apache-2.0
 */

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Application Error Codes
 */
export const ERROR_CODE = {
  // General
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  // Authentication
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  AUTH_EMAIL_EXISTS: "AUTH_EMAIL_EXISTS",
  AUTH_ACCOUNT_NOT_FOUND: "AUTH_ACCOUNT_NOT_FOUND",
  AUTH_ACCOUNT_DISABLED: "AUTH_ACCOUNT_DISABLED",

  // Access Token
  AUTH_TOKEN_MISSING: "AUTH_TOKEN_MISSING",
  AUTH_TOKEN_INVALID: "AUTH_TOKEN_INVALID",
  AUTH_TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",

  // Refresh Token
  AUTH_REFRESH_TOKEN_MISSING: "AUTH_REFRESH_TOKEN_MISSING",
  AUTH_REFRESH_TOKEN_INVALID: "AUTH_REFRESH_TOKEN_INVALID",
  AUTH_REFRESH_TOKEN_EXPIRED: "AUTH_REFRESH_TOKEN_EXPIRED",

  // Token
  AUTH_TOKEN_REFRESH_FAILED: "AUTH_TOKEN_REFRESH_FAILED",

  // User
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  USER_UPDATE_FAILED: "USER_UPDATE_FAILED",

  // Buyer Profile
  BUYER_PROFILE_NOT_FOUND: "BUYER_PROFILE_NOT_FOUND",
  BUYER_PROFILE_UPDATE_FAILED: "BUYER_PROFILE_UPDATE_FAILED",

  // Seller Profile
  SELLER_PROFILE_NOT_FOUND: "SELLER_PROFILE_NOT_FOUND",
  SELLER_PROFILE_UPDATE_FAILED: "SELLER_PROFILE_UPDATE_FAILED",
  SELLER_NOT_APPROVED: "SELLER_NOT_APPROVED",

  // Product
  PRODUCT_NOT_FOUND: "PRODUCT_NOT_FOUND",
  PRODUCT_ALREADY_EXISTS: "PRODUCT_ALREADY_EXISTS",
  PRODUCT_CREATE_FAILED: "PRODUCT_CREATE_FAILED",
  PRODUCT_UPDATE_FAILED: "PRODUCT_UPDATE_FAILED",
  PRODUCT_DELETE_FAILED: "PRODUCT_DELETE_FAILED",
  PRODUCT_OUT_OF_STOCK: "PRODUCT_OUT_OF_STOCK",

  // Category
  CATEGORY_NOT_FOUND: "CATEGORY_NOT_FOUND",
  CATEGORY_ALREADY_EXISTS: "CATEGORY_ALREADY_EXISTS",

  // Cart
  CART_NOT_FOUND: "CART_NOT_FOUND",
  CART_ITEM_NOT_FOUND: "CART_ITEM_NOT_FOUND",
  CART_ITEM_OUT_OF_STOCK: "CART_ITEM_OUT_OF_STOCK",

  // Wishlist
  WISHLIST_NOT_FOUND: "WISHLIST_NOT_FOUND",
  WISHLIST_ITEM_NOT_FOUND: "WISHLIST_ITEM_NOT_FOUND",

  // Order
  ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
  ORDER_CREATE_FAILED: "ORDER_CREATE_FAILED",
  ORDER_UPDATE_FAILED: "ORDER_UPDATE_FAILED",
  ORDER_ALREADY_CANCELLED: "ORDER_ALREADY_CANCELLED",
  ORDER_CANNOT_BE_CANCELLED: "ORDER_CANNOT_BE_CANCELLED",

  // Payment
  PAYMENT_FAILED: "PAYMENT_FAILED",
  PAYMENT_NOT_FOUND: "PAYMENT_NOT_FOUND",
  PAYMENT_ALREADY_COMPLETED: "PAYMENT_ALREADY_COMPLETED",

  // Review
  REVIEW_NOT_FOUND: "REVIEW_NOT_FOUND",
  REVIEW_ALREADY_EXISTS: "REVIEW_ALREADY_EXISTS",
  REVIEW_NOT_ALLOWED: "REVIEW_NOT_ALLOWED",

  // File Upload
  FILE_UPLOAD_FAILED: "FILE_UPLOAD_FAILED",
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
} as const;

/**
 * API Response Messages
 */
export const API_MESSAGES = {
  // General
  SUCCESS: "Request successful",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Authentication required",
  FORBIDDEN: "You do not have permission to perform this action",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  VALIDATION_ERROR: "Validation failed",
  TOO_MANY_REQUESTS: "Too many requests. Please try again later",

  // Authentication
  SIGNUP_SUCCESS: "Signup successful",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",

  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  ACCOUNT_NOT_FOUND: "Account not found",
  ACCOUNT_DISABLED: "Your account has been disabled",

  // Access Token
  TOKEN_MISSING: "Authentication token is missing",
  TOKEN_INVALID: "Invalid authentication token",
  TOKEN_EXPIRED: "Authentication token has expired",

  // Refresh Token
  REFRESH_TOKEN_MISSING: "Refresh token is missing",
  REFRESH_TOKEN_INVALID: "Invalid refresh token",
  REFRESH_TOKEN_EXPIRED: "Refresh token has expired",

  // Token
  TOKEN_REFRESH_FAILED: "Failed to refresh authentication token",

  // User
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  USER_NOT_FOUND: "User not found",

  // Buyer Profile
  BUYER_PROFILE_CREATED: "Buyer profile created successfully",
  BUYER_PROFILE_UPDATED: "Buyer profile updated successfully",
  BUYER_PROFILE_DELETED: "Buyer profile deleted successfully",
  BUYER_PROFILE_NOT_FOUND: "Buyer profile not found",

  // Seller Profile
  SELLER_PROFILE_CREATED: "Seller profile created successfully",
  SELLER_PROFILE_UPDATED: "Seller profile updated successfully",
  SELLER_PROFILE_DELETED: "Seller profile deleted successfully",
  SELLER_PROFILE_NOT_FOUND: "Seller profile not found",
  SELLER_NOT_APPROVED: "Seller account is not approved",

  // Product
  PRODUCT_CREATED: "Product created successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully",
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_ALREADY_EXISTS: "Product already exists",
  PRODUCT_OUT_OF_STOCK: "Product is out of stock",

  // Category
  CATEGORY_CREATED: "Category created successfully",
  CATEGORY_UPDATED: "Category updated successfully",
  CATEGORY_DELETED: "Category deleted successfully",
  CATEGORY_NOT_FOUND: "Category not found",
  CATEGORY_ALREADY_EXISTS: "Category already exists",

  // Cart
  CART_CREATED: "Cart created successfully",
  CART_UPDATED: "Cart updated successfully",
  CART_DELETED: "Cart deleted successfully",
  CART_NOT_FOUND: "Cart not found",

  CART_ITEM_ADDED: "Item added to cart successfully",
  CART_ITEM_UPDATED: "Cart item updated successfully",
  CART_ITEM_REMOVED: "Item removed from cart successfully",
  CART_ITEM_NOT_FOUND: "Cart item not found",
  CART_ITEM_OUT_OF_STOCK: "Product is out of stock",

  // Wishlist
  WISHLIST_CREATED: "Wishlist created successfully",
  WISHLIST_UPDATED: "Wishlist updated successfully",
  WISHLIST_DELETED: "Wishlist deleted successfully",
  WISHLIST_NOT_FOUND: "Wishlist not found",

  WISHLIST_ITEM_ADDED: "Item added to wishlist successfully",
  WISHLIST_ITEM_REMOVED: "Item removed from wishlist successfully",
  WISHLIST_ITEM_NOT_FOUND: "Wishlist item not found",

  // Order
  ORDER_CREATED: "Order placed successfully",
  ORDER_UPDATED: "Order updated successfully",
  ORDER_CANCELLED: "Order cancelled successfully",
  ORDER_NOT_FOUND: "Order not found",
  ORDER_CANNOT_BE_CANCELLED: "This order cannot be cancelled",

  // Payment
  PAYMENT_SUCCESS: "Payment completed successfully",
  PAYMENT_FAILED: "Payment failed",
  PAYMENT_NOT_FOUND: "Payment not found",
  PAYMENT_ALREADY_COMPLETED: "Payment has already been completed",

  // Review
  REVIEW_CREATED: "Review submitted successfully",
  REVIEW_UPDATED: "Review updated successfully",
  REVIEW_DELETED: "Review deleted successfully",
  REVIEW_NOT_FOUND: "Review not found",
  REVIEW_ALREADY_EXISTS: "You have already reviewed this product",
  REVIEW_NOT_ALLOWED: "You are not allowed to review this product",

  // File Upload
  FILE_UPLOAD_SUCCESS: "File uploaded successfully",
  FILE_UPLOAD_FAILED: "File upload failed",
  INVALID_FILE_TYPE: "Invalid file type",
  FILE_TOO_LARGE: "File size is too large",
} as const;
