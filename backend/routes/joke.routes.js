import express from "express";
import { getRandomJoke, getJokes } from "../controllers/joke.controller.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();


router.get("/", apiKeyAuth, rateLimiter, getJokes);
router.get("/random", apiKeyAuth, rateLimiter, getRandomJoke);


export default router;