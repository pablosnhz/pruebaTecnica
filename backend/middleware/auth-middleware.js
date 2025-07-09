const jwt = require("jsonwebtoken");

function autenticatedToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "el Token no fue proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "el Token es invalido o expirado" });

    req.user = user;
    next();
  });
}

module.exports = autenticatedToken;
