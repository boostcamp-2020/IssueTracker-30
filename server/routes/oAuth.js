import express from "express";
import jwt from "jsonwebtoken";
import qs from "qs";
import axios from "axios";
require('dotenv').config();

const router = express.Router();

router.get("/github", (req, res) => {
    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
        client_id: process.env.client_id,
        redirect_uri: `http://${process.env.deploy_host}:3000/oAuth/github/callback`,
        state: 'qweuqwoieuqoiweu',
        scope: 'user:email',
    });
    const githubAuthUrl = url + query;
    res.send(githubAuthUrl)
});

router.get("/github/callback", (req, res) => {
    const host = 'https://github.com/login/oauth/access_token?'
    const queryString = qs.stringify({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        code: req.query.code,
        redirect_uri: `http://${process.env.deploy_host}:3000/oAuth/github/callback`,
        state: req.query.state,
    })

    const authurl = host + queryString;

    axios.post(authurl)
    .then((accessData) => {
        const config = {
            headers: {
                Authorization: 'token ' + qs.parse(accessData.data).access_token,
            }
        }
        axios.get('https://api.github.com/user', config)
        .then((loginData) => {
            const token = jwt.sign({ user: {id: `${loginData.data.login}_Github`}}, process.env.secret_key, { expiresIn: 3000 });

            axios({
                method: "POST",
                url: `http://${process.env.deploy_host}:3000/user/signUp`,
                data: {
                    userId : `${loginData.data.login}_Github`,
                    userPw1 : 'Github',
                },
                withCredentials: true,
            })
                .then(() => {
                    axios({
                        method: "POST",
                        url: `http://${process.env.deploy_host}:3000/user/saveImg`,
                        data : { userId:`${loginData.data.login}_Github`, dataUrl: loginData.data.avatar_url },
                        withCredentials: true,
                    }).then(() => {
                        res.cookie('user', token, { maxAge: 3000 * 1000 });
                        res.redirect(`http://${process.env.deploy_host}:3030`)
                    })
                });
        })
        .catch(function(err) {
            console.log(err)
        })
    })
    .catch(function(err) {
        console.log(err);
    })
});

export default router;
