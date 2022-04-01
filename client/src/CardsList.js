import React from "react";
import styled from "styled-components";

export default function CardsList(cardsList) {
  const Suit_Map = { spade: "♠", club: "♣", heart: "♥", diamond: "♦" };

  return (
    <>
      <h3>Cards</h3>
      <Grid>
        {cardsList.cardslist.map((card) => {
          return (
            <>
              <p>
                {Suit_Map[card.suit]} {card.value}
              </p>
            </>
          );
        })}
      </Grid>
    </>
  );
}
// const Container = styled.div`
//   display: flex;
//   /* align-items: center; */
//   /* justify-content: center; */
//   flex-direction: column;
// `;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 30px;

  font-family: "roboto", sans-serif;
`;
