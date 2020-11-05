const passport = require("passport");
const bcrypt = require('bcrypt');
const { Strategy: JwtStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const connection = require("../db/connection");
const query = require("../db/query");

require('dotenv').config();

module.exports = () => {
    passport.use('localSignUp', new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPw1'
    }, async (id, pw, done) => {
        const [rows] = await connection.query(query.getUserId,
            [id]);
        if (rows.length) {
            return done(null, false, "중복된 아이디입니다.");
        }
        const newUser = {
            userId: id,
            userPw: pw
        };
        bcrypt.hash(newUser.userPw, Number(process.env.SALT_ROUNDS), async (err, hash) => {
            if (err) throw err;
            newUser.userPw = hash;
            const [saveResult] = await connection.query(query.insertUser,
                [newUser.userId, newUser.userPw]);
            if (saveResult.affectedRows) return done(null, newUser, { message: "success" });
            else return done(null, flase, "삽입 실패");
        });

        connection.release();
    }));

    passport.use('local', new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPw'
    }, async (id, pw, done) => {
        const [[rows]] = await connection.query(query.loginCheck,
            [id]);
        if (!rows) return done(null, false, "존재하지 않는 사용자 아이디입니다.");
        bcrypt.compare(pw, rows.userPw, (err, result) => {
            if (result) {
                const payload = {
                    id: id
                };
                return done(null, payload);
            } else {
                return done(null, false, '아이디 또는 비밀번호를 다시 확인하세요.');
            }
        });
        connection.release();
    }));

    const cookieExtractor = (req) => {
        let token = null;

        if (req && req.headers.cookie) {
            token = req.headers.cookie.split('=')[1];
        }

        return token;
    };

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.secret_key,
    }, (jwtPayload, done) => {
        done(null, jwtPayload.user.id, { message: 'success' })
    }));
}
