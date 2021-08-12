const store = require("./store");
function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.log("[MessageController]: No hay usuario o contraseña");
      return reject("Los datos son incorrectos");
    }
    const fullMessage = {
      user,
      message,
      date: new Date(),
    };
    store.add(fullMessage);
    resolve(fullMessage);
  });
}
function getMessages(userFilter) {
  return new Promise((resolve, reject) => {
    resolve(store.getList(userFilter));
  });
}
function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      return reject("Informacion invalida");
    } else {
      await resolve(store.update(id, message));
    }
  });
}
function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject("ID invalido");
    }
    store
      .remove(id)
      .catch((err) => {
        reject(err);
      })
      .then((data) => {
        if (data) {
          resolve("Mensaje eliminado correctamente");
        } else reject("No se encontró el mensaje");
      });
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
