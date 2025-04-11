import express from "express";
import { changePassword, forgotPassword, getUserProfile, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword, updateUserProfile } from "../Controller/user.controller.js";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import {upload} from "../Middlewares/multer.middleware.js";

const router = express.Router();
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", upload.none(), loginUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/profile", verifyJWT, getUserProfile);
router.post("/logout",verifyJWT,logoutUser );
router.put("/profile", verifyJWT, upload.single("profileImage"), updateUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/change-password", verifyJWT, changePassword);

export default router;