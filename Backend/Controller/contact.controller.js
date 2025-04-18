import asyncHandler from "../Helpers/AsyncHandler.js";
import ApiError from "../Helpers/ApiError.js";
import ApiResponse from "../Helpers/ApiResponse.js";
import contactModel from "../Models/contact.model.js";
import invitationModel from "../Models/invitation.model.js";

export const addContact = asyncHandler(async (req, res, next) => {
	try {
		const { name, mobileNumber, address, relation } = req.body;
		const userId = req.user?._id;
		console.log(userId, name, mobileNumber, address, relation);

		if (!name || name.trim() === "") {
			return next(new ApiError(400, "Name is required"));
		}
		if (mobileNumber && !/^\d{10}$/.test(mobileNumber)) {
			return next(new ApiError(400, "Phone number must be exactly 10 digits"));
		}
		const validRelations = ["Family", "Friend", "Relative", "Other"];
		if (!relation || !validRelations.includes(relation)) {
			return next(new ApiError(400, "Please provide a valid relation (Family, Friend, Relative, Other)"));
		}

		const existingContact = await contactModel.findOne({ user: userId, mobileNumber: mobileNumber });
		if (existingContact) {
			return next(new ApiError(400, "Contact with this phone number already exists"));
		}

		const contact = await contactModel.create({
			user: userId,
			name: name,
			mobileNumber: mobileNumber,
			address: address,
			relation: relation,
		});

		return res.status(200).json(new ApiResponse(201, "Contact added successfully", contact));
	} catch (error) {
		return next(new ApiError(500, "error in adding contact"));
	}
});

export const getContacts = asyncHandler(async (req, res, next) => {
	const userId = req.user?._id;
	const contacts = await contactModel.find({ user: userId }).sort({ createdAt: -1 });
    console.log(contacts);
	return res.status(200).json(contacts);


});

export const updateContact = asyncHandler(async (req, res, next) => {
	const { contactId } = req.params;
	const { name, mobileNumber, address, relation } = req.body;
	const userId = req.user?._id;

	// Create an update object with only the fields that were provided
	const updateFields = {};

	// Check and add fields only if they are provided
	if (name !== undefined) {
		if (name.trim() === "") {
			return next(new ApiError(400, "Name cannot be empty if provided"));
		}
		updateFields.name = name.trim();
	}

	if (mobileNumber !== undefined) {
		if (mobileNumber.trim() !== "" && !/^\d{10}$/.test(mobileNumber.trim())) {
			return next(new ApiError(400, "Phone number must be exactly 10 digits if provided"));
		}
		// Check if another contact (excluding this one) with the same userId has the same mobileNumber
		if (mobileNumber.trim() !== "") {
			const existingContact = await contactModel.findOne({
				user: userId,
				mobileNumber: mobileNumber.trim(),
				_id: { $ne: contactId }, // Exclude the current contact being updated
			});
			if (existingContact) {
				return next(new ApiError(400, "Another contact with this phone number already exists"));
			}
		}
		updateFields.mobileNumber = mobileNumber.trim() || undefined;
	}

	if (address !== undefined) {
		updateFields.address = address.trim() || undefined;
	}

	if (relation !== undefined) {
		const validRelations = ["Family", "Friend", "Relative", "Other"];
		if (relation.trim() !== "" && !validRelations.includes(relation.trim())) {
			return next(new ApiError(400, "Please provide a valid relation (Family, Friend, Relative, Other)"));
		}
		updateFields.relation = relation.trim() || undefined;
	}

	// If no fields were provided for update
	if (Object.keys(updateFields).length === 0) {
		return next(new ApiError(400, "At least one field must be provided for update"));
	}

	const contact = await contactModel.findOneAndUpdate(
		{ _id: contactId, user: userId },
		updateFields,
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
	await invitationModel.updateMany({ user: userId, contacts: contactId }, { $pull: { contacts: contactId } });

	return res.status(200).json(new ApiResponse(200, "Contact deleted successfully"));
});
