const express = require("express");
const app = express();
const taskRoutes = require("./apiTask/task.routes");
const authRoutes = require("./apiLogin/auth.routes");

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
