const cors = require("cors");
const express = require("express");
const pool = require("./db/connection");
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

app.get("/check-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.json({ database: result.rows[0].current_database });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verificando base de datos");
  }
});
