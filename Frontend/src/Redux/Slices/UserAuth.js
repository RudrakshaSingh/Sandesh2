/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
import { prepareAuthRequest, resetUserAndTokens, saveAuthTokens } from "../../Helpers/tokenHelper";

// Initial state for the user authentication
const initialState = {
	user: null,
	loading: false,
	error: null,
	success: false,
	resetEmailSent: false,
	passwordResetSuccess: false,
	passwordChangeSuccess: false,
};

// Create async thunk for user registration
export const registerUser = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
	try {
		// Detect Google registration (from password pattern)
		const isGoogleSignup = typeof userData?.get === "function" && userData.get("password")?.startsWith("Google-");

		const response = await axiosInstance.post("/users/register", userData);

		if (response.status === 201 || response.status === 200) {
			toast.success(isGoogleSignup ? "Google Sign-up Successful" : "User Created Successfully");

			// Save tokens if your backend sends them (optional)
			saveAuthTokens(response);
		}

		return response.data;
	} catch (error) {
		const errMsg = error.response?.data?.message || "User Creation Failed";
		toast.error(errMsg);
		return rejectWithValue(error.response?.data || { message: errMsg });
	}
});

// Create async thunk for user login
export const loginUser = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
	try {
		// Check if the login is via Google (FormData with flag)
		const isGoogleLogin = typeof userData?.get === "function" && userData.get("isGoogleLogin") === "true";

		// Make API call to login
		const response = await axiosInstance.post("/users/login", userData);

		// If login successful
		if (response.status === 200) {
			toast.success(isGoogleLogin ? "Google login successful" : "Login successful");

			// Save auth tokens (access + refresh) from response
			saveAuthTokens(response); // You may adjust this based on how you save cookies/localStorage

			return response.data; // Send data to Redux store
		}
	} catch (error) {
		const errorMsg = error.response?.data?.message || "Login failed";

		toast.error(errorMsg);

		// Forward full error object to rejected action
		return rejectWithValue(error.response?.data || { message: errorMsg });
	}
});

// Create async thunk for user logout with improved error handling
export const logoutUser = createAsyncThunk("users/logout", async (_, { rejectWithValue, dispatch }) => {
	try {
		const config = await prepareAuthRequest();

		// If no valid auth config, just perform client-side logout
		if (!config) {
			resetUserAndTokens(); // Clear tokens
			dispatch(resetUserState()); // Reset Redux state
			toast.success("Logged out successfully");
			return { message: "Logged out successfully" };
		}

		// Try server-side logout
		try {
			const response = await axiosInstance.post("/users/logout", {}, config);
			if (response.status === 200) {
				toast.success("Logout Successful");
				resetUserAndTokens(); // Clear tokens after successful logout
				dispatch(resetUserState()); // Reset Redux state
				return response.data;
			}
		} catch (serverError) {
			// If we get a 401 or any other error, still perform client-side logout
			if (serverError.response?.status === 401) {
				toast.success("Logged out successfully");
			} else {
				toast.error("Could not connect to server, but logged out locally");
			}

			resetUserAndTokens(); // Clear tokens on failure
			dispatch(resetUserState()); // Reset Redux state

			// We don't reject with value here, as we still want to treat this as a successful logout
			return { message: "Logged out successfully" };
		}

		return { message: "Logged out successfully" };
	} catch (error) {
		// This catch will rarely be hit (only for unexpected errors)
		console.error("Unexpected error during logout:", error);

		// Still perform client-side logout
		resetUserAndTokens();
		dispatch(resetUserState());

		toast.success("Logged out successfully");
		return { message: "Logged out successfully" };
	}
});

export const updateUserProfile = createAsyncThunk("user/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    const config = await prepareAuthRequest();
    if (!config) {
      return rejectWithValue({ message: "Authentication failed" });
    }

    // Set the proper headers for FormData with file upload
    const headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };

    // Check if there's any data to update
    if ([...userData.entries()].length === 0) {
      return rejectWithValue({ message: "No data to update" });
    }

    const response = await axiosInstance.put("/users/profile", userData, {
      headers,
    });

    if (response.status === 200) {
      toast.success("Profile updated successfully");
      return response.data;
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update profile");
    return rejectWithValue(error.response?.data || { message: "Failed to update profile" });
  }
});

