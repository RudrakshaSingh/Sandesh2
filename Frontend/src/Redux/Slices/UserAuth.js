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
};

// Create async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/register", userData);
      if (response.status === 201) {
        toast.success("User Created Successfully");
        // Save tokens if they are returned in the response
        saveAuthTokens(response);
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "User Creation Failed");
      return rejectWithValue(error.response?.data || { message: "Registration failed" });
    }
  }
);

// Create async thunk for user login
export const loginUser = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/users/login", userData);
        if (response.status === 200) {
          toast.success("Login Successful");
          saveAuthTokens(response); // Save tokens from response.data.message
        //   console.log("Login response:", response.data);
          return response.data; // Return full response.data for Redux
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login Failed");
        return rejectWithValue(error.response?.data || { message: "Login failed" });
      }
    }
  );

// Create async thunk for user logout
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const config = await prepareAuthRequest();
      if (!config) {
        resetUserAndTokens(); // Clear tokens if no valid auth
        dispatch(resetUserState()); // Reset Redux state
        return { message: "Logged out due to invalid tokens" };
      }

      const response = await axiosInstance.post("/users/logout", {}, config);
      if (response.status === 200) {
        toast.success("Logout Successful");
        resetUserAndTokens(); // Clear tokens after successful logout
        dispatch(resetUserState()); // Reset Redux state
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Failed");
      resetUserAndTokens(); // Clear tokens on failure
      dispatch(resetUserState()); // Reset Redux state
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);

// Create async thunk for fetching user profile
export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const config = await prepareAuthRequest();
      if (!config) {
        return rejectWithValue({ message: "Authentication failed" });
      }

      const response = await axiosInstance.get("/users/profile", config);
      console.log("Profile response:", response.data);
      
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
      return rejectWithValue(error.response?.data || { message: "Failed to fetch profile" });
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
        console.log("Fulfilled payload:", action.payload.message.user);
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
        state.success = true;
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
        state.loading = false;
        state.user = action.payload.data;
        state.success = true;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch profile";
        if (action.payload?.message === "Authentication failed") {
          state.user = null; // Clear user on auth failure
        }
      });
  },
});

// Export actions and reducer
export const { resetUserState } = userAuthSlice.actions;
export default userAuthSlice.reducer;