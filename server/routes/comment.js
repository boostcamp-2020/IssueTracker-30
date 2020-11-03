import express from "express";

import isLoggedIn from "../middleware/auth";
import CommentService from "../service/comment-service"

const router = express.Router();

router.post("/getComment", isLoggedIn, CommentService.getComment);

router.post("/insertcomment", isLoggedIn, CommentService.insertComment);

router.put("/", isLoggedIn, CommentService.updateComment);

router.delete("/", isLoggedIn, CommentService.deleteComment);

export default router;



