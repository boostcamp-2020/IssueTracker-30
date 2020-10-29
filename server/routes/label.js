import express from "express";
import pool from "../db/connection";
import query from "../db/query";

const router = express.Router();

router.get("/", async(req, res) => {
    res.json({message: "label page"});
});

export default router;