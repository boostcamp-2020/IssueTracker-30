import React from "react";
import styled from "styled-components";

import LoginForm from "./login-form.jsx";
import IssueList from "./issues/list.jsx";
import NewIssue from "./newIssue/new-issue.jsx";

const StyledMainSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    background-color: ${props => props.loginColor};
    margin-top: 5%;
    margin-bottom: 5%;
`;

const StyledTitle = styled.div`
    color: black;
    font-size: 30px;
    font-weight: bold;
    margin: 1%;
`;

const MainSection = ({ mode }) => {
    switch (mode) {
        case "login":
            return (
                <StyledMainSection loginColor='#f9f9f9'>
                    <StyledTitle>이슈 트래커</StyledTitle>
                    <LoginForm />
                </StyledMainSection>
            );

        case "main":
        case "mainForMarkAs":
            return (
                <StyledMainSection loginColor='white'>
                    <IssueList />
                </StyledMainSection>
            );
        
        case "newIssue":
            return (
                <StyledMainSection loginColor='white'>
                    <NewIssue />
                </StyledMainSection>
            );
    }
};

export default MainSection;
