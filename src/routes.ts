import { Application } from "express";

import { authRoutes } from "@routes/auth";

export const appRoutes = (app: Application) => {
  app.use(authRoutes());
};
