import express from "express";

import isLoggedIn from "../middleware/auth";
import IssueService from "../service/issue-service";

const router = express.Router();

router.get("/", isLoggedIn, IssueService.getIssue);

router.post("/", isLoggedIn, IssueService.insertIssue);

router.put("/", isLoggedIn, IssueService.updateIssue);

export default router;
