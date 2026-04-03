import pool from "../config/db.js";

export const getRandomJokeFromDB = async () => {
  const result = await pool.query(
    "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1"
  );
  return result.rows[0];
};

export const getJokesByCategoryFromDB = async (category) => {
  const result = await pool.query(
    "SELECT * FROM jokes WHERE category = $1",
    [category]
  );
  return result.rows;
};