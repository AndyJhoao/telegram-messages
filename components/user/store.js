const Model = require("./model");

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}
async function getUser(filterUser) {
  let filter = {};
  if (filterUser) {
    filter = { name: filterUser };
  }
  const listUser = await Model.find(filter);
  return listUser;
}
async function updateUser(id, name) {
  let validate = await Model.exists({ _id: id });
  if (validate) {
    const update = Model.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true, useFindAndModify: false }
    );
    return update;
  }
  return validate;
}

async function removeUser(id) {
  let validate = await Model.exists({ _id: id });
  if (validate) {
    return await Model.deleteOne({ _id: id });
  } else {
    return validate;
  }
}

module.exports = {
  add: addUser,
  get: getUser,
  update: updateUser,
  remove: removeUser,
};
