import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body);
    res.json({
        message: "Hello! I'm from Express Server!",
    });
});

export default router;
