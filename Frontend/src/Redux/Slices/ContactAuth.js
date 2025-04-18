import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
import { prepareAuthRequest } from "../../Helpers/tokenHelper";

// Initial state
const initialState = {
	contact: [],
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
export const getContacts = createAsyncThunk("contacts/get-contacts", async (_, { rejectWithValue }) => {
	try {
		const config = await prepareAuthRequest();
		if (!config) return rejectWithValue({ message: "Authentication failed" });

		const response = await axiosInstance.get("/contacts/contacts-list", {
			headers: config.headers,
		});

		if (response.status === 200) {
			toast.success("Contacts fetched successfully");
			return response.data;
		}
	} catch (error) {
		toast.error(error.response?.data?.message || "Failed to fetch contacts");
		return rejectWithValue(error.response?.data || { message: error.message || "Something went wrong" });
	}
});
export const updateContact = createAsyncThunk(
	"contacts/update-contact",
	async (data, { rejectWithValue }) => {
	  try {
		const config = await prepareAuthRequest();
		if (!config) return rejectWithValue({ message: "Authentication failed" });

		// Send data correctly to match backend expectations
		const response = await axiosInstance.put(
		  `/contacts/update-contact/${data.contactId}`,
		  {
			name: data.name,
			mobileNumber: data.mobileNumber,
			address: data.address,
			relation: data.relation
		  },
		  {
			headers: config.headers,
		  }
		);

		if (response.status === 200) {
		  toast.success("Contact updated successfully");
		  return response.data;
		}
	  } catch (error) {
		toast.error(error.response?.data?.message || "Failed to update contact");
		return rejectWithValue(
		  error.response?.data || { message: error.message || "Something went wrong" }
		);
	  }
	}
  );
export const deleteContact = createAsyncThunk("contacts/delete-contact", async (contactId, { rejectWithValue }) => {
	try {
		const config = await prepareAuthRequest();
		if (!config) return rejectWithValue({ message: "Authentication failed" });

		const response = await axiosInstance.delete(`/contacts/delete-contact/${contactId}`, {
			headers: config.headers,
		});

		if (response.status === 200) {
			toast.success("Contact deleted successfully");
			return response.data;
		}
	} catch (error) {
		toast.error(error.response?.data?.message || "Failed to delete contact");
		return rejectWithValue(error.response?.data || { message: error.message || "Something went wrong" });
	}
}
);


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
			})
			.addCase(getContacts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getContacts.fulfilled, (state, action) => {
				state.loading = false;

				state.contact = action.payload|| [];
			})
			.addCase(getContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Something went wrong";
			})
			.addCase(updateContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateContact.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Something went wrong";
			})
			.addCase(deleteContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteContact.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || "Something went wrong";
				state.success = false;
			});

	},
});

// Exports
export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;
