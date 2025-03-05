import { Application } from "express";

import { authRoutes } from "@routes/auth";
import { dashboardRoutes } from "@routes/dashboard";

export const appRoutes = (app: Application) => {
  app.use(authRoutes());
  app.use(dashboardRoutes());
};
