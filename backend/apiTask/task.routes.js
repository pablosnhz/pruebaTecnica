const express = require("express");
const router = express.Router();
const taskController = require("./task.controller");

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
