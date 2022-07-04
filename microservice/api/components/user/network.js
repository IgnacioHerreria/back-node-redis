const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const router = express.Router();

router.get("/", get);
router.get("/:id", getId);
router.post("/", create);
router.put("/", update);
router.delete("/:id", remove);

function get(req, res) {
  controller
    .get()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function getId(req, res) {
  controller
    .getId(req.params.id)
    .then((u) => {
      response.success(req, res, u, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
}

function create(req, res) {
  controller
    .upsert(req.body)
    .then((u) => {
      response.success(req, res, u, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
}

function update(req, res) {
  controller
    .upsert(req.body)
    .then((u) => {
      response.success(req, res, u, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
}

function remove(req, res) {
  controller
    .remove(req.params.id)
    .then((u) => {
      response.success(req, res, u, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
}

module.exports = router;
