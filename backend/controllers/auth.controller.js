import pool from "../config/db.js";
import { generateApiKey } from "../utils/generateApiKey.js";

export const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Registering user with email:", email);
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const apiKey = generateApiKey();

    const result = await pool.query(
      "INSERT INTO users (email, api_key) VALUES ($1, $2) RETURNING *",
      [email, apiKey]
    );

    res.status(201).json({
      message: "User registered successfully",
      apiKey: result.rows[0].api_key,
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};