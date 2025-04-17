// Models/contact.model.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        mobileNumber: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        relation:{
            type: String,
            trim: true,
            enum: ["Family", "Friend", "Relative", "Other"]
        }
    },
    { timestamps: true }
);

const contactModel = mongoose.model("Contact", contactSchema);
export default contactModel;