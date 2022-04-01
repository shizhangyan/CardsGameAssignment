import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Menu>
        <li>
          <a href="#"> CreateGame</a>
        </li>
        <li>
          <a href="#"> AddDeck</a>
        </li>
        <li>
          <a href="#"> AddPlayer</a>
        </li>
        <li>
          <a href="#"> DealCard</a>
        </li>
        <li>
          <a href="#"> Shuffle</a>
        </li>
        <li>
          <a href="#"> DeletePlayer</a>
        </li>
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  list-style: none;
  position: sticky;
  border-top: 1px solid #d1d1d1;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    list-style: none;
  }
  a {
    font-weight: 600;
    text-transform: uppercase;
    padding: 0 10px;
    flex-wrap: nowrap;
    text-decoration: none;
  }
`;

export default Header;
