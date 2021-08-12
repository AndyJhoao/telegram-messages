const express = require("express");
const router = require("./network/routes");
const db = require("./db");

require("dotenv").config();

db(process.env.DB_URI);
var app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
//app.use(router);
router(app);
// app.use("/", function (request, response) {
//   response.send("Hola");
// });

app.use("/app", express.static("./public"));

app.listen(3000);
console.log("La aplicacion esta escuchando en http://localhost:3000");

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
