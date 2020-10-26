import express from "express";
import hello from "./hello";

const router = express.Router();

router.use("/hello", hello);

export default router;
