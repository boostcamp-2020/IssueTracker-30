import express from "express";

import isLoggedIn from "../middleware/auth";
import UserService from "../service/user-service";
require('dotenv').config();

const router = express.Router();

router.get("/", isLoggedIn, UserService.getUser);

router.post("/saveImg", UserService.saveImg);

router.post("/signUp", UserService.signUp);

router.post("/signIn", UserService.signIn);

router.post("/signIn/auth", UserService.signInAuth);

router.get("/signOut", UserService.signOut);

export default router;
