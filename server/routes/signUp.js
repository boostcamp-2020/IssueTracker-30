import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
    passport.authenticate('localSignUp', (err, user, info) => {
        if (user === false) {
            res.json({ message: info });
        } else { //회원가입 성공
            const token = jwt.sign({ userId: user.userId }, 'hello', { expiresIn: 3000 });
            res.cookie('user', token, { maxAge: 3000 * 1000 }).json({ message: 'success' });
        }
    })(req, res);
});

export default router;
