import express from "express";
import { registerUser } from "../Controller/user.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer();
router.post("/register", upload.none(), registerUser);

export default router;