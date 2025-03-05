import express from "express";

import { authMiddleware } from "@middlewares/authMiddleware";

const router = express.Router();

export const dashboardRoutes = () => {
  router.get("/dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the dashboard!" });
  });

  return router;
};
