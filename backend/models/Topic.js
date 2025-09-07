const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
});

module.exports = mongoose.model("Topic", topicSchema);
