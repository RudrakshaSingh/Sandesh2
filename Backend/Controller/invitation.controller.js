// Controller/invitation.controller.js
import asyncHandler from "../Helpers/AsyncHandler.js";
import ApiError from "../Helpers/ApiError.js";
import ApiResponse from "../Helpers/ApiResponse.js";
import invitationModel from "../Models/invitation.model.js";
import contactModel from "../Models/contact.model.js";

export const createInvitation = asyncHandler(async (req, res, next) => {
    const { title, message, contactIds } = req.body;
    const userId = req.user?._id;

    if (!title || title.trim() === "") {
        return next(new ApiError(400, "Invitation title is required"));
    }
    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
        return next(new ApiError(400, "At least one contact must be selected"));
    }

    // Verify contactIds belong to the user
    const contacts = await contactModel.find({
        _id: { $in: contactIds },
        user: userId,
    });

    if (contacts.length !== contactIds.length) {
        return next(new ApiError(400, "Invalid or unauthorized contact IDs"));
    }

    const invitation = await invitationModel.create({
        user: userId,
        title: title.trim(),
        message: message ? message.trim() : undefined,
        contacts: contactIds,
    });

    return res.status(201).json(new ApiResponse(201, "Invitation created successfully", invitation));
});

export const getInvitations = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    const invitations = await invitationModel
        .find({ user: userId })
        .populate("contacts", "name email phone address")

    return res.status(200).json(new ApiResponse(200, "Invitations retrieved successfully", invitations));
});