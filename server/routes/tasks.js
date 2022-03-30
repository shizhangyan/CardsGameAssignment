const express = require("express");
const router = express.Router();

const { createGame, deleteGame } = require("../controllers/tasks");

router.route("/").get(createGame).delete(deleteGame);

module.exports = router;
