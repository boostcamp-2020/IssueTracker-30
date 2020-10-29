import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
    req.logOut();
    res.json({message: 'success'});
});

export default router;
