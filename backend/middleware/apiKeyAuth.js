import pool from "../config/db.js";

export const apiKeyAuth = async (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE api_key = $1",
      [apiKey]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Invalid API key" });
    }

    // Attach user info to request (useful later)
    req.user = result.rows[0];

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};