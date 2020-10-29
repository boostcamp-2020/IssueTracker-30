import express from "express";
import pool from "../db/connection";
import query from "../db/query";

const router = express.Router();

router.get("/", async(req, res) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(query.getIssue);
    console.log(rows);
    res.json(rows);
});

/*
router.post("/", (req, res) => {
    console.log(req.body);
    res.json({
        message: "Hello! I'm from Express Server!",
    });
});

router.put("/", (req, res) => {
    console.log(req.body);
    res.json({
        message: "Hello! I'm from Express Server!",
    });
});
*/

export default router;
