import express from "express";

import isLoggedIn from "../middleware/auth";
import MilestoneService from "../service/milestone-service";

const router = express.Router();

router.get("/", isLoggedIn, MilestoneService.getMilestone);
router.post("/", isLoggedIn, MilestoneService.insertMilestone);
router.put("/", isLoggedIn, MilestoneService.updateMilestone);
router.delete("/", isLoggedIn, MilestoneService.deleteMilestone);

export default router;