import ApiError from "../Helpers/ApiError.js";
import ApiResponse from "../Helpers/ApiResponse.js";
import asyncHandler from "../Helpers/AsyncHandler.js";
import uploadOnCloudinary from "../Helpers/Cloudinary.js";
import userModel from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import deleteOnCloudinary from "../Helpers/deleteOnCloudinary.js";
import sendEmail from "../Helpers/sendEmail.js";
import crypto from "crypto";

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

	// Handle profile image upload
	const profilePictureLocalPath = req.file?.path;
	let profileImageUrl = process.env.DEFAULT_PROFILE_IMAGE_URL;

	if (profilePictureLocalPath) {
		// Upload to Cloudinary
		const profileImage = await uploadOnCloudinary(profilePictureLocalPath);
		if (!profileImage) {
			return next(new ApiError(400, "Error uploading profile picture"));
		}
		profileImageUrl = profileImage.url;
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
		profileImage: profileImageUrl, // Add profile image URL to the user document
	});

	// Remove password from response
	const userWithoutPassword = user.toObject();
	delete userWithoutPassword.password;

	return res.status(201).json(new ApiResponse(201, "User created successfully", userWithoutPassword));
});

export const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email and password are provided
	if (!email || !password) {
		return next(new ApiError(400, "Email and password are required"));
	}

	// Find user by email
	const user = await userModel.findOne({ email }).select("+password");

	// Check if user exists
	if (!user) {
		return next(new ApiError(404, "User not found"));
	}

	// Verify password
	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) {
		return next(new ApiError(401, "Invalid credentials"));
	}

	// Generate access and refresh tokens
	const accessToken = user.generateAccessToken();
	const refreshToken = user.generateRefreshToken();

	// Save refresh token to user document
	user.refreshToken = refreshToken;
	await user.save({ validateBeforeSave: false });

	// Set cookies options
	const cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	};

	// Remove password from response
	const userWithoutPassword = user.toObject();
	delete userWithoutPassword.password;
	delete userWithoutPassword.refreshToken;

	// Set cookies and send response
	return res
		.status(200)
		.cookie("accessToken", accessToken, cookieOptions)
		.cookie("refreshToken", refreshToken, {
			...cookieOptions,
			// Set longer expiry for refresh token
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
		})
		.json(
			new ApiResponse(200, "User logged in successfully", {
				user: userWithoutPassword,
				accessToken,
				refreshToken,
			})
		);
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
	// Get refresh token from cookie or request body
	const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

	// Check if refresh token exists
	if (!incomingRefreshToken) {
		return next(new ApiError(401, "Unauthorized request: Refresh token not found"));
	}

	try {
		// Verify the refresh token
		const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

		// Find user with this refresh token
		const user = await userModel.findById(decodedToken._id);
		if (!user) {
			return next(new ApiError(401, "Invalid refresh token or user not found"));
		}

		// Check if incoming refresh token matches stored token
		if (incomingRefreshToken !== user.refreshToken) {
			return next(new ApiError(401, "Refresh token is expired or used"));
		}

		// Generate new tokens
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		// Update refresh token in database
		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		// Set cookie options
		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		};

		// Send response with new tokens
		return res
			.status(200)
			.cookie("accessToken", accessToken, cookieOptions)
			.cookie("refreshToken", refreshToken, {
				...cookieOptions,
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
			})
			.json(
				new ApiResponse(200, "Access token refreshed", {
					accessToken,
					refreshToken,
				})
			);
	} catch (error) {
		// Handle JWT verification errors
		return next(new ApiError(401, error?.message || "Invalid refresh token"));
	}
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
	// Get user from the authenticated request
	// This assumes you have middleware that sets req.user
	const userId = req.user?._id;

	if (!userId) {
		return next(new ApiError(401, "Unauthorized: User not authenticated"));
	}

	// Find the user by ID
	const user = await userModel.findById(userId);

	if (!user) {
		return next(new ApiError(404, "User not found"));
	}

	// Return the user profile without sensitive information
	return res.status(200).json(new ApiResponse(200, "User profile retrieved successfully", user));
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
    // Get user from the authenticated request
    const userId = req.user?._id;
    
    if (!userId) {
        return next(new ApiError(401, "Unauthorized: User not authenticated"));
    }
    
    // Check if req.body exists, and provide fallback
    const body = req.body || {};
    const { firstname, lastname, mobileNumber, address } = body;
	// Check if any updates were provided, including profile image
    const profileImageProvided = req.file?.path ? true : false;
    
    if (!firstname && !lastname && !mobileNumber && !address && !profileImageProvided) {
        return next(new ApiError(400, "No updates provided. Please provide at least one field to update."));
    }
    
    // Find the user
    const user = await userModel.findById(userId);
    
    if (!user) {
        return next(new ApiError(404, "User not found"));
    }
    
    // Validate and update firstname if provided
    if (firstname !== undefined) {
        if (firstname.trim().length < 3) {
            return next(new ApiError(400, "First name must be at least 3 characters long"));
        }
        user.fullname.firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
        console.log(user.fullname.firstname);
    }
    
    // Validate and update lastname if provided
    if (lastname !== undefined) {
        if (lastname.trim().length < 3) {
            return next(new ApiError(400, "Last name must be at least 3 characters long"));
        }
        user.fullname.lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
    }
    
    // Validate and update mobile number if provided
    if (mobileNumber !== undefined) {
        // Check if mobile number is exactly 10 digits
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobileNumber)) {
            return next(new ApiError(400, "Mobile number must be exactly 10 digits"));
        }
        user.mobileNumber = mobileNumber;
    }
    
    if (address) {
        user.address = address;
    }
    
    // Handle profile image update if a new file is uploaded
    const profilePictureLocalPath = req.file?.path;
    
    if (profilePictureLocalPath) {
        // Store the previous profile image URL for deletion
        const previousProfileImageUrl = user.profileImage;
        
        // Upload to Cloudinary
        const profileImage = await uploadOnCloudinary(profilePictureLocalPath);
        if (!profileImage) {
            return next(new ApiError(400, "Error uploading profile picture"));
        }
        
        // Update user profile with new image URL
        user.profileImage = profileImage.url;
        
        // Delete previous profile image from Cloudinary if it's not the default
        if (previousProfileImageUrl && previousProfileImageUrl !== process.env.DEFAULT_PROFILE_IMAGE_URL) {
            await deleteOnCloudinary(previousProfileImageUrl);
        }
    }
    
    // Save the updated user
    await user.save();
    
    return res.status(200).json(new ApiResponse(200, "Profile updated successfully", user));
});

