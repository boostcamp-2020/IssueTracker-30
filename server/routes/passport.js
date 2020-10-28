const passport = require("passport");
const bcrypt = require('bcrypt');
const { Strategy: JwtStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const DB = require("./db.json");
const pool = require("./connection");

module.exports = () => {
    passport.use('localSignUp', new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPw1'
    }, async (id, pw, done) => {
        console.log('pass');
        const connection = await pool.getConnection();
        const [rows] = await connection.query('select userId from user where userId=?;',
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
            const [saveResult] = await connection.query(`INSERT INTO user (userId, userPw) VALUES (?, ?);`,
                [newUser.userId, newUser.userPw]);
            if (saveResult.affectedRows) return done(null, newUser, { message: "success" });
            else return done(null, flase, "삽입 실패" );
        });

        connection.release();
    }));

    passport.use('local', new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPw'
    }, async (id, pw, done) => {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('select * from user;');
        console.log(rows);
        connection.release();
        if (id === DB.id && pw == DB.password) {
            return done(null, id, { message: "success" });
        }
        else {
            return done(new Error);
        }
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
        done(null, jwtPayload.userId, { message: 'success' })
    }));
}
