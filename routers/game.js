const express = require("express");
const router = express.Router();
const {getAccessToRoute} = require("../middlewares/auth/auth");
const getGameAccess = require("../middlewares/game/getGameAccess");
const { createGame, play } = require("../controllers/game");

router.post("/createGame", getAccessToRoute, createGame);
router.post("/play", [getAccessToRoute, getGameAccess], play);

module.exports = router;
