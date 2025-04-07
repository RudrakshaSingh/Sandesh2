import ApiError from "../Helpers/ApiError.js";
import ApiResponse from "../Helpers/ApiResponse.js";
import asyncHandler from "../Helpers/AsyncHandler.js";
import userModel from "../Models/user.model.js";

export const registerUser = asyncHandler(async (req, res, next) => {
	const { firstname, lastname, email, password, mobileNumber, address } = req.body;

	// Validate firstname
	if (!firstname || firstname.trim().length < 3) {
		return next(new ApiError(400, "First name is required and must be at least 3 characters long"));
	}

	// Validate lastname
	if (!lastname || lastname.trim().length < 3) {
		return next(new ApiError(400, "Last name is required and must be at least 3 characters long"));
	}

	// Capitalize first letter of firstname and lastname
	const capitalizedFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
	const capitalizedLastName = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

	// Validate email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email || !emailRegex.test(email)) {
		return next(new ApiError(400, "Please provide a valid email"));
	}

	// Validate password (at least 8 characters, one uppercase, one lowercase, one number)
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

	if (!password || !passwordRegex.test(password)) {
		return next(
			new ApiError(
				400,
				"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			)
		);
	}

	// Check if email already exists
	const isUserEmailAlreadyExists = await userModel.findOne({ email });
	if (isUserEmailAlreadyExists) {
		return next(new ApiError(400, "User email already exists"));
	}

	// Create user - the password will be hashed automatically by the pre-save hook
	const user = await userModel.create({
		fullname: {
			firstname: capitalizedFirstName,
			lastname: capitalizedLastName,
		},
		email,
		password,
		mobileNumber,
		address,
	});

	// Remove password from response
	const userWithoutPassword = user.toObject();
	delete userWithoutPassword.password;

	return res.status(201).json(new ApiResponse(201, "User created successfully", userWithoutPassword));
});
