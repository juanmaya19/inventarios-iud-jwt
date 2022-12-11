const TipoEquipo = require("../models/tipoEquipo");

const {
    request,
    response
} = require("express");

const createTipoEquipo = async (req = request, res = response) => {
    try {
        if (req.body.nombre.length < 3) {
            return res.status(400).json({
                msg: "",
            });
        }

        const nombre = req.body.nombre
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        const tipoEquipoBD = await TipoEquipo.findOne({
            nombre,
        });

        if (tipoEquipoBD) {
            return res.status(400).json({
                msg: "El tipo de equipo ya existe",
            });
        }

        const datos = {
            nombre,
        };

        const tipoEquipo = new TipoEquipo(datos);

        await tipoEquipo.save();
        return res.status(201).json({
            msg: "Se creo correctamente el tipo de equipo",
            tipoEquipo,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const getTipoEquipos = async (req = request, res = response) => {
    try {
        const estado = req.query;

        if (!estado.estado) {
            const tipoequiposBD = await TipoEquipo.find();
            return res.json(tipoequiposBD);
        } else {
            const tipoequiposBD = await TipoEquipo.find(estado);
            return res.json(tipoequiposBD);
        }
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const getTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const tipoEquipoDB = await TipoEquipo.findById(id);

        if (!tipoEquipoDB) {
            return res.status(404).json({
                Error: "No existe el tipo de equipo",
            });
        }

        return res.json(tipoEquipoDB);
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const updateTipoEquipoById = async (req = request, res = response) => {
    try {
        if (req.body.nombre) {
            req.body.nombre = req.body.nombre
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const val = await TipoEquipo.findById(id);

        if (!val) {
            return res.status(404).json({
                Error: "No existe el tipo de equipo",
            });
        }

        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, {
            new: true,
        });
        return res.json({
            msg: "El tipo de equipo se actualizo correctamente",
            tipoEquipo,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const deleteTipoEquipoById = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const TipoEquipoBD = await TipoEquipo.findById(id);

        if (!TipoEquipoBD) {
            return res.status(404).json({
                Error: "No existe el tipo de equipo",
            });
        }

        await TipoEquipo.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "Eliminación exitosa, se borró el tipo de equipo:",
            TipoEquipoBD,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

module.exports = {
    createTipoEquipo,
    getTipoEquipos,
    getTipoEquipoById,
    updateTipoEquipoById,
    deleteTipoEquipoById,
};