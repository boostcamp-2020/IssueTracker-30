import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10vh;
    background-color: #24292f;
`;

const Footer = () => {
    return <StyledFooter />;
};

export default Footer;
