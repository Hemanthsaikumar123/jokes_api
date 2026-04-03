import { getJokesAdvanced } from "../services/joke.service.js";

export const getJokes = async (req, res) => {
  try {
    const { category, limit, sortBy, order } = req.query;

    const jokes = await getJokesAdvanced({
      category,
      limit,
      sortBy,
      order,
    });

    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jokes" });
  }
};