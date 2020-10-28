const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const DB = require("./db.json");
const pool = require("./connection");

module.exports = () => {
    passport.use('local', new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPw'
    }, async(id, pw, done) => {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('select * from user;');
        console.log(rows);
        connection.release();


        if(id === DB.id && pw === DB.password) {
            return done(null, id, {message: "success"});
        }
        else {
            return done(new Error);
        }
    }));
}
