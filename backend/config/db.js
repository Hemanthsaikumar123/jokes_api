import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Check backend/.env and env loading order.");
}

// console.log("Database URL:", databaseUrl);
const pool = new Pool({
  connectionString: databaseUrl,
});

export default pool;