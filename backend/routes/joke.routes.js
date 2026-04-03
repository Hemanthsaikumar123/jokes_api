import express from "express";
import {
  getRandomJoke,
  getJokesByCategory
} from "../controllers/joke.controller.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.get("/random", apiKeyAuth, getRandomJoke);
router.get("/category/:category", apiKeyAuth, getJokesByCategory);

export default router;