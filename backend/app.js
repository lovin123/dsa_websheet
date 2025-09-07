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
    origin: "http://13.201.28.217:5000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 👇 This ensures Express responds to preflight OPTIONS requests
app.options("*", cors());
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
