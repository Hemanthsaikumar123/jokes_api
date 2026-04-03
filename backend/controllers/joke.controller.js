export const getRandomJoke = async (req, res) => {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs 🐛",
    "Why did the developer go broke? Because he used up all his cache 💸",
    "Why do Java developers wear glasses? Because they don’t C# 🤓"
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  res.json({
    joke: randomJoke,
    user: req.user.email   // just to verify auth works
  });
};