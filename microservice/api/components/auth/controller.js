const store = require("../../../store/dummy");
const jwt = require("../../../auth");
const bcrypt = require("bcrypt");

const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });
    if (data) {
      return bcrypt.compare(password, data.password).then((equals) => {
        if (equals === true) {
          return jwt.sign(data);
        } else {
          throw new Error("User or password incorrect");
        }
      });
    }
    throw new Error("User or password not found");
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 3);
    }
    return await store.upsert(TABLE, authData);
  }

  return { upsert, login };
};
