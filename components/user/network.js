const express = require("express");
const res = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", function (request, response) {
  controller
    .getUsers(request.query.name)
    .then((listUsers) => {
      res.success(request, response, listUsers, 200);
    })
    .catch((err) => {
      res.error(request, response, err, 400, "No se encontró ningun usuario");
    });
});
router.post("/", function (request, response) {
  controller
    .addUser(request.body.name)
    .then((message) => {
      res.success(request, response, message, 201);
    })
    .catch((err) => {
      res.error(request, response, err, 400, "No se registro el nombre");
    });
});
router.patch("/:id", function (request, response) {
  controller
    .updateUser(request.params.id, request.body.name)
    .then((message) => {
      res.success(request, response, message, 200);
    })
    .catch((err) => {
      res.error(request, response, err, 403, "No se actualizo el nombre");
    });
});
router.delete("/:id", function (request, response) {
  controller
    .removeUser(request.params.id)
    .then((message) => {
      res.success(request, response, message, 205);
    })
    .catch((err) => {
      res.error(request, response, err, 400, "No se pudo eliminar el nombre");
    });
});

module.exports = router;
