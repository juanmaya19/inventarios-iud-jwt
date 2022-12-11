const { Schema, model } = require("mongoose");

const tipoEquipoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nombre obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: new Date(),
  },
  fecha_actualizacion: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("TipoEquipo", tipoEquipoSchema);
