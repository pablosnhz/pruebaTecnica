const cors = require("cors");
const express = require("express");
const app = express();

const taskRoutes = require("./apiTask/task.routes");
const authRoutes = require("./apiLogin/auth.routes");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`puerto corriendo en el ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("server deploy corriendo con exito");
});
