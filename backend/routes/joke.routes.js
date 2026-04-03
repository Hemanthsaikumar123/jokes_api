import express from "express";
import { getRandomJoke, getJokes } from "../controllers/joke.controller.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.get("/random", apiKeyAuth, getRandomJoke);
router.get("/", apiKeyAuth, getJokes);


export default router;