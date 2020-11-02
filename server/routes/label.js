import express from "express";
import isLoggedIn from "./auth";
import pool from "../db/connection";
import query from "../db/query";

const router = express.Router();

router.get("/", isLoggedIn, async(req, res) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(query.getLabel);
    res.json(rows);
});

export default router;