import express from "express";
import hello from "./hello";
import signIn from "./signIn"

const router = express.Router();

router.use("/hello", hello);
router.use("/signIn", signIn);

export default router;
