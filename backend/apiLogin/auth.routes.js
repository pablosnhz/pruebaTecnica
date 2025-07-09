const express = require("express");
const router = express.Router();
const autenticatedToken = require("../middleware/auth-middleware");
const { register, login, getUsers, logoutUser } = require("./auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", autenticatedToken, getUsers);
router.post("/logout", autenticatedToken, logoutUser);

module.exports = router;
