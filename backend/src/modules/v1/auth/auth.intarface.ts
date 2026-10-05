/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */


// User Roles

export enum UserRole {
  BUYER = "buyer",
  SELLER = "seller",
  ADMIN = "admin",
}

// User Interface

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  is_active: boolean;
}

// Register Request Interface

export interface IRegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: UserRole.BUYER | UserRole.SELLER | UserRole.ADMIN;
}


// Login Request Interface
export interface ILoginRequest {
  email: string;
  password: string;
}

// Refresh Token Request Interface
export interface IRefreshTokenRequest {
  refreshToken: string;
}

// Auth Response Interface
export interface AuthResponse {
  user: {
    fullName: string;
    email: string;
    role: UserRole;
  };
  accessToken: string;
  refreshToken: string;
}
