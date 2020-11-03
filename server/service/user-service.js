import passport from "passport";
import jwt from "jsonwebtoken";

import pool from "../db/connection";
import query from "../db/query";
require('dotenv').config();

const UserService = {
    getUser: async (req, res) => {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(query.getUser);
        res.json(rows);
    },

    signUp: (req, res) => {
        passport.authenticate('localSignUp', (err, user, info) => {
            if (user === false) {
                res.json({ message: info });
            } else { //회원가입 성공
                const token = jwt.sign({ user: { id: user.userId } }, process.env.secret_key);
                res.cookie('user', token).json({ message: 'success' });
            }
        })(req, res);
    },
    signIn: (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            if (!user) {
                res.json({ message: info });
            } else {
                const token = jwt.sign({ user }, process.env.secret_key, { expiresIn: 3000 });
                res.cookie('user', token, { maxAge: 3000 * 1000 });
                res.json({ message: 'success', id: user.id });
            }
        })(req, res);
    },
    signInAuth: (req, res) => {
        passport.authenticate('jwt', (err, userId, info) => {
            console.log(userId)
            console.log(info)
            if (!err) {
                res.json({ message: 'success' });
            }
        })(req, res);
    },

    signOut: (req, res) => {
        req.logOut();
        res.json({ message: 'success' });
    }
}

export default UserService
