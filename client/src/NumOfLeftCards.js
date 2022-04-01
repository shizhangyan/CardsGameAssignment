import React from "react";
import styled from "styled-components";

export default function NumOfLeftCards(cards) {
  const SUITS = ["♣", "♦", "♥", "♠"];

  return (
    <div>
      <h5>Num of Left Cards</h5>
      {cards.cards.data.map((card, index) => {
        return (
          <PP>
            {SUITS[index]} : {card}
          </PP>
        );
      })}
    </div>
  );
}

const PP = styled.p`
  font-size: 30px;
  font-weight: bold;
`;
