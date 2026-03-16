import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { User } from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";

const listUsersQuerySchema = z.object({
  search: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional()
});

export const listUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, role, status, page = "1", pageSize = "20" } = listUsersQuerySchema.parse(req.query);

    const filters: Record<string, unknown> = {};
    if (role) filters.role = role;
    if (status) filters.status = status;
    if (search) {
      filters.$or = [
        { fullName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") }
      ];
    }

    const pageNum = Number(page) || 1;
    const perPage = Math.min(Number(pageSize) || 20, 100);

    const [items, total] = await Promise.all([
      User.find(filters)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * perPage)
        .limit(perPage)
        .select("-passwordHash"),
      User.countDocuments(filters)
    ]);

    res.json({ items, total, page: pageNum, pageSize: perPage });
  } catch (err) {
    next(err);
  }
};

const createUserSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "manager", "user"]).default("user"),
  status: z.enum(["active", "inactive", "suspended"]).default("active"),
  phone: z.string().optional(),
  company: z.string().optional()
});

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createUserSchema.parse(req.body);

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw createHttpError(409, "Email already exists");
    }

    const passwordHash = await hashPassword(data.password);

    const user = await User.create({
      email: data.email,
      passwordHash,
      fullName: data.fullName,
      role: data.role,
      status: data.status,
      phone: data.phone,
      company: data.company
    });

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid user data"));
    }
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const updateUserSchema = z.object({
  fullName: z.string().optional(),
  role: z.enum(["admin", "manager", "user"]).optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional()
});

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = updateUserSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: data
      },
      { new: true }
    ).select("-passwordHash");
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.json({ user });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid user update"));
    }
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const updateMeSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional()
});

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }
    const user = await User.findById(req.user.sub).select("-passwordHash");
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }
    const data = updateMeSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(
      req.user.sub,
      {
        $set: data
      },
      { new: true }
    ).select("-passwordHash");
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.json({ user });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid profile update"));
    }
    next(err);
  }
};

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6)
});

export const updateMyPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }

    const data = updatePasswordSchema.parse(req.body);

    const user = await User.findById(req.user.sub);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const valid = await verifyPassword(data.currentPassword, user.passwordHash);
    if (!valid) {
      throw createHttpError(401, "Current password is incorrect");
    }

    user.passwordHash = await hashPassword(data.newPassword);
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid password data"));
    }
    next(err);
  }
};


