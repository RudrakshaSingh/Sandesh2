import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
import { prepareAuthRequest } from "../../Helpers/tokenHelper";

// Initial state
const initialState = {
	contacts: [],
	loading: false,
	error: null,
	success: false,
};

export const addContact = createAsyncThunk("contacts/add-contact", async (data, { rejectWithValue }) => {
	try {
		const config = await prepareAuthRequest();
		if (!config) {
			return rejectWithValue({ message: "Authentication failed" });
		}

		// Set the proper headers for FormData with file upload
		const headers = {
			...config.headers,
			'Content-Type': 'application/json',
		};
		// Check if data exists
		if (!data) {
			return rejectWithValue({ message: "No data provided" });
		}
    console.log(data);
    
		const response = await axiosInstance.post("/contacts/add-contact", data, {
			headers,
		});

		if (response.status === 200) {
			toast.success("Contact added successfully");
			return response.data;
		}
	} catch (error) {

		toast.error(error.response?.data?.message || "Failed to add contact");
		return rejectWithValue(error.response?.data || { message: error.message || "Something went wrong" });
	}
});
// Slice definition
const contactSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		clearContactState: (state) => {
      state.contacts = [];
			state.loading = false;
			state.error = null;
			state.success = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addContact.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(addContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Something went wrong";
			});
	},
});

// Exports
export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;
