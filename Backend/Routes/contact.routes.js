// Routes/contact.routes.js
import express from "express";
import { addContact, getContacts, updateContact, deleteContact } from "../Controller/contact.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add-contact", verifyJWT, addContact);
router.get("/contacts-list", verifyJWT, getContacts);
router.put("/update-contact/:contactId", verifyJWT, updateContact);
router.delete("/delete-contact/:contactId", verifyJWT, deleteContact);

export default router;