// Create async thunk for fetching user profile
export const getUserProfile = createAsyncThunk("user/profile", async (_, { rejectWithValue }) => {
    try {
        const config = await prepareAuthRequest();
        if (!config) {
            return rejectWithValue({ message: "Authentication failed" });
        }
        const response = await axiosInstance.get(`/users/profile?r=${Math.random()}`, {
            ...config,
            headers: {
                ...config.headers,
                "Cache-Control": "no-cache"
            }
        });
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch profile");
        return rejectWithValue(error.response?.data || { message: "Failed to fetch profile" });
    }
});

// Create async thunk for forgot password
export const forgotPassword = createAsyncThunk("user/forgotPassword", async ({ email }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("/users/forgot-password", { email });
		if (response.status === 200) {
			toast.success("Password reset link sent to your email");
			return response.data;
		}
	} catch (error) {
		toast.error(error.response?.data?.message || "Failed to send reset link");
		return rejectWithValue(error.response?.data || { message: "Failed to send reset link" });
	}
});

// Create async thunk for reset password
export const resetPassword = createAsyncThunk(
	"user/resetPassword",
	async ({ resetToken, password }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(`/users/reset-password/${resetToken}`, { password });
			if (response.status === 200) {
				toast.success("Password reset successfully");
				return response.data;
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Password reset failed");
			return rejectWithValue(error.response?.data || { message: "Password reset failed" });
		}
	}
);

// Create async thunk for change password (when logged in)
export const changePassword = createAsyncThunk(
	"user/changePassword",
	async ({ oldPassword, newPassword }, { rejectWithValue }) => {
		try {
			const config = await prepareAuthRequest();
			if (!config) {
				return rejectWithValue({ message: "Authentication failed" });
			}

			const response = await axiosInstance.post("/users/change-password", { oldPassword, newPassword }, config);

			if (response.status === 200) {
				toast.success("Password changed successfully");
				return response.data;
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Password change failed");
			return rejectWithValue(error.response?.data || { message: "Password change failed" });
		}
	}
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async ({ password }, { rejectWithValue, dispatch }) => {
    try {
      const config = await prepareAuthRequest();
      if (!config) {
        return rejectWithValue({ message: "Authentication failed" });
      }

      const response = await axiosInstance.delete("/users/delete-account", { 
        data: { password },
        ...config 
      });

      if (response.status === 200) {
        toast.success("Account deleted successfully");
        resetUserAndTokens(); // Clear tokens
        dispatch(resetUserState()); // Reset Redux state
        return response.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
      return rejectWithValue(error.response?.data || { message: "Failed to delete account" });
    }
  }
);


// Create the user authentication slice
const userAuthSlice = createSlice({
	name: "userAuth",
	initialState,
	reducers: {
		resetUserState: (state) => {
			state.loading = false;
			state.error = null;
			state.success = false;
			state.user = null; // Ensure user is cleared when resetting state
		},
	},
	extraReducers: (builder) => {
		builder
			// Register user cases
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.data;
				state.success = true;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Something went wrong";
				state.success = false;
			})

			// Login user cases
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				// User data is in response.data.message.user
				state.user = action.payload.message.user || null;
				state.success = true;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Login failed";
				state.success = false;
			})

			// Logout user cases
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null; // User is cleared in reducer due to resetUserState
				state.success = false; // Set to false since user is now logged out
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Logout failed";
				state.success = false;
				state.user = null; // Ensure user is cleared on logout failure
			})

			// Get user profile cases
			.addCase(getUserProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				console.log("kk", action.payload.message); // Debugging line to check payload

				state.loading = false;
				state.user = action.payload.message || null; // Adjust this path if needed based on your API response
				state.success = true;
				state.error = null;
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Failed to fetch profile";
				if (action.payload?.message === "Authentication failed") {
					state.user = null; // Clear user on auth failure
				}
			})

			// Forgot password cases
			.addCase(forgotPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.resetEmailSent = false;
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.loading = false;
				state.resetEmailSent = true;
				state.error = null;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Failed to send reset link";
				state.resetEmailSent = false;
			})

			// Reset password cases
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.passwordResetSuccess = false;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.loading = false;
				state.passwordResetSuccess = true;
				state.error = null;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Password reset failed";
				state.passwordResetSuccess = false;
			})

			// Change password cases
			.addCase(changePassword.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.passwordChangeSuccess = false;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.loading = false;
				state.passwordChangeSuccess = true;
				state.error = null;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Password change failed";
				state.passwordChangeSuccess = false;
			})

			// update profile
			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.message;
				state.success = true;
				state.error = null;
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Failed to update profile";
				state.success = false;
			})

      //delete
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete account";
      });
	},
});

// Export actions and reducer
export const { resetUserState } = userAuthSlice.actions;
export default userAuthSlice.reducer;
