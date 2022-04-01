const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

const {
  createGame,
  deleteGame,
  addPlayer,
  deletePlayer,
  getPlayer,
  AddDeck,
  GetGame,
  dealCards,
  getPlayerCardList,
  sortAllPlayerCardValueList,
  getPlayerById,
  numOfUndealtCardBySuit,
  shuffleCard,
  getSortedUndealtCards,
} = require("./controllers/tasks");

app.use(express.static("./public"));
app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("./server/assets"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

// routes
app.get("/shufflecards", shuffleCard);
app.get("/getsortedundealtcards", getSortedUndealtCards);
app.get("/testtest/:id", getPlayerById);
app.get("/testtest", getPlayer);
app.get("/getundealtcards", numOfUndealtCardBySuit);

app.get("/getplayerById/:id", getPlayerById);
app.get("/getplayercardlist", sortAllPlayerCardValueList);
app.get("/getplayercardlist/:id", getPlayerCardList);
app.get("/dealcards", dealCards);
app.get("/test", GetGame);

app.post("/api/tasks/deck", AddDeck);
app.post("/api/tasks", createGame);
app.post("/api/tasks/player", addPlayer);

app.delete("/api/tasks/player", deletePlayer);
app.delete("/api/tasks", deleteGame);

const port = 8000;

app.listen(port, () => {
  console.log("server is listening on port 8000...");
});
