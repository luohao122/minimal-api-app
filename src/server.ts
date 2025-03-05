import http from "http";

import { Application, json } from "express";
import dotenv from "dotenv";

import { appRoutes } from "@app/routes";
import { verify } from "jsonwebtoken";

dotenv.config();

const PORT = process.env.PORT;

export const start = (app: Application) => {
  // securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startServer(app);
};

// const securityMiddleware = (app: Application) => {
//   app.use((req, _res, next) => {
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1];
//       const payload = verify(token, process.env.JWT_SECRET_TOKEN_KEY!) as {
//         name: string;
//         email: string;
//       };
//       // @ts-ignore
//       req.currentUser = payload;
//     }
//     next();
//   });
// };

const standardMiddleware = (app: Application) => {
  app.use(json({ limit: "200mb" }));
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
