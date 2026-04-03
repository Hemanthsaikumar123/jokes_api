import { getJokesAdvanced } from "../services/joke.service.js";
import redisClient from "../config/redis.js";

export const getJokes = async (req, res) => {
  try {
    const { category, limit, sortBy, order } = req.query;

    // 🔑 Create unique cache key
    const cacheKey = `jokes:${category || "all"}:${limit || 10}:${sortBy || "id"}:${order || "asc"}`;

    // 1️⃣ Check Redis
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache HIT ⚡");
      return res.json(JSON.parse(cachedData));
    }

    console.log("Cache MISS ❌");

    // 2️⃣ Fetch from DB
    const jokes = await getJokesAdvanced({
      category,
      limit,
      sortBy,
      order,
    });

    // 3️⃣ Store in Redis (TTL = 60 sec)
    await redisClient.setEx(cacheKey, 60, JSON.stringify(jokes));

    res.json(jokes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jokes" });
  }
};