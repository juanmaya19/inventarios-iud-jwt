const Usuarios = require("../models/usuario");

const {
    request,
    response
} = require("express");

const crypt = require("bcryptjs");

const createUsuario = async (req = request, res = response) => {
    try {
        if (req.body.nombre.length < 3) {
            return res.status(400).json({
                msg: "ERROR",
            });
        }

        if (req.body.email.length < 8) {
            return res.status(400).json({
                msg: "ERROR",
            });
        }

        if (req.body.password.length < 1) {
            return res.status(400).json({
                msg: "ERROR",
            });
        }

        if (!req.body.rol) {
            return res.status(400).json({
                msg: "",
            });
        }

        const salt = crypt.genSaltSync();

        const pass = crypt.hashSync(req.body.password, salt);

        const data = {
            nombre: req.body.nombre
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            email: req.body.email
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            password: pass,
            rol: req.body.rol.toUpperCase(),
        };

        const usuarioDB = await Usuarios.findOne({
            email: data.email,
        });

        if (usuarioDB) {
            return res.status(400).json({
                msg: "El usuario ya existe",
            });
        }

        const usuarioSchema = new Usuarios(data);
        await usuarioSchema.save();
        return res.status(201).json({
            msg: "Se creo correctamente el usuario",
            usuarioSchema,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const getAllUsuarios = async (req = request, res = response) => {
    try {
        const data = req.query;

        if (!data.estado) {
            const usuarioDB = await Usuarios.find();
            return res.json({
                usuarioDB,
            });
        } else {
            const usuarioDB = await Usuarios.find(data);
            return res.json({
                usuarioDB,
            });
        }
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const getUsuarioByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const usuario = await Usuarios.findById(id);

        if (!usuario) {
            return res.status(404).json({
                Error: "No existe el usuario",
            });
        }

        return res.status(200).json(usuario);
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const updateUsuarioByID = async (req = request, res = response) => {
    try {
        if (req.body.nombre) {
            req.body.nombre = req.body.nombre
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        }

        if (req.body.email) {
            req.body.email = req.body.email
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        }

        if (req.body.rol) {
            req.body.rol = req.body.rol
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        }

        if (req.body.password) {
            const salt = crypt.genSaltSync();
            req.body.password = crypt.hashSync(req.body.password, salt);
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const val = await Usuarios.findById(id);

        if (!val) {
            return res.status(404).json({
                Error: "No existe el usuario",
            });
        }

        const usuarioDB = await Usuarios.findByIdAndUpdate(id, data, {
            new: true,
        });
        return res.status(201).json({
            msg: "El usuario se actualizo correctamente",
            usuarioDB,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const deleteUsuarioByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const usuarioDB = await Usuarios.findById(id);

        if (!usuarioDB) {
            return res.status(404).json({
                Error: "No existe el usuario",
            });
        }

        await Usuarios.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "Eliminación exitosa, se borró el usuario:",
            usuarioDB,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

module.exports = {
    createUsuario,
    getAllUsuarios,
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID,
};