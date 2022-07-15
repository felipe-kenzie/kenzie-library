import { Request, Response, NextFunction } from "express";

import AppError from "../errors/appError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(400).json({
    message: err.message ,
  });
};
