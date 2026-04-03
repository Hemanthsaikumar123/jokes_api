import express from "express";
import { getRandomJoke } from "../controllers/joke.controller.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router = express.Router();

// Protected route
router.get("/random", apiKeyAuth, getRandomJoke);

export default router;