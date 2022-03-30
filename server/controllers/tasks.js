// REST API
const { Deck, CardsGame, Player, Card } = require("../routes/Deck");

let game = null;

const createGame = async (req, res) => {
  console.log("Create Game");
  try {
    game = await new CardsGame();
    res.status(200).json({ game });
  } catch (err) {
    res.status(500).json({ msg: error });
  }
};

const deleteGame = async (req, res) => {
  console.log("Delete Game");
  try {
    if (game != null) {
      game = null;
      console.log("Game is not null");
      res.status(200).json({ msg: "Game deleted" });
    } else {
      res.status(200).json({ msg: "Game List is empty" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createGame, deleteGame };
