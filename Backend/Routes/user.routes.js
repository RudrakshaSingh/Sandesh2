import express from "express";
import { loginUser, registerUser } from "../Controller/user.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer();
router.post("/register", upload.none(), registerUser);
router.post("/login", upload.none(), loginUser);


export default router;