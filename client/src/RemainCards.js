import React from "react";
import styled from "styled-components";

export default function RemainCards(cards) {
  const Suit_Map = { spade: "♠", club: "♣", heart: "♥", diamond: "♦" };

  return (
    <>
      <h5>Remained Cards</h5>
      <Grid>
        {cards.cards.data.map((card) => {
          return (
            <PP>
              {Suit_Map[card.suit]} : {card.value}
            </PP>
          );
        })}
      </Grid>
    </>
  );
}

const PP = styled.p`
  font-size: 16px;
  /*  font-weight: bold; */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-top: 30px;

  font-family: "roboto", sans-serif;
`;
