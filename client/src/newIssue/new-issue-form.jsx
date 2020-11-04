import React from "react";
import styled from "styled-components";

const StyledNewIssueForm = styled.div`
    position: absolute;
    left: 10%;
    display: flex;
    background-color: white;
    width: 60%;
    height: 65%;
`

const StyledImgDiv = styled.div`
    background-color: teal;
    width:5%;
    height:10%;
`

const StyledTriangleDiv = styled.div`
    position: absolute;
    left: 9%;
    top: 3%;
    background-color: white;
    width: 18px;
    height: 18px;
    border-left: 1px solid #dbdde2;
    border-bottom: 1px solid #dbdde2;
    transform: rotateZ(45deg);
`

const StyledNewIssueSection = styled.div`
    background-color: white;
    position: absolute;
    right: 0%;
    width: 90%;
    border: 1px solid #dbdde2;
    border-radius: 3px;
    height: 100%;
`

const newIssueForm = () => {
    return (
        <StyledNewIssueForm>
            <StyledImgDiv />
            <StyledNewIssueSection />
            <StyledTriangleDiv />
        </StyledNewIssueForm>
    );
};

export default newIssueForm;
