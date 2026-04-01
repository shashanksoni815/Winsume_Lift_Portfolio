import createHttpError from "http-errors";
import { z } from "zod";
import { Project } from "../models/Project.js";
import { generateProjectId } from "../utils/idGenerator.js";
import { notifyAdmin } from "../utils/notify.js";
const numberField = z.preprocess((value) => {
    if (value === undefined || value === null || value === "")
        return undefined;
    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : undefined;
    }
    return value;
}, z.number().optional());
const projectSchema = z.object({
    name: z.string().min(1),
    clientId: z.string().optional(),
    clientName: z.string().optional(),
    clientEmail: z.string().email().optional(),
    clientPhone: z.string().optional(),
    location: z.string().optional(),
    status: z.enum(["completed", "in-progress", "pending", "on-hold"]).default("pending"),
    budget: numberField,
    spent: numberField,
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    progress: numberField.refine((v) => v === undefined || (v >= 0 && v <= 100), "Progress must be between 0 and 100"),
    teamSize: numberField,
    type: z.string().optional(),
    image: z.string().optional(),
    // public portfolio fields
    title: z.string().optional(),
    category: z.string().optional(),
    year: numberField,
    description: z.string().optional()
});
export const createProject = async (req, res, next) => {
    try {
        const data = projectSchema.parse(req.body);
        const file = req.file;
        const imagePath = file ? `/uploads/${file.filename}` : data.image;
        const externalId = await generateProjectId();
        const project = await Project.create({
            externalId,
            name: data.name,
            clientId: data.clientId,
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            clientPhone: data.clientPhone,
            location: data.location,
            status: data.status,
            budget: data.budget,
            spent: data.spent,
            startDate: data.startDate,
            endDate: data.endDate,
            progress: data.progress,
            teamSize: data.teamSize,
            type: data.type,
            image: imagePath,
            title: data.title ?? data.name,
            category: data.category,
            year: data.year,
            description: data.description
        });
        await notifyAdmin({
            title: "Project created",
            message: `Project ${project.externalId} (${project.name}) was created.`,
            type: "success",
            category: "Projects",
            meta: { entityType: "project", entityId: project.id, action: "create", actorUserId: req.user?.sub }
        });
        res.status(201).json({ project });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid project data"));
        }
        next(err);
    }
};
export const listProjects = async (_req, res, next) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json({ items: projects });
    }
    catch (err) {
        next(err);
    }
};
export const listPublicProjects = async (_req, res, next) => {
    try {
        const projects = await Project.find()
            .select("externalId name title category year description location image status createdAt")
            .sort({ year: -1, createdAt: -1 });
        res.json({ items: projects });
    }
    catch (err) {
        next(err);
    }
};
export const listProjectsForUser = async (req, res, next) => {
    try {
        if (!req.user) {
            throw createHttpError(401, "Authentication required");
        }
        const projects = await Project.find({ clientId: req.user.sub }).sort({ createdAt: -1 });
        res.json({ items: projects });
    }
    catch (err) {
        next(err);
    }
};
export const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            throw createHttpError(404, "Project not found");
        }
        await notifyAdmin({
            title: "Project updated",
            message: `Project ${project.externalId} (${project.name}) was updated.`,
            type: "info",
            category: "Projects",
            meta: { entityType: "project", entityId: project.id, action: "update", actorUserId: req.user?.sub }
        });
        res.json({ project });
    }
    catch (err) {
        next(err);
    }
};
export const updateProject = async (req, res, next) => {
    try {
        const data = projectSchema.partial().parse(req.body);
        const file = req.file;
        const setPayload = { ...data };
        if (file) {
            setPayload.image = `/uploads/${file.filename}`;
        }
        const project = await Project.findByIdAndUpdate(req.params.id, {
            $set: setPayload
        }, { new: true });
        if (!project) {
            throw createHttpError(404, "Project not found");
        }
        res.json({ project });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return next(createHttpError(400, "Invalid project update"));
        }
        next(err);
    }
};
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            throw createHttpError(404, "Project not found");
        }
        await notifyAdmin({
            title: "Project deleted",
            message: `Project ${project.externalId} (${project.name}) was deleted.`,
            type: "warning",
            category: "Projects",
            meta: { entityType: "project", entityId: project.id, action: "delete", actorUserId: req.user?.sub }
        });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
