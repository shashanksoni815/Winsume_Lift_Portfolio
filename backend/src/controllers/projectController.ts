import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { Project } from "../models/Project.js";
import { generateProjectId } from "../utils/idGenerator.js";

const projectSchema = z.object({
  name: z.string().min(1),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  location: z.string().optional(),
  status: z.enum(["completed", "in-progress", "pending", "on-hold"]).default("pending"),
  budget: z.number().optional(),
  spent: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  teamSize: z.number().optional(),
  type: z.string().optional(),
  image: z.string().optional(),
  // public portfolio fields
  title: z.string().optional(),
  category: z.string().optional(),
  year: z.number().optional(),
  description: z.string().optional()
});

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = projectSchema.parse(req.body);
    const externalId = generateProjectId();

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
      image: data.image,
      title: data.title ?? data.name,
      category: data.category,
      year: data.year,
      description: data.description
    });

    res.status(201).json({ project });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid project data"));
    }
    next(err);
  }
};

export const listProjects = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ items: projects });
  } catch (err) {
    next(err);
  }
};

export const listPublicProjects = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await Project.find()
      .select("externalId name title category year description location image status createdAt")
      .sort({ year: -1, createdAt: -1 });
    res.json({ items: projects });
  } catch (err) {
    next(err);
  }
};

export const listProjectsForUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }
    const projects = await Project.find({ clientId: req.user.sub }).sort({ createdAt: -1 });
    res.json({ items: projects });
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw createHttpError(404, "Project not found");
    }
    res.json({ project });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = projectSchema.partial().parse(req.body);
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: data
      },
      { new: true }
    );
    if (!project) {
      throw createHttpError(404, "Project not found");
    }
    res.json({ project });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid project update"));
    }
    next(err);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      throw createHttpError(404, "Project not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

