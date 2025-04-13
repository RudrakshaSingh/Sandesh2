// Models/invitation.model.js
import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            trim: true,
        },
        contacts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Contact",
            },
        ],
    },
    { timestamps: true }
);

const invitationModel = mongoose.model("Invitation", invitationSchema);
export default invitationModel;