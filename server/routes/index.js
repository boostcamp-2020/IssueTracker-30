import express from "express";
import hello from "./hello";
import signIn from "./signIn"
import signUp from "./signUp"
const router = express.Router();

router.use("/hello", hello);
router.use("/signIn", signIn);
router.use("/signUp", signUp);

export default router;
