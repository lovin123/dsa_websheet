const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
});

module.exports = mongoose.model("Chapter", chapterSchema);
