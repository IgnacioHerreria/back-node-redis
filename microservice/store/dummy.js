const db = {
  user: [
    { id: "1", name: "nacho" },
    { id: "2", name: "dany" },
    { id: "3", name: "abi" },
  ],
};

async function get(table) {
  return db[table] || [];
}

async function getById(table, id) {
  let col = await get(table);
  return col.filter((item) => item.id === id)[0] || null;
}

async function remove(table, id) {
  return true;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
}

async function query(TABLE, query) {
  let col = await get(TABLE);
  let keys = Object.keys(TABLE);
  let key = keys[0];
  return col.filter((x) => x[key] === query[key])[0] || null;
}

module.exports = {
  get,
  getById,
  upsert,
  remove,
  query,
};
