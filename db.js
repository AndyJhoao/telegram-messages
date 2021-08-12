const db = require("mongoose");
db.Promise = global.Promise;

async function conection(uri) {
  db.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log("Base de datos conectada");
    })
    .catch((err) => {
      console.log("Ocurrio un error: " + err.message);
    });
}
module.exports = conection;
