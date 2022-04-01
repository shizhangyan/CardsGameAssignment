import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardsList from "./CardsList";

export default function PlayersList(playersList) {
  const [cards, setCards] = useState(null);

  console.log(playersList);

  return (
    <Container>
      {/* <h5>Players</h5> */}
      {playersList.playerList.map((player) => {
        return (
          <Item>
            <PP>Player {player.id}</PP>
            <PV>Value : {player.value}</PV>
            <CardsList cardslist={player.cards} />
          </Item>
        );
      })}
    </Container>
  );
}

const PP = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const PV = styled.p`
  font-size: 16px;
  font-style: italic;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 100%;
`;

const Item = styled.div`
  width: 200px;
`;
