const { Schema, model, Types } = require("mongoose");

const GameSchema = new Schema(
  {
    guessNumber: Number,
    resultNumber: Number,
    player: {
      type: Types.ObjectId,
      ref: "User",
    },
    win: Boolean,
    gainedThisRound: Number,
    losedThisRound: Number,
  },
  { timestamps: true }
);

module.exports = model("Game", GameSchema);
