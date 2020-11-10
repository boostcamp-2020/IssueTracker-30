import express from "express";
import issue from "./issue";
import comment from "./comment";
import label from "./label";
import milestone from "./milestone";
import user from "./user";
import oAuth from "./oAuth";
import s3test from "./s3test";

const router = express.Router();

router.use("/issue", issue);
router.use("/comment", comment);
router.use("/label", label);
router.use("/milestone", milestone);
router.use("/user", user);
router.use("/oAuth", oAuth);
router.use("/s3test", s3test);

export default router;
