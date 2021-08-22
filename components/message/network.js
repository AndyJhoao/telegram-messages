const express = require("express");
const format = require("date-fns/format");
const res = require("../../network/response");
const controller = require("../message/controller");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const [nombre, extension] = file.originalname.split(".");
    cb(null, nombre + "-" + format(new Date(), "yyyy-MM-dd") + extension);
  },
});
const upload = multer({
  storage,
});

router.get("/", function (request, response) {
  controller
    .getMessages(request.query.chat || null)
    .then((listMessage) => {
      res.success(request, response, listMessage, 200);
    })
    .catch((err) => {
      res.error(request, response, "Error interno", 400, err);
    });
});
router.post("/", upload.single("file"), function (request, response) {
  controller
    .addMessage(request.body.user, request.body.message, request.body.chat)
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
