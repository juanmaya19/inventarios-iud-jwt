const Marcas = require("../models/marca");

const {
    request,
    response
} = require("express");

const createMarcas = async (req = request, res = response) => {
    try {
        if (req.body.nombre.length < 3) {
            return res
                .status(400)
                .json({
                    msg: "Dato debe ser mayor a 3 caracteres!!"
                });
        }

        const data = {
            nombre: req.body.nombre
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
        };

        const marca = await Marcas.findOne(data);

        if (marca) {
            return res.status(400).json({
                msg: "La marca ya existe"
            });
        }

        const MarcaDB = new Marcas(data);
        MarcaDB.save();
        return res
            .status(200)
            .json({
                msg: "Se creo correctamente la marca",
                MarcaDB
            });
    } catch (e) {
        return res
            .status(500)
            .json({
                Error: 'Solicitud no procesada',
                e
            });
    }
};


const getAllMarcas = async (req = request, res = response) => {
    try {
        const data = req.query;

        if (!data.estado) {
            const MarcasDB = await Marcas.find();
            return res.status(200).json({
                MarcasDB
            });
        } else {
            const MarcasDB = await Marcas.find(data);
            return res.status(200).json({
                MarcasDB
            });
        }
    } catch (e) {
        return res
            .status(500)
            .json({
                Error: "Solicitud no procesada",
                e
            });
    }
};


const getMarcaByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const marcaDB = await Marcas.findById(id);

        if (!marcaDB) {
            return res.status(404).json({
                Error: "No existe la marca"
            });
        }

        return res.status(200).json(marcaDB);
    } catch (e) {
        return res
            .status(500)
            .json({
                Error: "Solicitud no procesada",
                e
            });
    }
};


const updateMarcaByID = async (req = request, res = response) => {
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

        const Marca = await Marcas.findById(id);

        if (!Marca) {
            return res.status(404).json({
                Error: "No existe la marca"
            });
        }

        const MarcaDB = await Marcas.findByIdAndUpdate(id, data, {
            new: true
        });
        return res
            .status(201)
            .json({
                msg: "La marca se actualizo correctamente",
                MarcaDB
            });
    } catch (e) {
        return res
            .status(500)
            .json({
                Error: "Solicitud no procesada",
                e
            });
    }
};


const deleteMarcaByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const Marca = await Marcas.findById(id);

        if (!Marca) {
            return res.status(404).json({
                error: "No existe la marca"
            });
        }

        await Marcas.findByIdAndDelete(id);
        return res
            .status(200)
            .json({
                msg: "Eliminación exitosa, se borró la marca:",
                Marca
            });
    } catch (e) {
        return res
            .status(500)
            .json({
                Error: "Solicitud no procesada",
                e
            });
    }
};

module.exports = {
    createMarcas,
    getAllMarcas,
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID,
};