const express = require("express");
const app = express();
const db = require("./models");
const userRoutes = require("./routes/user.routes");

app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Init & Sync
app.get("/sync", async (req, res) => {
  await db.sequelize.sync({ force: true });

  await db.User.create(
    {
      name: "Alice",
      email: "alice@example.com",
      profile: {
        bio: "Full Stack Developer",
      },
    },
    {
      include: { model: db.Profile, as: "profile" },
    }
  );

  res.send("Database synced and sample data created");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
