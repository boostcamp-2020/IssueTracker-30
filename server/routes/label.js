import express from "express";

import isLoggedIn from "../middleware/auth";
import LabelService from "../service/label-service";

const router = express.Router();

router.get("/", isLoggedIn, LabelService.getLabel);
router.post("/", isLoggedIn, LabelService.insertLabel);
router.put("/", isLoggedIn, LabelService.updateLabel);
router.delete("/", isLoggedIn, LabelService.deleteLabel);

export default router;