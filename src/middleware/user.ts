import { Request, Response, NextFunction } from "express";
import User from "../models/user";

/**
 * Middleware to set req.user
 * Temporarily uses findOrCreate for admin
 * Will be replaced with session/token check later
 */
export const setUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Temporarily: create or find admin
    // Later this will check session/token
    const [user] = await User.findOrCreate({
      where: { email: "admin@example.com" },
      defaults: { name: "Admin", email: "admin@example.com" },
    });

    req.user = user;
    next();
  } catch (err) {
    console.error("Error setting user:", err);
    next(err);
  }
};
