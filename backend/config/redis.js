import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL, // Redis Cloud URL
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

await client.connect();

await client.set("test", "hello redis");
const val = await client.get("test");
console.log(val);

console.log("Redis connected 🔥");

export default client;