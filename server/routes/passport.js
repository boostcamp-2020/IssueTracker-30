const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const DB = require('./db.json');

module.exports = () => {
    passport.use('local', new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPw'
    }, (id, pw, done) => {
        if(id === DB.id && pw === DB.password) {
            return done(null, id, {message: "success"});
        }
        else {
            return done(new Error);
        }
    }));
}
