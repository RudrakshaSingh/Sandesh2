// Routes/invitation.routes.js
import express from "express";
import { createInvitation, getInvitations } from "../Controller/invitation.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createInvitation);
router.get("/", verifyJWT, getInvitations);

export default router;