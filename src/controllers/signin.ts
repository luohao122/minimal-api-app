import { USERS_DB } from "@app/app";
import { comparePassword } from "@utils/helpers";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email.length || !password.length) {
      const validationError = new Error("Invalid signup data");
      validationError.name = "ValidationError";
      validationError.message = "Missing required parameters email or name";
      return next(validationError);
    }

    const foundUser = USERS_DB.find((user) => user.email === email);
    if (!foundUser) {
      const validationError = new Error("No user found");
      validationError.name = "ValidationError";
      validationError.message = "No user found";
      return next(validationError);
    }
    const passwordMatch = await comparePassword(password, foundUser.password);
    if (!passwordMatch) {
      const validationError = new Error("Invalid password");
      validationError.name = "ValidationError";
      validationError.message = "Invalid password";
      return next(validationError);
    }
    const token = sign(
      { name: foundUser.name, email },
      process.env.JWT_SECRET_TOKEN_KEY!,
      { expiresIn: "1h" }
    );
    res.json({ token, message: "Logged In" });
  } catch (error) {
    next(error);
  }
};
