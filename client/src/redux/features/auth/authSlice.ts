
import { auth } from "@/firebase/firebase.config";
import { AuthTypes, CreateUserDataTypes } from "@/interfaceTypes/interfaceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const initialState: AuthTypes = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: "",
    user: { email: "", role: "", },
};

export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (
        data: CreateUserDataTypes,
        thunkApi
    ) => {
        const responseData = await createUserWithEmailAndPassword(auth, data.email, data.password);
        return responseData?.user?.email;
    },
);

export const signInUser = createAsyncThunk(
    "auth/signInUser",
    async (
        data: CreateUserDataTypes,
        thunkApi
    ) => {
        const responseData = await signInWithEmailAndPassword(auth, data.email, data.password);
        return responseData?.user?.email;
    },
);

export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async () => {
        const provider = new GoogleAuthProvider();
        const responseData = await signInWithPopup(auth, provider);
        return responseData?.user?.email;
    },
);

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (email: string) => {
        const resData = await fetch(`${process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER}/routes/register/${email}`);
        const data = await resData.json();
        // console.log("data.data", data.data);
        return data.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message || "User Authentication Failed";
            })
            .addCase(signUpUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = payload;
            })
            .addCase(signInUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message || "User Authentication Failed";
            })
            .addCase(signInUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = payload;
            })
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message || "User Authentication Failed";
            })
            .addCase(googleLogin.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = payload;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message || "User Authentication Failed";
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user = payload;
                state.email = payload.email;
                state.role = payload?.role || "";
            })
    },
    reducers: {
        signOutReducer: (state) => {
            state.email = "";
            state.user = {};
        },
        setUser: (state, { payload }) => {
            state.email = payload;
            state.isLoading = false;
        },
        toggleLoading: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.error = "";
        },
    },
});

export const { signOutReducer, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;