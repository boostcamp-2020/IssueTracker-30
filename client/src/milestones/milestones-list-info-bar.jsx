import React from "react";
import styled from "styled-components";

const StyledInfoBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: rgb(246, 248, 250);

  border: 0;
  border-radius: 5px 5px 0 0;
  border-bottom: 3px solid rgb(225, 228, 232);
`;

const StyledInfoNums = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  &:before {
    width: 10px;
    content: "";
  }
`;

const StyledOpenButton = styled.button`
  display: flex;
  border: none;
  outline: none;
  background: none;
  font-weight: ${props => props.status === "Open" ? "bold" : "normal"};
`;

const StyledSvg = styled.svg.attrs({
  viewBox: "0 0 16 16",
  version: "1.1",
  width: "13",
  height: "13",
  ariaHidden: "true",
})`
  margin-right: 5px;
`;

const StyledCloseButton = styled.button`
  display: flex;
  border: none;
  outline: none;
  background: none;
  font-weight: ${props => props.status === "Close" ? "bold" : "normal"};
`;

const ListInfoBar = props => {
  const openButtonEvent = () => {
    props.setCurStatus("Open")
  }

  const closeButtonEvent = () => {
    props.setCurStatus("Close")
  }

  return (
    <StyledInfoBar>
      <StyledInfoNums>
        <StyledOpenButton onClick={openButtonEvent} status={props.curStatus}>
          <StyledSvg>
            <path
              fill="rgb(36, 41, 46)"
              fillRule="evenodd"
              d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z"
            />
          </StyledSvg>
          {props.numOfOpenMilestone} Open
        </StyledOpenButton>
        <StyledCloseButton onClick={closeButtonEvent} status={props.curStatus}>
          ✔{" "}{props.numOfCloseMilestone} Close
        </StyledCloseButton>
      </StyledInfoNums>
    </StyledInfoBar>
  );
};

export default ListInfoBar;
