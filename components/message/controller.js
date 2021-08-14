const { socket } = require("../../socket");
const format = require("date-fns/format");
const dateFNS = require("date-fns/getHours");
//Otra forma de desestructurar un obj const socket = require("../../socket").socket;
const store = require("./store");
function addMessage(user, message, chat) {
  return new Promise((resolve, reject) => {
    if (!user || !message || !chat) {
      console.log("[MessageController]: No hay usuario o mensaje o chat");
      return reject("Los datos son incorrectos");
    }
    const fullMessage = {
      chat,
      user,
      message,
      date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    };
    // const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    // console.log(dateFNS(new Date(date)));
    store.add(fullMessage);
    socket.io.emit("message", message);
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
