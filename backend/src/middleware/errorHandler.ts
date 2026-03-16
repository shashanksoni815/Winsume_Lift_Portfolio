import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction): void => {
  const status = err.status ?? 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    message,
    status
  });
};

