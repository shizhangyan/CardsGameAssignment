// REST API
const { CardsGame, Player } = require("../routes/Deck");
const CARD_VALUE_MAP = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
};
let game = null;

// Create a game
const createGame = async (req, res) => {
  try {
    if (game === null) {
      game = await new CardsGame();
      res.status(201).json({ game });
    } else {
      res.status(400).json({ msg: "game already exists" });
    }
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
};

// Get game information
const GetGame = async (req, res) => {
  try {
    if (game) {
      await res.status(200).json({ game });
    } else {
      await res.status(404).json({ msg: "game is empty" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

// Add a deck to the CardGame (Game Deck)
const AddDeck = async (req, res) => {
  try {
    if (game) {
      await game.addDeck();
      res.status(201).json({ game: game });
      //res.status(200).json(game.deck[0].cards);
    } else {
      res.status(400).json({ msg: "Game is Empty" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

// Delete a game
const deleteGame = async (req, res) => {
  try {
    if (game != null) {
      game = null;
      res.status(200).json({ msg: "Game deleted" });
    } else {
      res.status(200).json({ msg: "Game List is empty" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// get players information
const getPlayer = (req, res) => {
  const { id } = req.params;

  try {
    if (game && game.deck_count > 0 && game.player_count > 0) {
      res.status(200).json({ data: game.players });
    } else {
      res.status(404).json({ msg: "no player" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// Add a player and return all players
const addPlayer = async (req, res) => {
  const { firstname, lastname } = req.body;

  try {
    if (game) {
      if (game.player_count < 4) {
        await game.addPlayer(new Player(firstname, lastname));
        console.log(game.players);
        res.status(200).json({ data: game.players });
      } else {
        res.status(400).json({ msg: "player is full" });
      }
    } else {
      res.status(500).json({ msg: "game is empty, you cannot add Player" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// Delete a player
const deletePlayer = async (req, res) => {
  try {
    if (game && game.player_count > 0) {
      await game.removePlayer();
      game.player_count--;
      res.status(200).json({ msg: "Success delete" });
    } else {
      res.status(500).json({ msg: "no play to delete" });
    }
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
};

// Deal cards depending on the players
// return players
const dealCards = async (req, res) => {
  try {
    if (game && game.deck_count > 0) {
      game.dealCards();
      res.status(200).json({ data: game.players });
    } else {
      res.status(404).json({ msg: "no deck to deals" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

// Get the list of players in game along with the total added value of all
// the cards each player holds; use face values of cards only. Then sort the
// list in descenting order. From the player withe highest value hand to the
// player with lowest value hand
// return all players sorted by values
const sortAllPlayerCardValueList = (req, res) => {
  try {
    if (game && game.player_count > 0) {
      game.sortPlayerByValue(); // work good
      res.status(200).json({ data: game.players });
    } else {
      res.status(404).json({ msg: "no card" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

// Get the list of cards for a player
// return all cards of the player by Id
const getPlayerCardList = (req, res) => {
  const { id } = req.params;

  try {
    if (game && game.deck_count > 0 && game.player_count > 0) {
      let card = game.players[id].cards;
      card.sort((a, b) => a.suit === b.suit);

      res.status(200).json({ data: card });
    } else {
      res.status(404).json({ msg: "no card" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

// Get Player by ID
// return the player's information by Id
const getPlayerById = (req, res) => {
  const { id } = req.params;
  try {
    if (game && game.player_count > 0) {
      res.status(200).json({ data: game.players[id] });
    } else {
      res.status(404).json({ msg: "no player" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

// Shuffle the game deck( remained cards in the deck)
const shuffleCard = (req, res) => {
  try {
    if (game && game.deck_count > 0) {
      game.shuffleCard();
      res.status(200).json({ msg: "cards shuffled " });
    } else {
      res.status(400).json({ msg: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// Get the count of how many cards per suit are left undealt in
// the game deck(0: club, 1: diamond, 2: heart, 3: spades)
// return : array numOfCards include the numbers of the suit
const numOfUndealtCardBySuit = (req, res) => {
  try {
    if (game && game.deck_count > 0) {
      let numOfCards = game.numOfUndealtCardsBySuit();
      res.status(200).json({ data: numOfCards });
    } else {
      res.status(400).json({ msg: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// Get the  count of each card (suit and value) remaining in the game deck
// sorted by suit( hearts, spades, clubs, and diamonds) and face value from high
// to low value  --- to be fixed, not work well
const getSortedUndealtCards = (req, res) => {
  try {
    if (game && game.deck_count > 0) {
      game.sortRemainCardBySuitAndByValue();
      let card = game.deck[game.currentDeck].cards;
      res.status(200).json({ data: card });
    } else {
      res.status(400).json({ msg: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  createGame,
  deleteGame,
  getPlayer,
  addPlayer,
  deletePlayer,
  AddDeck,
  GetGame,
  dealCards,
  getPlayerCardList,
  sortAllPlayerCardValueList,
  getPlayerById,
  numOfUndealtCardBySuit,
  shuffleCard,
  getSortedUndealtCards,
};
