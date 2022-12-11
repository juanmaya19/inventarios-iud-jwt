const Inventario = require("../models/inventario");
const {
    request,
    response
} = require("express");

const Estado = require("../models/estado");
const Marcas = require("../models/marca");
const TipoEquipo = require("../models/tipoEquipo");
const Usuarios = require("../models/usuario");

const path = require("path");
const fs = require("fs");
const {
    v4: uuidv4
} = require("uuid");

const createInventario = async (req = request, res = response) => {

    try {

        const inventarioDB = await Inventario.findOne({
            serial: req.body.serial
        })

        if (inventarioDB) {
            return res.status(400).json({
                msg: 'Inventario ya existe'
            })
        }

        if (req.body.serial && req.body.modelo) {
            req.body.serial = req.body.serial.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            req.body.modelo = req.body.modelo.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        } else {
            return res.status(500).json({
                Error: 'Error, Debe crear Serial y Modelo'
            });
        }

        if (req.body.descripcion) {
            req.body.descripcion = req.body.descripcion.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const data = req.body;

        const {
            marca,
            usuario,
            tipo_equipo,
            estado_equipo
        } = data;

        const marcaDB = await Marcas.findOne({
            _id: marca._id,
            estado: true
        })
        const usuarioDB = await Usuarios.findOne({
            _id: usuario._id,
            estado: true
        })
        const tipo_equipoDB = await TipoEquipo.findOne({
            _id: tipo_equipo._id,
            estado: true
        })
        const estadoDB = await Estado.findOne({
            _id: estado_equipo._id,
            estado: true
        })

        if (!marcaDB) {
            return res.status(404).json({
                Error: 'Marca Inactiva'
            });
        }

        if (!usuarioDB) {
            return res.status(404).json({
                Error: 'Usuario Inactivo'
            });
        }

        if (!tipo_equipoDB) {
            return res.status(404).json({
                Error: 'Tipo Equipo Inactivo'
            });
        }

        if (!estadoDB) {
            return res.status(404).json({
                Error: 'Estado Inactivo'
            });
        }

        const inventario = new Inventario(data);

        await inventario.save();
        return res.status(201).json({
            msg: "Inventario creado correctamente",
            inventario
        })

    } catch (e) {
        return res.status(500).json({
            Error: 'Solicitud no procesada',
            e
        });
    }

}



const getAllInventario = async (req = request, res = response) => {

    try {

        const data = req.query

        if (!data.estado) {
            const inventarioDB = await Inventario.find().populate({
                path: 'usuario'
            }).populate({
                path: 'marca'
            }).populate({
                path: 'estado_equipo'
            }).populate({
                path: 'tipo_equipo'
            });
            return res.json({
                inventarioDB
            });
        } else {
            const inventarioDB = await Inventario.find(data).populate({
                path: 'usuario'
            }).populate({
                path: 'marca'
            }).populate({
                path: 'estado_equipo'
            }).populate({
                path: 'tipo_equipo'
            });
            return res.json({
                inventarioDB
            });
        }

    } catch (e) {
        return res.status(500).json({
            Error: 'Solicitud no procesada',
            e
        });
    }
}


const getInventarioByID = async (req = request, res = response) => {
    try {

        const id = req.params.id;
        const inventarioDB = await Inventario.findById(id).populate({
            path: 'usuario'
        }).populate({
            path: 'marca'
        }).populate({
            path: 'estado_equipo'
        }).populate({
            path: 'tipo_equipo'
        });

        if (!inventarioDB) {
            return res.status(404).json({
                Error: "Inventario no existe"
            });
        };

        return res.status(200).json(inventarioDB)
    } catch (e) {
        return res.status(500).json({
            Error: 'Solicitud no procesada',
            e
        });
    }
}


const updateInventarioByID = async (req = request, res = response) => {
    try {

        const {
            id
        } = req.params;

        if (req.body.serial) {
            req.body.serial = req.body.serial.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        if (req.body.modelo) {
            req.body.modelo = req.body.modelo.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        if (req.body.descripcion) {
            req.body.descripcion = req.body.descripcion.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const data = req.body;

        const {
            marca,
            usuario,
            tipo_equipo,
            estado_equipo
        } = data;

        if (marca) {
            const marcaDB = await Marcas.findOne({
                _id: marca._id,
                estado: true
            });

            if (!marcaDB) {
                return res.status(404).json({
                    Error: 'La marca esta inactiva'
                });
            }
        }

        if (usuario) {
            const usuarioDB = await Usuarios.findOne({
                _id: usuario._id,
                estado: true
            })

            if (!usuarioDB) {
                return res.status(404).json({
                    Error: 'El usuario esta inactivo'
                });
            }
        }

        if (tipo_equipo) {
            const tipo_equipoDB = await TipoEquipo.findOne({
                _id: tipo_equipo._id,
                estado: true
            })
            if (!tipo_equipoDB) {
                return res.status(404).json({
                    Error: 'El tipo de equipo esta inactivo'
                });
            }
        }

        if (estado_equipo) {
            const estadoDB = await Estado.findOne({
                _id: estado_equipo._id,
                estado: true
            })

            if (!estadoDB) {
                return res.status(404).json({
                    Error: 'El estado esta inactivo'
                });
            }
        }

        const inventario = await Inventario.findByIdAndUpdate(id, data, {
            new: true
        });

        await inventario.save();
        return res.status(201).json({
            msg: "El inventario se actualizo correctamente",
            inventario
        })

    } catch (e) {
        return res.status(500).json({
            Error: 'Solicitud no procesada',
            e
        });
    }
}


const deleteInventarioByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const inventarioDB = await Inventario.findById(id);

        if (!inventarioDB) {
            return res.status(404).json({
                Error: "Inventario no encontrado"
            });
        }

        await Inventario.findByIdAndDelete(id)

        return res.status(200).json({
            msg: "Eliminación exitosa, se borró el inventario:",
            inventarioDB
        })
    } catch (e) {
        return res.status(500).json({
            Error: 'Solicitud no procesada',
            e
        });
    }
}

const uploadImageByID = async (req = request, res = response) => {
    const {
        id
    } = req.params;
    const invBD = await Inventario.findOne({
        _id: id
    });
    if (!invBD) {
        return res.status(400).json({
            msg: 'No existe el inventario'
        });
    }
    if (!req.files || Object.keys(req.files) == 0 || !req.files.foto) {
        return res.status(400).json({
            msj: 'Sin fotos para subir'
        });
    }
    const foto = req.files.foto;

    const extFileArray = foto.name.split('.');
    const extFile = extFileArray[extFileArray.length - 1];

    const extensiones = ['jpg', 'png', 'jpeg'];

    if (!extensiones.includes(extFile)) {
        return res.status(400).json({
            msj: 'Archivo no válido'
        });
    }

    const nombreFileTemp = uuidv4() + "." + extFile;

    const uploadPath = path.join(__dirname, '../uploads/', nombreFileTemp);
    foto.mv(uploadPath, e => {
        if (e) {
            return res.status(500).json({
                e
            });
        }
    });
    const data = {};
    data.foto = nombreFileTemp;

    const inv = await Inventario.findByIdAndUpdate(id, data, {
        new: true
    });
    if (!inv) {
        return res.status(500).send(e);
    }
    res.json({
        msj: 'Subido a ' + uploadPath
    });
}


const getImageByID = async (req = request, res = response) => {
    const {
        id
    } = req.params;
    const inventarioBD = await Inventario.findOne({
        _id: id
    });

    if (!inventarioBD.foto) {
        return res.status(404).json({
            Error: "Imagen no encontrada"
        });
    }

    const nombreFoto = inventarioBD.foto;
    const pathImg = path.join(__dirname, '../uploads/', nombreFoto);
    if (fs.existsSync(pathImg))
        res.sendFile(pathImg);
}

module.exports = {
    createInventario,
    getAllInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImageByID,
    getImageByID
}