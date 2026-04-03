import {
  getRandomJokeFromDB,
  getJokesByCategoryFromDB
} from "../services/joke.service.js";

export const getRandomJoke = async (req, res) => {
  try {
    const joke = await getRandomJokeFromDB();

    res.json({
      joke: joke.content,
      category: joke.category
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch joke" });
  }
};

export const getJokesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const jokes = await getJokesByCategoryFromDB(category);

    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jokes" });
  }
};