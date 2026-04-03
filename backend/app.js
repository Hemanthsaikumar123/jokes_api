import express from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import jokeRoutes from "./routes/joke.routes.js";


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jokes", jokeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Joke API running 🚀" });
});














const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected ✅");

  } catch (err) {
    console.error("DB connection failed ❌", err);
  }
};

await startServer();

 app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });