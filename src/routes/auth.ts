import express from "express";

const router = express.Router();

export function authRoutes() {
  router.post("/sign-up", (req, res) => {
    console.log("reached sign up route");
  });

  return router;
}
