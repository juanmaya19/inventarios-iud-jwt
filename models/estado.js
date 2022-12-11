const { model, Schema } = require("mongoose");

const EstadoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nombre requerido"],
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

module.exports = model("Estado", EstadoSchema);
