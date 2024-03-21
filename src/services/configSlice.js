import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import armstepStorage from "../../libs/storage";

const initialState = {
  data: null,
  msg: null,
  status: ""
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setConfig: (state, action) => {
            state.data = action.payload;
            tymtStorage.set("config", JSON.stringify(action.payload));
        }
    },
});

export const getConfig = (state) => state.config.data;
export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
