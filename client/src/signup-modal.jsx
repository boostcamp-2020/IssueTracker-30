import React from "react";
import styled from "styled-components";

import SignUpForm from "./signup-form.jsx";

const ModalSignup = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;
    top: 20%;
    z-index: 1;
`;
const ModalSignupContent = styled.div`
    width: 300px;
    margin: 100px auto;
    padding: 20px 10px;
    background: #fff;
    border: 2px solid #666;
`;
const ModalSignupLayer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: rgba(0, 0, 0, 0.4);
`;
const SignupModal = () => {
    return (
        <ModalSignup>
            <ModalSignupContent>
                회원가입 폼
                <SignUpForm />
            </ModalSignupContent>

            <ModalSignupLayer />
        </ModalSignup>
    );
};

export default SignupModal;
