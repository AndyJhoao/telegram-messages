const { populate } = require("./model");
const Model = require("./model");

function addChat(arrayUsers) {
  const newChat = new Model(arrayUsers);
  return newChat.save();
}
function getChat(filter) {
  let filterId = {};
  return new Promise((resolve, reject) => {
    if (filter) {
      filterId = { users: filter };
    }
    const users = Model.find(filterId)
      .populate("users")
      .exec((error, populated) => {
        if (error) {
          reject(error);
        } else resolve(populated);
      });
    return users;
  });
}

module.exports = {
  add: addChat,
  get: getChat,
};
