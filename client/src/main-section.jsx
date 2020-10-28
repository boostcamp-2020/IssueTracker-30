import React from "react";
import styled from "styled-components";

import LoginForm from "./login-form.jsx";
import IssueList from "./issues/list.jsx";

const StyledMainSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    background-color: #f9f9f9;
`;

const StyledTitle = styled.div`
    color: black;
    font-size: 30px;
    font-weight: bold;
    margin: 1%;
`;

const MainSection = ({ mode }) => {
    // alert(mode);

    switch (mode) {
        case "login":
            return (
                <StyledMainSection>
                    <StyledTitle>이슈 트래커</StyledTitle>
                    <LoginForm />
                </StyledMainSection>
            );

        case "main":
            return (
                <StyledMainSection>
                    <IssueList />
                </StyledMainSection>
            );
    }
};

export default MainSection;
