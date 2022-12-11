const Estado = require("../models/estado");

const {
    request,
    response
} = require("express");

const createEstado = async (req = request, res = response) => {
    try {
        if (req.body.nombre.length < 3) {
            return res.status(400).json({
                msg: "Dato debe ser mayor a 3 caracteres!!",
            });
        }

        const data = {
            nombre: req.body.nombre
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
        };
        const estadoDB = await Estado.findOne(data);

        if (estadoDB) {
            return res.status(400).json({
                msg: "Estado ya existe",
            });
        }

        const estadoSchema = new Estado(data);
        await estadoSchema.save();
        return res.status(201).json({
            msg: "Estado creado correctamente!",
            estadoSchema,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const getAllEstados = async (req = request, res = response) => {
    try {
        const data = req.query;

        if (!data.estado) {
            const estadosDB = await Estado.find();
            return res.json({
                estadosDB,
            });
        } else {
            const estadosDB = await Estado.find(data);
            return res.json({
                estadosDB,
            });
        }
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const getEstadoByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const estado = await Estado.findById(id);

        if (!estado) {
            return res.status(404).json({
                Error: "Estado no encontrado",
            });
        }

        return res.status(200).json(estado);
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const updateEstadobyID = async (req = request, res = response) => {
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

        const val = await Estado.findById(id);

        if (!val) {
            return res.status(404).json({
                Error: "Estado no existe en el sistema",
            });
        }

        const estadoDB = await Estado.findByIdAndUpdate(id, data, {
            new: true,
        });
        return res.status(201).json({
            msg: "Se actualizó correctamente",
            estadoDB,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

const deleteEstadobyID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const estadoDB = await Estado.findById(id);

        if (!estadoDB) {
            return res.status(404).json({
                Error: "Estado no encontrado",
            });
        }

        await Estado.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "Eliminación exitosa, se borró Estado:",
            estadoDB,
        });
    } catch (e) {
        return res.status(500).json({
            Error: "Solicitud no procesada",
            e,
        });
    }
};

module.exports = {
    createEstado,
    getAllEstados,
    getEstadoByID,
    updateEstadobyID,
    deleteEstadobyID,
};