const Chapter = require("../models/Chapter");
const Topic = require("../models/Topic");
const Problem = require("../models/Problem");
const User = require("../models/User");
const Progress = require("../models/Progress");

exports.getDSASheet = async (req, res) => {
  try {
    const chapters = await Chapter.find().populate({
      path: "topics",
      populate: {
        path: "problems",
      },
    });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// Chapter CRUD
exports.createChapter = async (req, res) => {
  try {
    const { name } = req.body;
    const chapter = new Chapter({ name });
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to create chapter" });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const chapter = await Chapter.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!chapter) return res.status(404).json({ error: "Chapter not found" });
    res.json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update chapter" });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
    await Chapter.findByIdAndDelete(id);
    res.json({ message: "Chapter deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete chapter" });
  }
};

// Topic CRUD
exports.createTopic = async (req, res) => {
  try {
    const { name, chapterId } = req.body;
    const topic = new Topic({ name, chapter: chapterId });
    await topic.save();
    await Chapter.findByIdAndUpdate(chapterId, {
      $push: { topics: topic._id },
    });
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to create topic" });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const topic = await Topic.findByIdAndUpdate(id, { name }, { new: true });
    if (!topic) return res.status(404).json({ error: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update topic" });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await Topic.findByIdAndDelete(id);
    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete topic" });
  }
};

// Problem CRUD
exports.createProblem = async (req, res) => {
  try {
    const {
      name,
      topicId,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
      level,
    } = req.body;
    const problem = new Problem({
      name,
      topic: topicId,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
      level,
    });
    await problem.save();
    await Topic.findByIdAndUpdate(topicId, {
      $push: { problems: problem._id },
    });
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to create problem" });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
      level,
    } = req.body;
    const problem = await Problem.findByIdAndUpdate(
      id,
      { name, youtubeLink, leetcodeLink, codeforcesLink, articleLink, level },
      { new: true }
    );
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update problem" });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    await Problem.findByIdAndDelete(id);
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to delete problem" });
  }
};

// Progress Tracking
exports.markProblemCompleted = async (req, res) => {
  try {
    const userId = req.user;
    const { problemId, completed } = req.body;
    let progress = await Progress.findOne({ user: userId, problem: problemId });
    if (progress) {
      progress.completed = completed;
      await progress.save();
    } else {
      progress = new Progress({ user: userId, problem: problemId, completed });
      await progress.save();
    }
    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to update progress" });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user;
    const progress = await Progress.find({ user: userId });
    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to get progress" });
  }
};
