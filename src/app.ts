import express from "express";
import { start } from "@app/server";

const startApp = () => {
  const app = express();
  start(app);
};

startApp();
