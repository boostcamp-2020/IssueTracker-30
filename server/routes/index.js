import express from "express";
import issue from "./issue";
import comment from "./comment";
import label from "./label";
import milestone from "./milestone";
import user from "./user";
import oAuth from "./oAuth";

const router = express.Router();

router.use("/issue", issue);
router.use("/comment", comment);
router.use("/label", label);
router.use("/milestone", milestone);
router.use("/user", user);
router.use("/oAuth", oAuth);

export default router;
