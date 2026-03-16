import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { Document } from "../models/Document.js";

const documentSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  userId: z.string().optional(),
  projectId: z.string().optional(),
  sizeBytes: z.number().optional(),
  mimeType: z.string().optional(),
  description: z.string().optional()
});

export const createDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = documentSchema.parse(req.body);

    const userId = data.userId ?? req.user?.sub;
    if (!userId) {
      throw createHttpError(400, "userId is required");
    }

    const doc = await Document.create({
      name: data.name,
      url: data.url,
      userId,
      projectId: data.projectId,
      sizeBytes: data.sizeBytes,
      mimeType: data.mimeType,
      description: data.description
    });

    res.status(201).json({ document: doc });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid document data"));
    }
    next(err);
  }
};

export const listDocuments = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json({ items: docs });
  } catch (err) {
    next(err);
  }
};

export const listDocumentsForUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Authentication required");
    }
    const docs = await Document.find({ userId: req.user.sub }).sort({ createdAt: -1 });
    res.json({ items: docs });
  } catch (err) {
    next(err);
  }
};

export const getDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      throw createHttpError(404, "Document not found");
    }
    res.json({ document: doc });
  } catch (err) {
    next(err);
  }
};

export const updateDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = documentSchema.partial().parse(req.body);
    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      {
        $set: data
      },
      { new: true }
    );
    if (!doc) {
      throw createHttpError(404, "Document not found");
    }
    res.json({ document: doc });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(createHttpError(400, "Invalid document update"));
    }
    next(err);
  }
};

export const deleteDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) {
      throw createHttpError(404, "Document not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

