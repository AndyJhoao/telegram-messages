exports.success = function (request, response, message, status) {
  response.status(status || 200).send({
    error: "",
    message,
  });
};
exports.error = function (request, response, error, status, details) {
  console.log("[Response error]: " + details);
  response.status(status || 500).send({
    error,
    message: "",
  });
};
