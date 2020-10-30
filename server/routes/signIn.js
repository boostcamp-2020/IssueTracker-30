import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import qs from "qs";
import axios from "axios";
require('dotenv').config();

const router = express.Router();

router.post("/", (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (!user) {
            res.json({ message: info });
        } else {
            const token = jwt.sign({ user }, process.env.secret_key, { expiresIn: 3000 });
            res.cookie('user', token, { maxAge: 3000 * 1000 });
            res.json({ message: 'success', id: user.id });
        }
    })(req, res);
});

router.post("/auth", (req, res) => {
    passport.authenticate('jwt', (err, userId, info) => {
        if (!err) {
            res.json({ message: 'success' });
        }
    })(req, res);
});

router.get("/github", (req, res) => {
    const url = 'https://github.com/login/oauth/authorize?';
    const query = qs.stringify({
        client_id: process.env.client_id,
        redirect_uri: 'http://localhost:3000/signIn/github/callback',
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
        redirect_uri: 'http://localhost:3000/signIn/github/callback',
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
            const token = jwt.sign({ user: loginData.data.login }, process.env.secret_key, { expiresIn: 3000 });
            res.cookie('user', token, { maxAge: 3000 * 1000 });
            res.redirect("http://localhost:3030")
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
