const generateNumber = () => {
  return Math.floor(Math.random() * 11);
};

const checkPlayerCoins = (player, bet) => {
  return player.coins >= bet;
};

const handleGameConditions = async (
  game,
  generatedNumber,
  guessNumber,
  bet
) => {
  game.resultNumber = generatedNumber;
  game.guessNumber = guessNumber;

  if (generatedNumber == guessNumber) {
    game.win = true;
    game.gainedThisRound = bet * 4;
    game.losedThisRound = 0;
  } else {
    game.win = false;
    game.gainedThisRound = 0;
    game.losedThisRound = bet;
  }

  await game.save();
};

const handlePlayerConditions = async (player, game, bet) => {
  if (game.win) {
    player.coins += bet * 4;
  } else {
    player.coins -= bet;
  }

  await player.save();
};

module.exports = {
  generateNumber,
  checkPlayerCoins,
  handleGameConditions,
  handlePlayerConditions,
};
