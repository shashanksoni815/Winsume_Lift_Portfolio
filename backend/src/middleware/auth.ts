import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verifyAccessToken, JwtPayload } from "../utils/jwt.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  if (!token) {
    return next(createHttpError(401, "Authentication required"));
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error: any) {
    if (error?.name === "TokenExpiredError") {
      return next(createHttpError(401, "Access token expired"));
    }
    next(createHttpError(401, "Invalid token"));
  }
};

export const requireRole =
  (...roles: JwtPayload["role"][]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(createHttpError(401, "Authentication required"));
    }
    if (!roles.includes(req.user.role)) {
      return next(createHttpError(403, "Insufficient permissions"));
    }
    next();
  };

