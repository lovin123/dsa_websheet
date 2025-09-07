const express = require("express");
const router = express.Router();
const dsaController = require("../controllers/dsaController");
const auth = require("../middleware/auth");
const {
  chapterValidation,
  updateChapterValidation,
  topicValidation,
  updateTopicValidation,
  problemValidation,
  updateProblemValidation,
  progressValidation,
} = require("../validations/dsa");

// DSA Sheet
router.get("/sheet", auth, dsaController.getDSASheet);

// Chapter CRUD
router.post("/chapter", auth, chapterValidation, dsaController.createChapter);
router.put(
  "/chapter/:id",
  auth,
  updateChapterValidation,
  dsaController.updateChapter
);
router.delete("/chapter/:id", auth, dsaController.deleteChapter);

// Topic CRUD
router.post("/topic", auth, topicValidation, dsaController.createTopic);
router.put(
  "/topic/:id",
  auth,
  updateTopicValidation,
  dsaController.updateTopic
);
router.delete("/topic/:id", auth, dsaController.deleteTopic);

// Problem CRUD
router.post("/problem", auth, problemValidation, dsaController.createProblem);
router.put(
  "/problem/:id",
  auth,
  updateProblemValidation,
  dsaController.updateProblem
);
router.delete("/problem/:id", auth, dsaController.deleteProblem);

// Progress Tracking
router.post(
  "/progress",
  auth,
  progressValidation,
  dsaController.markProblemCompleted
);
router.get("/progress", auth, dsaController.getUserProgress);

module.exports = router;
