import passport from "passport";

const isLoggedIn = (req, res, next) => {
    try {
        passport.authenticate('jwt', async (err, userId, info) => {
            if (req) {
                req.body.userId = userId;
                next();
            } else {
                throw new Error('Token Expired');
            }
        })(req, res);
    } catch (error) {
        res.status(400).send({ status: error.message });
    }
}

export default isLoggedIn;
