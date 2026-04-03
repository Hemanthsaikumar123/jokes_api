import redisClient from "../config/redis.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }

    const key = `rate:${apiKey}`;

    // Increment request count
    const count = await redisClient.incr(key);

    // Set expiry (only when first request)
    if (count === 1) {
      await redisClient.expire(key, 60); // 60 seconds
    }

    // Limit check
    if (count > 10) {
      return res.status(429).json({
        error: "Too many requests. Try again later.",
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ error: "Server error" });
  }
};