import createHttpError from "http-errors";
import { verifyAccessToken } from "../utils/jwt.js";
export const requireAuth = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!token) {
        return next(createHttpError(401, "Authentication required"));
    }
    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    }
    catch (error) {
        if (error?.name === "TokenExpiredError") {
            return next(createHttpError(401, "Access token expired"));
        }
        next(createHttpError(401, "Invalid token"));
    }
};
export const requireRole = (...roles) => (req, _res, next) => {
    if (!req.user) {
        return next(createHttpError(401, "Authentication required"));
    }
    if (!roles.includes(req.user.role)) {
        return next(createHttpError(403, "Insufficient permissions"));
    }
    next();
};
