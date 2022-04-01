import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayersList from "./PlayersList";
import NumOfLeftCards from "./NumOfLeftCards";
import RemainCards from "./RemainCards";

const HomePage = () => {
  const [game, setGame] = useState(null);
  const [players, setPalyers] = useState(null);
  const [cardLeft, setCardLeft] = useState(null);
  const [remainedCards, setRemainedCards] = useState(null);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [cardsRemainsStatus, setCardsRemainsStatus] = useState(false);

  const CreateGame = () => {
    fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setGame(json.game);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  useEffect(() => {
    if (game) {
      fetch("/getplayercardlist")
        .then((res) => res.json())
        .then((json) => {
          console.log("Success");
          console.log(json.data);
          setPalyers(json.data);
        })
        .catch((err) => {
          console.log("Error");
        });
      console.log(players);
    }
  }, [playerStatus]);

  useEffect(() => {
    if (game) {
      fetch("/getundealtcards")
        .then((res) => res.json())
        .then((json) => {
          console.log("Success");
          console.log(json);
          setCardLeft(json);
        })
        .catch((err) => {
          console.log("Error");
        });

      fetch("/getsortedundealtcards")
        .then((res) => res.json())
        .then((json) => {
          console.log("Success");
          console.log(json);
          setRemainedCards(json);
        })
        .catch((err) => {
          console.log("Error");
        });
    }
  }, [cardsRemainsStatus]);

  // Add a new player
  const addPlayerInfo = () => {
    setPlayerStatus(!playerStatus);
    fetch("/api/tasks/player", {
      method: "POST",
      body: JSON.stringify({ firstname: "John", lastname: "Smith" }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  // add a deck to the game deck
  const addDeck = () => {
    setCardsRemainsStatus(!cardsRemainsStatus);
    fetch("/api/tasks/deck", {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
      })
      .then((json) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  // Deal cards for players
  const DealCards = () => {
    setPlayerStatus(!playerStatus);
    setCardsRemainsStatus(!cardsRemainsStatus);

    fetch("/dealcards")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  // delete the game
  const DeleteGame = () => {
    setPlayerStatus(!playerStatus);
    setCardsRemainsStatus(!cardsRemainsStatus);
    setCardLeft(null);
    setRemainedCards(null);
    setPalyers(null);

    fetch("/api/tasks", { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log("Error");
      });
    setGame(null);
  };

  // delete the first player
  const DeletePlayer = () => {
    setPlayerStatus(!playerStatus);

    fetch("/api/tasks/player", { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  // shuffle the remained cards in the game deck
  const shuffleCards = () => {
    setCardsRemainsStatus(!cardsRemainsStatus);

    fetch("/shufflecards")
      .then((res) => res.json())
      .then((json) => {
        console.log("Success");
        console.log(json);
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  return (
    <Wrapper>
      <ButtonWraper>
        <Button onClick={() => CreateGame()}>StartGame</Button>
        <Button onClick={() => addDeck()}>AddDeck</Button>
        <Button onClick={() => addPlayerInfo()}>AddPlayer</Button>
        <Button onClick={() => DealCards()}>DealCards</Button>
        <Button onClick={() => shuffleCards()}>Shuffle</Button>
        <Button onClick={() => DeletePlayer()}>DeletePlayer</Button>
        <Button onClick={() => DeleteGame()}>EndGame</Button>
      </ButtonWraper>

      <CardContainer>
        <CardDeck>{players && <PlayersList playerList={players} />}</CardDeck>
        <NumOfLeftCard>
          {cardLeft && <NumOfLeftCards cards={cardLeft} />}
        </NumOfLeftCard>
        <RemainCardsDiv>
          {remainedCards && <RemainCards cards={remainedCards} />}
        </RemainCardsDiv>
      </CardContainer>
    </Wrapper>
  );
};
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const NumOfLeftCard = styled.div`
  width: 15%;
  /* border: 1px solid red; */
  padding: 0 10px;
`;
const RemainCardsDiv = styled.div`
  width: 30%;
`;

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: bold;
  background: #1e90ff;
  width: 160px;
  text-align: center;
  padding: 10px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  :hover,
  :focus,
  :active {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

const ButtonWraper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100px;
  align-items: center;
  padding: 0 100px;
`;
const CardDeck = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  /* border: 1px solid gray; */
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default HomePage;
