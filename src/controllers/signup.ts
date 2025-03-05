import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { USERS_DB } from "@app/app";
import { hashPassword } from "@utils/helpers";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const hashedPassword = await hashPassword(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    USERS_DB.push(newUser);
    const token = jwt.sign({ name, email }, process.env.JWT_SECRET_TOKEN_KEY!, {
      expiresIn: "1h",
    });
    res.json({ token, message: "User created", newUser });
  } catch (error) {
    next(error);
  }
};
