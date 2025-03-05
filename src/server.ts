import http from "http";

import { Application } from "express";
import dotenv from "dotenv";
import { appRoutes } from "@app/routes";

dotenv.config();

const PORT = process.env.PORT;

export const start = (app: Application) => {
  startServer(app);
  routesMiddleware(app);
};

const routesMiddleware = (app: Application) => {
  appRoutes(app);
};

const startServer = (app: Application) => {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.log(`Server has started with process id ${process.pid}`);
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`startServer error`, error);
  }
};
