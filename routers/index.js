const express = require("express");
const router = express.Router();
const {getAccessToRoute} = require("../middlewares/auth/auth");
const auth = require("./auth");
const game = require("./game");
const test = require("./test");

router.use("/auth", auth);
router.use("/game", game);

router.use("/test", getAccessToRoute, test);

module.exports = router;
