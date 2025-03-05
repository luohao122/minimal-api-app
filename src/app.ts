import express from "express";
import { start } from "@app/server";

export const USERS_DB: { name: string; email: string; password: string }[] = [];

const startApp = () => {
  const app = express();
  start(app);
};

startApp();
