const express = require("express");
const res = require("../../network/response");
const controller = require("../message/controller");
const router = express.Router();

router.get("/", function (request, response) {
  controller
    .getMessages(request.query.user || null)
    .then((listMessage) => {
      res.success(request, response, listMessage, 200);
    })
    .catch((err) => {
      res.error(request, response, "Error interno", 400, err);
    });
});
router.post("/", function (request, response) {
  controller
    .addMessage(request.body.user, request.body.message)
    .then((fullMessage) => {
      res.success(request, response, fullMessage, 201);
    })
    .catch((err) => {
      res.error(request, response, err, 401, "Error en el controlador");
    });
});
router.patch("/:id", function (request, response) {
  controller
    .updateMessage(request.params.id, request.body.message)
    .then((data) => {
      res.success(request, response, data, 200);
    })
    .catch((err) => {
      res.error(request, response, err, 401, "No envio ningun mensaje");
    });
});
router.delete("/:id", function (request, response) {
  controller
    .deleteMessage(request.params.id)
    .then((data) => {
      res.success(request, response, data, 202);
    })
    .catch((err) => {
      res.error(request, response, err, 401, "No se encontró el ID en la BD");
    });
});

module.exports = router;
