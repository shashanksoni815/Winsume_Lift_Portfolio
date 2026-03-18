import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { Notification } from "../models/Notification.js";

export const listNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const querySchema = z.object({
      filter: z.enum(["all", "read", "unread"]).optional(),
      search: z.string().optional(),
      limit: z.string().optional(),
      offset: z.string().optional()
    });
    const q = querySchema.parse(req.query);

    const filters: Record<string, any> = {};
    if (q.filter === "read") filters.read = true;
    if (q.filter === "unread") filters.read = false;
    if (q.search && q.search.trim()) {
      const rx = new RegExp(q.search.trim(), "i");
      filters.$or = [{ title: rx }, { message: rx }, { category: rx }];
    }

    const limit = Math.min(Number(q.limit ?? "50") || 50, 200);
    const offset = Math.max(Number(q.offset ?? "0") || 0, 0);

    const [items, unreadCount] = await Promise.all([
      Notification.find(filters).sort({ createdAt: -1 }).skip(offset).limit(limit),
      Notification.countDocuments({ read: false })
    ]);

    res.json({ items, unreadCount });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid query"));
    }
    next(err);
  }
};

export const markNotificationRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { $set: { read: true } },
      { new: true }
    );
    if (!notification) {
      throw createHttpError(404, "Notification not found");
    }
    res.json({ notification });
  } catch (err) {
    next(err);
  }
};

export const markAllNotificationsRead = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await Notification.updateMany({ read: false }, { $set: { read: true } });
    res.json({ message: "All notifications marked as read." });
  } catch (err) {
    next(err);
  }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      throw createHttpError(404, "Notification not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

