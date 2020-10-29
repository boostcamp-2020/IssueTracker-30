import express from "express";
import pool from "../db/connection";
import query from "../db/query";

const router = express.Router();

router.get("/", async(req, res) => {
    res.json({message: "milestone page"});
});

export default router;