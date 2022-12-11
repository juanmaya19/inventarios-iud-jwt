const express = require("express");

const app = express();

const cors = require("cors")
const fileUpload = require("express-fileupload")


const tipoEquipos = require("./routes/tipoEquipo");
const Estados = require("./routes/estado");
const Marcas = require("./routes/marca")
const Usuarios = require("./routes/usuario")
const Inventarios = require("./routes/inventario")
const Login = require("./routes/login")


app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(cors({
    origin: "*"
}));


app.use("/api/tipoequipos", tipoEquipos);
app.use("/api/estados", Estados);
app.use("/api/marcas", Marcas);
app.use("/api/usuarios", Usuarios);
app.use("/api/inventarios", Inventarios);
app.use("/api/login", Login);

app.get("*", (req, res) => {
    return res.status(404).json({
        Error: 'Pagina  no encontrada'
    });
});

module.exports = app;