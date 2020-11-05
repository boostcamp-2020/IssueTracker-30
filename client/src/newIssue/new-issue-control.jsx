import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCancelButton = styled.button`
    background: white;
    border: none;
    margin-bottom: 15%;
    font-size: 18px;
`

const StyledSubmitButton = styled.button`
    position: absolute;
    right: 2%;
    font-size: 18px;
    height: 8%;
    margin-bottom: 1%;
    color: white;
    border: 1px solid #33b04f;
    border-radius: 6px;
    background: linear-gradient(rgba(51,205,86,1) 0%, rgba(41,171,71,1) 100%);
`

const newIssueControl = (props) => {
    return (
        <>
            <Link to="/">
                <StyledCancelButton>Cancel</StyledCancelButton>
            </Link>
            <StyledSubmitButton onClick={props.submit}>Submit new issue</StyledSubmitButton>
        </>
    );
};

export default newIssueControl;
