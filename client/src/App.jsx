import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "./components/nav-bar.jsx";
import MainSection from "./main-section.jsx";
import Footer from "./components/footer.jsx";

const loginCheck = async () => {
    if (document.cookie.split("=")[0] === "user") {
        const mode = await axios({
            method: "POST",
            url: "http://localhost:3000/signIn/auth",
            withCredentials: true,
        })
            .then((res) => {
                if(res.data.message === "success"){
                    return "main";
                } else {
                    return "login";
                }
            });
        return mode;
    } else {
        return "login";
    }
}

const App = () => {
    const [mode, setMode] = useState("login");

    useEffect(() => {
        loginCheck().then((res) => {
            setMode(res);
        });
    }, []);

    return (
        <>
            <NavBar mode={mode} />
            <MainSection mode={mode}/>
            <Footer />
        </>
    );
};

export default App;
