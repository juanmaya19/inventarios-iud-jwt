const Usuarios = require("../models/usuario");
const { request, response } = require("express");
const crypt = require("bcryptjs");
const generarJWT = require("../utils/JWT");

const login = async (req = request, res = response) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        msg: "Ingrese Email",
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        msg: "Ingrese Password",
      });
    }

    req.body.email = req.body.email.toUpperCase();

    const UsuarioDB = await Usuarios.findOne({
      email: req.body.email,
    });

    if (!UsuarioDB) {
      return res.status(404).json({
        msg: "Usuario no existe",
      });
    }

    const compare = crypt.compareSync(req.body.password, UsuarioDB.password);

    if (!compare) {
      return res.status(400).json({
        msg: "Datos incorrectos",
      });
    }

    const token = generarJWT(UsuarioDB);

    return res.status(200).json({
      msg: ` Sección iniciada ${UsuarioDB.nombre} `,
      rol: UsuarioDB.rol,
      access_token: token,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Solicitud no procesada",
    });
  }
};

module.exports = login;
