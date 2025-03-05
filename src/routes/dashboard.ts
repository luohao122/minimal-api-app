import express from "express";

const router = express.Router();

export const dashboardRoutes = () => {
  router.get("/dashboard");

  return router;
};
