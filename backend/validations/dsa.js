const { body, param } = require("express-validator");

exports.chapterValidation = [
  body("name").notEmpty().withMessage("Chapter name is required"),
];

exports.updateChapterValidation = [
  param("id").isMongoId(),
  body("name").notEmpty().withMessage("Chapter name is required"),
];

exports.topicValidation = [
  body("name").notEmpty(),
  body("chapterId").isMongoId(),
];

exports.updateTopicValidation = [
  param("id").isMongoId(),
  body("name").notEmpty(),
];

exports.problemValidation = [
  body("name").notEmpty(),
  body("topicId").isMongoId(),
  body("level").isIn(["Easy", "Medium", "Tough"]),
];

exports.updateProblemValidation = [
  param("id").isMongoId(),
  body("name").notEmpty(),
  body("level").isIn(["Easy", "Medium", "Tough"]),
];

exports.progressValidation = [
  body("problemId").isMongoId(),
  body("completed").isBoolean(),
];
