import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Components/Helpers/axiosInstance';

// Initial state for the user authentication
const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false
}

// Create async thunk for user registration
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/register', userData);
            if (response.status === 201) {
                toast.success('User Created Successfully');
            }
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'User Creation Failed');
            return rejectWithValue(error.response?.data || { message: 'Registration failed' });
        }
    }
);

// Create the user authentication slice
const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Handle successful registration
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.success = true;
                state.error = null;
            })
            // Handle registration failure
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Something went wrong';
                state.success = false;
            })
    }
});

// Export actions and reducer
export const { resetUserState } = userAuthSlice.actions;
export default userAuthSlice.reducer;