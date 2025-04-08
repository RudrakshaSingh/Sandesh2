import jwt from "jsonwebtoken";
import ApiError from "../Helpers/ApiError.js";
import asyncHandler from "../Helpers/AsyncHandler.js";
import userModel from "../Models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookies or authorization header
    const token = req.cookies?.accessToken || 
                 (req.headers.authorization && req.headers.authorization.startsWith("Bearer") 
                  ? req.headers.authorization.split(" ")[1] 
                  : null);

    // Check if token exists
    if (!token) {
      return next(new ApiError(401, "Unauthorized request: Token missing"));
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user (optional - for extra security)
    const user = await userModel.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
      return next(new ApiError(401, "Invalid access token: User not found"));
    }

    // Add user to request object
    req.user = user;
    
    // Proceed to the protected route
    next();
  } catch (error) {
    // Handle errors (expired token, invalid signature, etc.)
    return next(new ApiError(401, error?.message || "Invalid access token"));
  }
});