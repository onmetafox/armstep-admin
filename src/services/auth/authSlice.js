import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { signIn, signUp } from "./authApi";
import armstepStorage from "../../libs/storage";

const initialState = {
  data: null,
  msg: null,
  status: ""
};

export const signInUserAsync = createAsyncThunk('auth/signin', signIn);
export const signUpUserAsync = createAsyncThunk('auth/signup', signUp);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.data = action.payload;
            tymtStorage.set("auth", JSON.stringify(action.payload));
        }
    },
    extraReducers : builder => {
        builder
            .addCase(signInUserAsync.pending, state => {
                state.status = "pending";
            })
            .addCase(signInUserAsync.fulfilled, (state, action) =>{
                state.status = action.payload.status;
                state.data = action.payload.data;
                state.msg = "Login Successfully";
                armstepStorage.set('token', action.payload.data.token);
            })
    },
});

export const getAuth = (state) => state.auth.data;
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
