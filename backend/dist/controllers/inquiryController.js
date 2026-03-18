import createHttpError from "http-errors";
import { z } from "zod";
import { Inquiry } from "../models/Inquiry.js";
import { generateInquiryId } from "../utils/idGenerator.js";
import { notifyAdmin } from "../utils/notify.js";
const createInquirySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    city: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(1),
    type: z.string().optional(),
    source: z.string().optional()
});
export const createInquiry = async (req, res, next) => {
    try {
        const data = createInquirySchema.parse(req.body);
        const externalId = generateInquiryId();
        const inquiry = await Inquiry.create({
            externalId,
            ...data
        });
        await notifyAdmin({
            title: "New inquiry received",
            message: `New inquiry from ${inquiry.name} (${inquiry.email}).`,
            type: "info",
            category: "Inquiries",
            meta: { entityType: "inquiry", entityId: inquiry.id, action: "create" }
        });
        res.status(201).json({ inquiry });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid inquiry data"));
        }
        next(err);
    }
};
export const createInquiryForUser = async (req, res, next) => {
    try {
        if (!req.user) {
            throw createHttpError(401, "Authentication required");
        }
        const data = createInquirySchema.parse(req.body);
        const externalId = generateInquiryId();
        const inquiry = await Inquiry.create({
            externalId,
            ...data,
            userId: req.user.sub
        });
        await notifyAdmin({
            title: "New user inquiry received",
            message: `New inquiry from ${inquiry.name} (${inquiry.email}).`,
            type: "info",
            category: "Inquiries",
            meta: { entityType: "inquiry", entityId: inquiry.id, action: "create", actorUserId: req.user.sub }
        });
        res.status(201).json({ inquiry });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid inquiry data"));
        }
        next(err);
    }
};
export const listInquiries = async (req, res, next) => {
    try {
        const { status, priority, search, page = "1", pageSize = "20" } = req.query;
        const filters = {};
        if (status && typeof status === "string") {
            filters.status = status;
        }
        if (priority && typeof priority === "string") {
            filters.priority = priority;
        }
        if (search && typeof search === "string") {
            filters.$or = [
                { name: new RegExp(search, "i") },
                { email: new RegExp(search, "i") },
                { subject: new RegExp(search, "i") }
            ];
        }
        const pageNum = Number(page) || 1;
        const perPage = Math.min(Number(pageSize) || 20, 100);
        const [items, total] = await Promise.all([
            Inquiry.find(filters)
                .sort({ createdAt: -1 })
                .skip((pageNum - 1) * perPage)
                .limit(perPage),
            Inquiry.countDocuments(filters)
        ]);
        res.json({
            items,
            total,
            page: pageNum,
            pageSize: perPage
        });
    }
    catch (err) {
        next(err);
    }
};
export const getInquiry = async (req, res, next) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            throw createHttpError(404, "Inquiry not found");
        }
        await notifyAdmin({
            title: "Inquiry updated",
            message: `Inquiry ${inquiry.externalId} was updated.`,
            type: "info",
            category: "Inquiries",
            meta: { entityType: "inquiry", entityId: inquiry.id, action: "update", actorUserId: req.user?.sub }
        });
        res.json({ inquiry });
    }
    catch (err) {
        next(err);
    }
};
const updateInquirySchema = z.object({
    status: z.enum(["new", "in-review", "responded", "closed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    assignedToUserId: z.string().optional()
});
export const updateInquiry = async (req, res, next) => {
    try {
        const data = updateInquirySchema.parse(req.body);
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, {
            $set: data
        }, { new: true });
        if (!inquiry) {
            throw createHttpError(404, "Inquiry not found");
        }
        res.json({ inquiry });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid inquiry update"));
        }
        next(err);
    }
};
export const deleteInquiry = async (req, res, next) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!inquiry) {
            throw createHttpError(404, "Inquiry not found");
        }
        await notifyAdmin({
            title: "Inquiry deleted",
            message: `Inquiry ${inquiry.externalId} was deleted.`,
            type: "warning",
            category: "Inquiries",
            meta: { entityType: "inquiry", entityId: inquiry.id, action: "delete", actorUserId: req.user?.sub }
        });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
export const listInquiriesForUser = async (req, res, next) => {
    try {
        if (!req.user) {
            throw createHttpError(401, "Authentication required");
        }
        const items = await Inquiry.find({ userId: req.user.sub }).sort({ createdAt: -1 });
        res.json({ items });
    }
    catch (err) {
        next(err);
    }
};
