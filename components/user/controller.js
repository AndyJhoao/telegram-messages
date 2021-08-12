const store = require("./store");

function getUsers(filterUser) {
  return store.get(filterUser);
}
function addUser(name) {
  if (!name) {
    return Promise.reject();
  }
  const user = {
    name,
  };
  return store.add(user);
}
function updateUser(id, name) {
  return new Promise(async (resolve, reject) => {
    if (!id || !name) {
      reject("Datos invalidos");
    }
    let validate = await store.update(id, name);
    if (validate) {
      resolve(validate);
    } else reject("No se encontró el usuario");
  });
}
function removeUser(id) {
  return new Promise(async (resolve, reject) => {
    let validate = await store.remove(id);
    validate
      ? resolve("Nombre eliminado correctamente")
      : reject("No se encontró el nombre");
  });
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  removeUser,
};
