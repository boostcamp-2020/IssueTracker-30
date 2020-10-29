import express from "express";
import hello from "./hello";
import signIn from "./signIn";
import signUp from "./signUp";
import signOut from "./signOut";
import issue from "./issue";
import comment from "./comment";
import label from "./label";
import milestone from "./milestone";

const router = express.Router();

router.use("/hello", hello);
router.use("/signIn", signIn);
router.use("/signUp", signUp);
router.use("/signOut", signOut);
router.use("/issue", issue);
router.use("/comment", comment);
router.use("/label", label);
router.use("/milestone", milestone);

export default router;
