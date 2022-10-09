const express = require("express");
const router = express.Router();
const { getUsers, registerUser, loginUser } = require("../controllers/userController");

router.get("/", getUsers);

// admin routes:
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
