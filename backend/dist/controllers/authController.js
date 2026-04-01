import createHttpError, { isHttpError } from "http-errors";
import { z } from "zod";
import { User } from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
const registerSchema = z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    city: z.string().optional(),
    password: z.string().min(6)
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});
const forgotPasswordSchema = z.object({
    email: z.string().email()
});
const resetPasswordSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1)
});
const buildAuthResponse = (user) => {
    const payload = { sub: user._id.toString(), role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    return {
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        },
        tokens: {
            accessToken,
            refreshToken
        }
    };
};
export const register = async (req, res, next) => {
    try {
        const data = registerSchema.parse(req.body);
        const existing = await User.findOne({ email: data.email });
        if (existing) {
            throw createHttpError(409, "Email already registered");
        }
        const passwordHash = await hashPassword(data.password);
        const user = await User.create({
            email: data.email,
            passwordHash,
            fullName: data.fullName,
            phone: data.phone,
            company: data.company,
            city: data.city,
            role: "user"
        });
        res.status(201).json(buildAuthResponse(user));
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid registration data"));
        }
        next(err);
    }
};
export const login = async (req, res, next) => {
    try {
        const data = loginSchema.parse(req.body);
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }
        const valid = await verifyPassword(data.password, user.passwordHash);
        if (!valid) {
            throw createHttpError(401, "Invalid credentials");
        }
        res.json(buildAuthResponse(user));
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid login data"));
        }
        next(err);
    }
};
export const adminLogin = async (req, res, next) => {
    try {
        const data = loginSchema.parse(req.body);
        const user = await User.findOne({ email: data.email, role: "admin" });
        if (!user) {
            throw createHttpError(401, "Invalid credentials or not an admin");
        }
        const valid = await verifyPassword(data.password, user.passwordHash);
        if (!valid) {
            throw createHttpError(401, "Invalid credentials");
        }
        res.json(buildAuthResponse(user));
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid login data"));
        }
        next(err);
    }
};
export const me = async (req, res, next) => {
    try {
        if (!req.user) {
            throw createHttpError(401, "Authentication required");
        }
        const user = await User.findById(req.user.sub).select("-passwordHash");
        if (!user) {
            throw createHttpError(404, "User not found");
        }
        res.json({ user });
    }
    catch (err) {
        next(err);
    }
};
export const forgotPassword = async (req, res, next) => {
    try {
        const data = forgotPasswordSchema.parse(req.body);
        const user = await User.findOne({ email: data.email });
        if (!user) {
            // Do not reveal whether the email exists
            res.json({ message: "If that email exists, you can now reset your password." });
            return;
        }
        // In this flow we immediately allow reset after email verification on the client.
        res.json({ message: "If that email exists, you can now reset your password." });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid email"));
        }
        next(err);
    }
};
export const resetPassword = async (req, res, next) => {
    try {
        const data = resetPasswordSchema.parse(req.body);
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw createHttpError(404, "User not found");
        }
        const passwordHash = await hashPassword(data.password);
        user.passwordHash = passwordHash;
        await user.save();
        res.json({ message: "Password has been reset successfully." });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid reset data"));
        }
        next(err);
    }
};
export const refreshAccessToken = async (req, res, next) => {
    try {
        const bodyResult = refreshTokenSchema.safeParse(req.body);
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
        const refreshToken = bodyResult.success
            ? bodyResult.data.refreshToken
            : bearerToken;
        if (!refreshToken) {
            throw createHttpError(400, "Refresh token is required");
        }
        const payload = verifyRefreshToken(refreshToken);
        const user = await User.findById(payload.sub);
        if (!user) {
            throw createHttpError(401, "Invalid refresh token");
        }
        if (user.status !== "active") {
            throw createHttpError(403, "User account is not active");
        }
        res.json(buildAuthResponse(user));
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid refresh request"));
        }
        if (isHttpError(err)) {
            return next(err);
        }
        next(createHttpError(401, "Invalid or expired refresh token"));
    }
};
