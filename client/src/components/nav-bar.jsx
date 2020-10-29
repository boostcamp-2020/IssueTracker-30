import React from "react";
import styled from "styled-components";
import axios from "axios";

const StyledNavBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  background-color: #24292f;
`

const StyledP = styled.p`
  color: white;
  font-size: 30px;
  font-weight: bold;
`

const LogoutBtn = styled.button`
  position: absolute;
  top: 3.5%;
  right: 2%;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`
const NavBar = ({ mode }) => {
  const logoutOnclickHandler = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/signOut",
      withCredentials: true,
    })
      .then((res) => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const cookie = 'user=; Expires=' + date.toUTCString();
        document.cookie = cookie;
        document.location = '/';
      });
  }

  switch (mode) {
    case "login":
      return (
        <StyledNavBar />
      );

    case "main":
      return (
        <StyledNavBar>
          <StyledP>
            이슈 트래커
          </StyledP>
          <LogoutBtn onClick={logoutOnclickHandler}>로그아웃</LogoutBtn>
        </StyledNavBar>
      );
  }
};

export default NavBar;
