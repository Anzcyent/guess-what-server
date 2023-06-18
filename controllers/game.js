const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const Game = require("../models/Game");
const User = require("../models/User");
const {
  generateNumber,
  checkPlayerCoins,
  handleGameConditions,
  handlePlayerConditions,
} = require("../helpers/game/gameHelpers");

const createGame = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.game === undefined) {
    const game = await Game.create({
      player: user,
    });

    user.game = game._id;
    await user.save();

    return res.status(201).json({
      message: "New game has been created.",
      data: {
        game,
      },
    });
  } else {
    return;
  }
});

const play = errorWrapper(async (req, res, next) => {
  const generatedNumber = generateNumber();
  const { guessNumber, bet } = req.body;

  // GAME
  const game = await Game.findById(req.game._id);
  handleGameConditions(game, generatedNumber, guessNumber, bet);

  // PLAYER
  const player = await User.findById(game.player._id);
  if (!checkPlayerCoins(player, bet))
    return next(new CustomError("You don't have enough coins.", 400));

  handlePlayerConditions(player, game, bet);

  return res.status(200).json({
    game: { ...game._doc, player },
  });
});

module.exports = { createGame, play };
