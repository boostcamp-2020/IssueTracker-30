import express from "express";
import cors from "cors";
import logger from "morgan";
import routes from "./routes";
import passport from "passport";

const passportConfig = require("./routes/passport");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(express.static("../client/dist"));
app.use(passport.initialize());
passportConfig();

app.use("/", routes);

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, () => {
    console.log(`Server Listening on ${SERVER_PORT}`);
});
