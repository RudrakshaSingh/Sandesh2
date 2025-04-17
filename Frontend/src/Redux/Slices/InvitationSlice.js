import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast';

import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
  invitations: [],
  loading: false,
  error: null,
  success: false,
};
export const addContactUs = createAsyncThunk(
  "invitations/addContactUs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contact-us", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);