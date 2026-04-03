import pool from "../config/db.js";


export const getRandomJokeFromDB = async () => {
  const result = await pool.query(
    "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1"
  );
  return result.rows[0];
};



export const getJokesAdvanced = async ({ category, limit, sortBy, order }) => {
  let query = "SELECT * FROM jokes";
  const values = [];

  // Filter
  if (category) {
    values.push(category);
    query += ` WHERE category = $${values.length}`;
  }

  // Sorting
  const validSortFields = ["id", "created_at"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "id";

  const sortOrder = order === "desc" ? "DESC" : "ASC";

  query += ` ORDER BY ${sortField} ${sortOrder}`;

  // Limit
  const finalLimit = limit ? parseInt(limit) : 10;
  query += ` LIMIT ${finalLimit}`;

  const result = await pool.query(query, values);

  return result.rows;
};