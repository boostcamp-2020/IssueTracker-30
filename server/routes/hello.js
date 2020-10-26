import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Hello! I'm from Express Server!",
    });
});

export default router;
