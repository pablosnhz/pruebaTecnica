const express = require("express");
const router = express.Router();
const { register, login, getUsers, logoutUser } = require("./auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.post("/logout", logoutUser);

module.exports = router;
