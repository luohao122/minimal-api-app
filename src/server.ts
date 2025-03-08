import http from "http";

import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { WebSocketServer } from "ws";

import { useServer } from "graphql-ws/use/ws";
import { schema } from "./graphql";

import { appRoutes } from "@app/routes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
  perMessageDeflate: false,
});

const serverCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

export const start = async () => {
  await standardMiddleware();
  routesMiddleware();
  await startServer();
};

const standardMiddleware = async () => {
  app.use(json({ limit: "200mb" }));
  app.use(cors());

  await apolloServer.start();

  app.use(
    "/graphql",
    cors({ origin: "*", credentials: true }),
    express.json({ limit: "200mb" }),
    express.urlencoded({ extended: true, limit: "200mb" }),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
};

const routesMiddleware = () => {
  appRoutes(app);
};

const startServer = async () => {
  try {
    console.log(`Server has started with process id ${process.pid}`);
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`startServer error`, error);
  }
};
