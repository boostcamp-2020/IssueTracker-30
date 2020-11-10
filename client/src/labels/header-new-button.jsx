import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledNewButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(46, 164, 79);
  color: rgb(255, 255, 255);

  width: 100px;
  height: 32px;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 2px 0 rgba(43, 145, 73, 0.8);

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    background-color: rgba(43, 145, 73, 1);
  }
`;

const NewButton = () => {
  return (
    <Router>
      <StyledLink to="/label/new">
        <StyledNewButton>New Label</StyledNewButton>
      </StyledLink>
    </Router>
  );
};

export default NewButton;
