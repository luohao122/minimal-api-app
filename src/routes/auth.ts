import express from "express";

import { createUser } from "@controllers/signup";

const router = express.Router();

export function authRoutes() {
  router.post("/sign-up", createUser);

  return router;
}
