import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // Fix: If no Authorization header, return immediately
  if (!authHeader) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  // Fix: If token is missing, return immediately
  if (!token) {
    res.status(401).json({ error: "Access denied. Missing token." });
    return;
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET_TOKEN_KEY!) as {
      name: string;
      email: string;
    };

    // @ts-ignore
    req.currentUser = payload;
    next(); // Call next() only if authentication succeeds
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
    return;
  }
};
