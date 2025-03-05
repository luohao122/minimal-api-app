import { NextFunction, Request, Response } from "express";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    if (!name.length || !email.length) {
      throw new Error('')
    }
  } catch (error) {}
};
