import express from "express";
import { getUserProfile, loginUser, refreshAccessToken, registerUser } from "../Controller/user.controller.js";
import multer from "multer";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import {upload} from "../Middlewares/multer.middleware.js";

const router = express.Router();
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", upload.none(), loginUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/profile", verifyJWT, getUserProfile);
// router.put("/update-profile", verifyJWT, updateUserProfile);

export default router;