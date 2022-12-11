const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Proceso correcto !!Conexión exitosa!!");
    } catch (e) {
        console.log("No se pudo conectar con MongoDB", e);
        throw new Error("No se pudo conectar con MongoDB");
    }
}

module.exports = {
    mongoConnect
};