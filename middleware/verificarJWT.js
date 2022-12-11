const JWT = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      Error: "°°Acceso no permitido°°",
    });
  }

  try {
    const payload = JWT.verify(token, "juanmaya19");
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      Error: "°°Acceso no permitido°°",
    });
  }
};

module.exports = validarJWT;
