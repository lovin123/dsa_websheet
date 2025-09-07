const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { registerValidation, loginValidation } = require("../validations/user");
const auth = require("../middleware/auth");

router.post("/register", registerValidation, userController.register);

router.post("/login", loginValidation, userController.login);

module.exports = router;
// Fetch authenticated user info
router.get("/user", auth, userController.getUser);
