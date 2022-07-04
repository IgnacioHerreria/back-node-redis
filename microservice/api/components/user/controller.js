const store = require("../../../store/dummy");
const TABLE = "user";
const auth = require("../auth");

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  function get() {
    return store.get(TABLE);
  }

  function getId(id) {
    return store.getById(TABLE, id);
  }

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = "";
    }
    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: body.username,
        password: body.password,
      });
    }
    return await store.upsert(TABLE, body);
  }

  function remove(id) {
    return store.deleteElement(TABLE, id);
  }
  return { get, getId, upsert, remove };
};
