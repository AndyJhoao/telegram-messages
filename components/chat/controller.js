const store = require("./store");

function addChat(arrayUsers) {
  const chat = {
    users: arrayUsers,
  };
  return store.add(chat);
}
function getChat(id) {
  return store.get(id);
}

module.exports = {
  addChat,
  getChat,
};
