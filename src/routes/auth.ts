import express from "express";

import { createUser } from "@controllers/signup";
import { signin } from "@controllers/signin";

const router = express.Router();

export function authRoutes() {
  router.post("/sign-up", createUser);
  router.post("/sign-in", signin);

  return router;
}
