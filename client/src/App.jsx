import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/nav-bar.jsx";
import MainSection from "./main-section.jsx";
import Footer from "./components/footer.jsx";

const loginCheck = async () => {
    if (document.cookie.split("=")[0] === "user") {
        const mode = await axios({
            method: "POST",
            url: "http://localhost:3000/user/signIn/auth",
            withCredentials: true,
        }).then((res) => {
            if (res.data.message === "success") {
                return "main";
            } else {
                return "login";
            }
        });
        return mode;
    } else {
        return "login";
    }
};

const App = () => {
    const [mode, setMode] = useState("login");

    const changeMode = (props) => {
        alert(props);
    }

    useEffect(() => {
        loginCheck().then(async (res) => {
            if (res === "main") {
                await axios({
                    method: "GET",
                    url: "http://localhost:3000/issue/",
                    withCredentials: true,
                }).then((issueData) => {
                    localStorage.setItem(
                        "issueData",
                        JSON.stringify(issueData.data),
                    );
                });

                await axios({
                    method: "GET",
                    url: "http://localhost:3000/user/",
                    withCredentials: true,
                }).then((users) => {
                    localStorage.setItem(
                        "usersData",
                        JSON.stringify(users.data),
                    );
                });

                await axios({
                    method: "GET",
                    url: "http://localhost:3000/label/",
                    withCredentials: true,
                }).then((labels) => {
                    localStorage.setItem(
                        "labelsData",
                        JSON.stringify(labels.data),
                    );
                });

                await axios({
                    method: "GET",
                    url: "http://localhost:3000/milestone/",
                    withCredentials: true,
                }).then((milestones) => {
                    localStorage.setItem(
                        "milestonesData",
                        JSON.stringify(milestones.data),
                    );
                });
                setMode(res);
            }
        });
    }, []);

    return (
        <>
            <Router>
                <NavBar mode={mode} />
                <Switch>
                    <Route path="/new">
                        <MainSection mode="newIssue" />
                    </Route>
                    <Route path="/">
                        <MainSection mode={mode} />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </>
    );
};

export default App;
