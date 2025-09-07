const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  youtubeLink: { type: String },
  leetcodeLink: { type: String },
  codeforcesLink: { type: String },
  articleLink: { type: String },
  level: { type: String, enum: ["Easy", "Medium", "Tough"], default: "Easy" },
});

module.exports = mongoose.model("Problem", problemSchema);
