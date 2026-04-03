import express from "express";
import { getJokes } from "../controllers/joke.controller.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.get("/", apiKeyAuth, getJokes);

export default router;