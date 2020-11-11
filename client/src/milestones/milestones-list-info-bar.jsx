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
  width: 120px;
  height: 100%;

  &:before {
    width: 20px;
    content: "";
  }
`;

const StyledOpenButton = styled.button``;

const StyledCloseButton = styled.button``;

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
        <StyledOpenButton onClick={openButtonEvent}>
          {props.numOfOpenMilestone} Open
        </StyledOpenButton>
        <StyledCloseButton onClick={closeButtonEvent}>
          {props.numOfCloseMilestone} Close
        </StyledCloseButton>
      </StyledInfoNums>
    </StyledInfoBar>
  );
};

export default ListInfoBar;
