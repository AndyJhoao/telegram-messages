const Model = require("./model");

function addMessage(message) {
  const newMessage = new Model(message);
  newMessage.save();
}

function getMessage(userFilter) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (userFilter !== null) {
      filter = { user: userFilter };
    }
    const messages = Model.find(filter)
      .populate("user")
      .exec((err, populate) => {
        if (err) {
          reject(err);
        } else resolve(populate);
      });
    return messages;
  });
}

async function updateMessage(id, text) {
  const update = await Model.findByIdAndUpdate(
    { _id: id },
    { message: text },
    { new: true, useFindAndModify: false }
  );
  return update;
}

async function deleteMessage(id) {
  const existID = await Model.exists({ _id: id });
  if (existID) {
    return await Model.deleteOne({ _id: id });
  } else return false;
}

module.exports = {
  add: addMessage,
  getList: getMessage,
  update: updateMessage,
  remove: deleteMessage,
};
