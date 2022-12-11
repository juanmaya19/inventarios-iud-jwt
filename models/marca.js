const { model, Schema } = require("mongoose");

const MarcasSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
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

module.exports = model("Marcas", MarcasSchema);