export const logoutUser = asyncHandler(async (req, res, next) => {
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
	return res.status(200).json(new ApiResponse(200, "Logged out successfully"));
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
    // Extracting email from request body
    const { email } = req.body;

    // Validate email
    if (!email) {
        return next(new ApiError(400, "Email is required"));
    }

    // Finding the user via email
    const user = await userModel.findOne({ email });

    // If no email found send the message email not found
    if (!user) {
        return next(new ApiError(404, "Email not registered"));
    }
	console.log("h");

    // Generating the reset token via the method we have in user model
    const resetToken = await user.generatePasswordResetToken();
	console.log("hh");

    // Saving the forgotPassword fields to DB
    await user.save({ validateBeforeSave: false });

    // Constructing URL for password reset
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/user/reset-password/${resetToken}`;

    // Setup email content
    const subject = "Reset Password";
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);

        // If email sent successfully send the success response
        return res.status(200).json(
            new ApiResponse(200, `Reset password token has been sent to ${email} successfully`)
        );
    } catch (error) {
        // If some error happened we need to clear the forgotPassword fields in our DB
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ApiError(500, error?.message || "Something went wrong, please try again."));
    }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
    // Extracting resetToken from req.params object
    const { resetToken } = req.params;
    console.log("resetToken", resetToken);
    
    // Extracting password from req.body object
    const { password } = req.body;

    // Check if password is provided
    if (!password) {
        return next(new ApiError(400, "Password is required"));
    }

    // Validate password (at least 8 characters, one uppercase, one lowercase, one number, one special character)
    const passwordRegex = 
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

    if (!passwordRegex.test(password)) {
        return next(
            new ApiError(
                400,
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
        );
    }

    // We are again hashing the resetToken using sha256 since we have stored our resetToken in DB using the same algorithm
    const forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Checking if token matches in DB and if it is still valid (not expired)
    const user = await userModel.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }, // Check if token is still valid
    });

    // If not found or expired send the response
    if (!user) {
        return next(new ApiError(400, "Token is invalid or expired, please try again"));
    }

    // Update the password if token is valid and not expired
    user.password = password;

    // Clear forgotPassword fields in the DB
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    // Saving the updated user values
    await user.save();

    // Sending the response
    return res.status(200).json(
        new ApiResponse(200, "Password changed successfully")
    );
});

export const changePassword = asyncHandler(async (req, res, next) => {
    // Destructuring the necessary data from the req object
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?._id; // Get user ID from authenticated request

    // Check if user is authenticated
    if (!userId) {
        return next(new ApiError(401, "Unauthorized: User not authenticated"));
    }

    // Check if the values are there or not
    if (!oldPassword || !newPassword) {
        return next(new ApiError(400, "Old password and new password are required"));
    }

    // Validate new password
    const passwordRegex = 
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
        return next(
            new ApiError(
                400,
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
        );
    }

    // Finding the user by ID and selecting the password
    const user = await userModel.findById(userId).select("+password");

    // If no user then throw an error message
    if (!user) {
        return next(new ApiError(404, "User not found"));
    }

    // Check if the old password is correct
    const isPasswordValid = await user.comparePassword(oldPassword);

    // If the old password is not valid then throw an error message
    if (!isPasswordValid) {
        return next(new ApiError(401, "Invalid old password"));
    }

    // Setting the new password
    user.password = newPassword;

    // Save the data in DB
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, "Password changed successfully")
    );
});