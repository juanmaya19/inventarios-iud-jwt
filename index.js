const app = require('./app');

const { mongoConnect } = require('./db/config');

const dotenv = require("dotenv").config();

app.set("port", process.env.PORT || 5000);

const connect = mongoConnect();

app.listen(app.get('port'), () => {
    console.log(`Servidor se ejecutado por el puerto ${app.get('port')}`);
})