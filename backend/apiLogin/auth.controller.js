const pool = require("../db/connection");
const bcrypt = require("bcryptjs");

// solicitando datos para mostrarlos en pantalla GET
const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nameLast, email, ultimo_login, ultimo_logout FROM users ORDER BY id ASC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("error al obtener usuarios", error);
    res.status(500).json({ message: "error en el server" });
  }
};

// registrando usuario POST
const register = async (req, res) => {
  const { nameLast, email, password, confirmPassword } = req.body;

  if (!nameLast || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Debes completar los campos" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contrasenas no coinciden" });
  }

  try {
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userExist.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Ese email ya se encuentra registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (nameLast, email, password) VALUES ($1, $2, $3)",
      [nameLast, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error en el server" });
  }
};

// realizando login con POST
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }

    const now = new Date();
    await pool.query("UPDATE users SET ultimo_login = $1 WHERE id = $2", [
      now,
      user.id,
    ]);

    res.status(200).json({
      message: "login exitoso",
      user: {
        id: user.id,
        nameLast: user.nameLast,
        email: user.email,
        ultimo_login: now,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error en el server" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.body.id;
    const now = new Date();

    await pool.query("UPDATE users SET ultimo_logout = $1 WHERE id = $2", [
      now,
      userId,
    ]);

    res
      .status(200)
      .json({ message: "logout registrado con exito", ultimo_logout: now });
  } catch (error) {
    console.error("Error al registrar logout", error);
    res.status(500).json({ message: "error al registrar logout" });
  }
};

module.exports = { register, login, getUsers, logoutUser };
