import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledSignInForm = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledParagraph = styled.p``;

const StyledInputId = styled.input.attrs({
    type: "text",
    // value: userId,
    // onChange: isIdOK,
})`
    &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

const StyledInputPw = styled.input.attrs({
    type: "password",
})`
    &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

// const isIdOK = (e) => {};

// const isPw1OK = (e) => {};

// const isPw2OK = (e) => {};

// const isAllFilled = () => {
//     if (userId && userPw1 && userPw2) {
//         return true;
//     }
//     return false;
// };

// const onSubmitButtonClick = (e) => {
//     e.preventDefault();
//     if (isAllFilled() && isIdOK() && isPw1OK() && isPw2OK()) {
//         //TODO
//         return;
//     }
// };

const StyledSubmitButton = styled.button.attrs({
    // onClick: onSubmitButtonClick,
})`
    margin: 15px;
`;

const SignUpForm = () => {
    const [userId, setUserId] = useState("");
    const [userPw1, setUserPw1] = useState("");
    const [userPw2, setUserPw2] = useState("");
    const [verifyIdAlert, setVerifyIdAlert] = useState("");
    const [verifyPw1Alert, setVerifyPw1Alert] = useState("");
    const [verifyPw2Alert, setVerifyPw2Alert] = useState("");
    return (
        <StyledSignInForm>
            <StyledParagraph>아이디</StyledParagraph>
            <StyledInputId></StyledInputId>
            <StyledParagraph>비밀번호</StyledParagraph>
            <StyledInputPw
                value={userPw1}
                // onChange={isPw1OK}
            />
            <StyledParagraph>비밀번호확인</StyledParagraph>
            <StyledInputPw
                value={userPw2}
                // onChange={isPw2OK}
            />
            <StyledSubmitButton>회원가입</StyledSubmitButton>
        </StyledSignInForm>
    );
};

export default SignUpForm;
