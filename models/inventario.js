const { Schema, model } = require("mongoose");

const InventarioSchema = Schema({
  serial: {
    type: String,
    unique: true,
    required: [true, "Serial obligatorio"],
  },
  modelo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  foto_equipo: {
    type: String,
  },
  color: {
    type: String,
  },
  fecha_compra: {
    type: Date,
    default: new Date(),
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: "Marcas",
    required: true,
  },
  estado_equipo: {
    type: Schema.Types.ObjectId,
    ref: "Estado",
    required: true,
  },
  tipo_equipo: {
    type: Schema.Types.ObjectId,
    ref: "TipoEquipo",
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model("Inventario", InventarioSchema);
