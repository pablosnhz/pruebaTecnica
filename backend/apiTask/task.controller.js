const pool = require("../db/connection");

// get todas las tareas
const getTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    // console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error al obtener tareas" });
  }
};

// post nueva tarea
const createTask = async (req, res) => {
  const { titulo } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (titulo) VALUES ($1) RETURNING *",
      [titulo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error al crear tarea" });
  }
};

// toggle para la task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

// delete por el id
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error al eliminar tarea" });
  }
};

// Exportar todas las funciones
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
