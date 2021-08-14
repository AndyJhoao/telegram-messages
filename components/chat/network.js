const express = require("express");
const res = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/:id", function (request, response) {
  controller
    .getChat(request.params.id)
    .then((users) => {
      res.success(request, response, users, 200);
    })
    .catch((err) => {
      res.error(request, response, err, 400, "No se pudo traer los usuarios");
    });
});
router.post("/", function (request, response) {
  controller
    .addChat(request.body.users)
    .then((listUsers) => {
      res.success(request, response, listUsers, 201);
    })
    .catch((err) => {
      res.error(
        request,
        response,
        err,
        400,
        "No se pudo traer la lista de usuarios"
      );
    });
});

module.exports = router;
