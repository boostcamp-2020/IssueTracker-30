import express from "express";

import isLoggedIn from "../middleware/auth";
import MilestoneService from "../service/milestone-service";

const router = express.Router();

router.get("/", isLoggedIn, MilestoneService.getMilestone);

export default router;