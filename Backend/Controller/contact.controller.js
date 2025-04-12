
import asyncHandler from "../Helpers/AsyncHandler.js";
import ApiError from "../Helpers/ApiError.js";
import ApiResponse from "../Helpers/ApiResponse.js";
import contactModel from "../Models/contact.model.js";
import invitationModel from "../Models/invitation.model.js";

export const addContact = asyncHandler(async (req, res, next) => {
    const { name, email, phone, address } = req.body;
    const userId = req.user?._id;

    if (!name || name.trim() === "") {
        return next(new ApiError(400, "Name is required"));
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return next(new ApiError(400, "Invalid email format"));
    }
    if (phone && !/^\d{10}$/.test(phone)) {
        return next(new ApiError(400, "Phone number must be exactly 10 digits"));
    }

    const contact = await contactModel.create({
        user: userId,
        name: name.trim(),
        email: email ? email.trim() : undefined,
        phone: phone ? phone.trim() : undefined,
        address: address ? address.trim() : undefined,
    });

    return res.status(201).json(new ApiResponse(201, "Contact added successfully", contact));
});

export const getContacts = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    const contacts = await contactModel.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, "Contacts retrieved successfully", contacts));
});

export const updateContact = asyncHandler(async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone, address } = req.body;
    const userId = req.user?._id;

    if (!name || name.trim() === "") {
        return next(new ApiError(400, "Name is required"));
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return next(new ApiError(400, "Invalid email format"));
    }
    if (phone && !/^\d{10}$/.test(phone)) {
        return next(new ApiError(400, "Phone number must be exactly 10 digits"));
    }

    const contact = await contactModel.findOneAndUpdate(
        { _id: contactId, user: userId },
        {
            name: name.trim(),
            email: email ? email.trim() : undefined,
            phone: phone ? phone.trim() : undefined,
            address: address ? address.trim() : undefined,
        },
        { new: true }
    );

    if (!contact) {
        return next(new ApiError(404, "Contact not found or not authorized"));
    }

    return res.status(200).json(new ApiResponse(200, "Contact updated successfully", contact));
});

export const deleteContact = asyncHandler(async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user?._id;

    const contact = await contactModel.findOneAndDelete({ _id: contactId, user: userId });

    if (!contact) {
        return next(new ApiError(404, "Contact not found or not authorized"));
    }

    // Remove contact from invitations
    await invitationModel.updateMany(
        { user: userId, contacts: contactId },
        { $pull: { contacts: contactId } }
    );

    return res.status(200).json(new ApiResponse(200, "Contact deleted successfully"));
});