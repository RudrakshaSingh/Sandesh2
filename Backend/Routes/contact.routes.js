// Routes/contact.routes.js
import express from "express";
import { addContact, getContacts, updateContact, deleteContact } from "../Controller/contact.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, addContact);
router.get("/", verifyJWT, getContacts);
router.put("/:contactId", verifyJWT, updateContact);
router.delete("/:contactId", verifyJWT, deleteContact);

export default router;