import React from "react";
import styled from "styled-components";

const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 45%;
  box-shadow: 0px 0px 2px 0px gray;
  border-radius: 8px;
  background-color: white;
`

const StyledParagraph = styled.p`
  width: 86%;
  margin: 7% 7% 0 7%;
  font-weight: bold;
`

const StyledInput = styled.input`
  width: 85%;
  height: 14%;
  margin: 2% 7% 0 7%;
  box-shadow: 0 0 2px 0 grey;
  border: none;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`

const StyledSignInAndUpDiv = styled.div`
  text-align: center;
`

const StyledSignInAndUpButton = styled.button`
  margin: 3% 10% 0 10%;
  border: none;
  background-color: white;
  color: #3081dd;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    color: #3676be;
  }
`

const GithubLoginButtonBGBefore = 'rgb(160, 160, 160)';
const GithubLoginButtonBGAfter = 'rgb(130, 130, 130)';

const StyledGithubLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 14%;
  margin: 9% 5% 0 5%;
  color: white;
  background-color: ${GithubLoginButtonBGBefore};
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: ${GithubLoginButtonBGAfter};
  }
`

const StyledImage = styled.img`
  width: 10%;
  margin-left: 2%;
`

const LoginForm = () => {
    return (
        <StyledLoginForm>
          <StyledParagraph>아이디</StyledParagraph>
          <StyledInput type='text'/>
          <StyledParagraph>비밀번호</StyledParagraph>
          <StyledInput type='password'/>

          <StyledSignInAndUpDiv>
            <StyledSignInAndUpButton>로그인</StyledSignInAndUpButton>
            <StyledSignInAndUpButton>회원가입</StyledSignInAndUpButton>
          </StyledSignInAndUpDiv>

          <StyledGithubLoginButton>
            Sign Up with Github
            <StyledImage src="../public/images/GithubIcon.png"></StyledImage>
          </StyledGithubLoginButton>
        </StyledLoginForm>
    );
};

export default LoginForm;
