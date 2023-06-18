const CustomError = require("../../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const User = require("../../models/User");
const Game = require("../../models/Game");

const getGameAccess = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const game = await Game.findById(user.game);

  if (!game || !user)
    return next(new CustomError("Game or User not found", 404));

  req.game = game;

  next();
});

module.exports = getGameAccess;
