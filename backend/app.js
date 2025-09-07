require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dsaRoutes = require("./routes/dsaRoutes");
const connectDB = require("./config/mongo");

const path = require("path");
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/dsa", dsaRoutes);

// Serve static frontend build
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith("/api/")) {
    res.sendFile(path.join(buildPath, "index.html"));
  }
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
