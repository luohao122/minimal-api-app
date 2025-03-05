import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.message);
  // Handle validation error from joi or server's, respond with 400
  if (err.name === "ValidationError") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: err.name, message: err.message });
  }

  if (err.name === "ServerError") {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.name, message: err.message });
  }

  // Otherwise, fallback to a 500
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: err.name, message: err.message });
};
