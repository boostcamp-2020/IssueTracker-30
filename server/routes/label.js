import express from "express";

import isLoggedIn from "../middleware/auth";
import LabelService from "../service/label-service";

const router = express.Router();

router.get("/", isLoggedIn, LabelService.getLabel);

export default router;