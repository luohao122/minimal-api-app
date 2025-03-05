import { NextFunction, Request, Response } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req);
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
      const validationError = new Error("Invalid signup data");
      validationError.name = "ValidationError";
      validationError.message = "Missing required parameters email or name";
      return next(validationError);
    }

    if (password.length <= 12) {
      const validationError = new Error(
        "Password must be at least 12 characters"
      );
      validationError.name = "ValidationError";
      validationError.message = "Password must be at least 12 characters";
      return next(validationError);
    }
  } catch (error) {
    next(error);
  }
};
