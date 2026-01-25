import { Request } from "express";
import User from "../models/user";

// Extend Request to add user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface ProductBody {
  title: string;
  price: string; // HTML forms always send string
  imageUrl: string;
  description: string;
}

export interface DeleteProductBody {
  id: string;
}

export interface AddToCartBody {
  productId: string;
}

export interface ProductIdParams {
  productId: string;
}
