import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
    passport.authenticate('local', (err, userId, info) => {
        if (!err) {
            const token = jwt.sign({userId}, 'hello', {expiresIn:3000});
            res.cookie('user', token, {maxAge:3000*1000});
            res.json({message: 'success'});
        }
    })(req, res);
});

router.post("/auth", (req, res) => {
    passport.authenticate('jwt', (err, userId, info) => {
        if (!err) {
            res.json({message: 'success'});
        }
    })(req, res);
});

export default router;
