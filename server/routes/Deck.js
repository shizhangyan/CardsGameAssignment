const SUITS = ["club", "diamond", "heart", "spade"];
//const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
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
const Max_Player = 4;
class CardsGame {
  constructor(deck) {
    this.deck = []; //new Set(); //Deck();
    this.deck_count = 0;
    this.currentDeck = 0;
    this.players = []; //new Set();
    this.player_count = 0;
  }
  setCurrentDeck(deckId) {
    this.currentDeck = deckId;
  }
  addDeck() {
    this.deck.push(new Deck());
    this.deck_count++;
  }
  shuffleCard() {
    this.deck[this.currentDeck].shuffle();
  }
  addPlayer(player) {
    if (this.player_count < Max_Player) {
      player.id = this.player_count;
      this.players.push(player); //.add(player);
      this.player_count++;
      console.log(this.player_count);
    } else {
      console.log("Player is full");
    }
  }
  sortPlayerByValue() {
    if (this.player_count >= 2) {
      this.players.sort(function (a, b) {
        return b.value - a.value;
      });
    }
  }
  removePlayer() {
    this.players.shift();
  }
  dealCards() {
    let i = 0;
    for (i = 0; i < this.players.length; i++) {
      let card = this.deck[this.currentDeck].pop();
      this.players[i].addCard(card);
    }
  }
  numOfUndealtCardsBySuit() {
    let nums = [0, 0, 0, 0];

    for (let i = 0; i < this.deck[this.currentDeck].numberOfCards; i++) {
      if (this.deck[this.currentDeck].cards[i].suit === "club") nums[0]++;
      if (this.deck[this.currentDeck].cards[i].suit === "diamond") nums[1]++;
      if (this.deck[this.currentDeck].cards[i].suit === "heart") nums[2]++;
      if (this.deck[this.currentDeck].cards[i].suit === "spade") nums[3]++;
    }
    return nums;
  }
  sortRemainCardBySuitAndByValue() {
    let clubArr = [];
    let diamondArr = [];
    let heartArr = [];
    let spadeArr = [];
    this.deck[this.currentDeck].cards.sort(function (a, b) {
      return b.suit - a.suit;
    });
    // .sort((a, b) => {
    //   return (
    //     a.suit === b.suit && CARD_VALUE_MAP[b.value] - CARD_VALUE_MAP[a.value]
    //   );
    // });
  }
}

class Player {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = 0;
    this.value = 0;
    this.numberOfCards = 0;
    this.cards = [];
  }
  addCard(card) {
    this.numberOfCards++;
    this.value += CARD_VALUE_MAP[card.value];
    this.cards.push(card);
  }
  sortCards() {
    this.cards.sort(
      (a, b) => {
        b.suit - a.suit;
      }
      // .sort((a, b) => {
      //   CARD_VALUE_MAP[b.value] - CARD_VALUE_MAP[a.value];
      // })
    );
  }
  countCardsValue() {}
}

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
    this.remainCards = 52;
    this.shuffle();
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    if (this.remainCards > 0) {
      this.remainCards--;
      return this.cards.shift();
    } else {
      return null;
    }
  }

  push(card) {
    this.cards.push(card);
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }
}

const freshDeck = () => {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
};

module.exports = { Deck, CardsGame, Player, Card };
