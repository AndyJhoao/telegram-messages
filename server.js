const express = require("express");
const app = express();
const server = require("http").Server(app);

const router = require("./network/routes");
const socket = require("./socket");
const db = require("./db");
require("dotenv").config();

db(process.env.DB_URI);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
//app.use(router);
socket.connect(server);
router(app);
// app.use("/", function (request, response) {
//   response.send("Hola");
// });

app.use("/app", express.static("./public"));

server.listen(3000, function () {
  console.log("La aplicacion esta escuchando en http://localhost:3000");
});

/*router.get("/", function (request, response) {
  CACHEANDO INFO DEL BODY Y QUERY
  console.log(request.body.text);
  console.log(request.query);
  console.log(request.headers);
  RESPUESTA CREANDO UN HEADER PERSONALIZADO
  response.header({ "custom-header": "esto es una cabecera personalizada" });
});

router.post("/", function (request, response) {
  RESPUESTA CON STATUS 201 ESTRUCTURADO
  response.status(201).send({
    error: "",
    message: "Creado correctamente",
  });
  if (request.query.error == "ok") {
    res.error(request, response, "Ocurrio un error simulado", 400);
  } else {
    res.success(request, response, "Creado correctamente", 201);
  }
});*/
