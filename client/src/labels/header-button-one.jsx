import styled from "styled-components";

const StyledHeaderOne = name => styled.div`
  background-color: ${name === "Label"
    ? `rgb(3, 102, 214)`
    : `rgb(255,255,255)`};
  color: ${name === "Label" ? `rgb(255, 255, 255)` : `rgb(36, 41, 46)`};

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${name === "Label" ? "100" : "125"}px;
  height: 32px;
  border: 0;
  border-radius: ${name === "Label" ? `5px 0 0 5px` : `0 5px 5px 0`};
  box-shadow: 0 0 2px 0
    ${name === "Label" ? `rgb(3, 102, 214)` : `rgb(36, 41, 46)`};

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    background-color: ${name === "Label"
      ? `rgb(3, 102, 214)`
      : `rgb(236, 238, 240)`};
  }
`;

export default StyledHeaderOne;
