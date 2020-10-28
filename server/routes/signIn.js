import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (!user) {
            res.json({ message: info });
        } else {
            const token = jwt.sign({ user }, 'hello', { expiresIn: 3000 });
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

export default router;
