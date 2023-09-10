import { auth } from "@/firebase/firebase.config";
import { AuthTypes, CreateUserDataTypes } from "@/interfaceTypes/interfaceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const initialState: AuthTypes = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: "",
    user: { email: "", role: "", },
};

// signup on firebase and save data on db
export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (
        data: CreateUserDataTypes,
        thunkApi
    ) => {
        const responseData = await createUserWithEmailAndPassword(auth, data.email, data.password);
        // console.log('responseData?.user?.email:', responseData)
        if (responseData?.user?.email) {
            const resDataFromDb = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER}/user/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: responseData?.user?.email }),
                    credentials: "include"
                }
            );
            const userData = await resDataFromDb.json();
            return userData?.data
        };
    },
);

// signin on firebase and get data from db
export const signInUser = createAsyncThunk(
    "auth/signInUser",
    async (
        data: CreateUserDataTypes,
        thunkApi
    ) => {

        const responseData = await signInWithEmailAndPassword(auth, data.email, data.password);
        // console.log("hit- signInUser:", responseData.user.email);
        if (responseData?.user?.email) {
            const resDataFromDb = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER}/user/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: responseData?.user?.email }),
                    credentials: "include"
                }
            );
            const userData = await resDataFromDb.json();
            return userData?.data
        };
    },
);

// signup or signin on firebase and set or get data from db
export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async () => {
        const provider = new GoogleAuthProvider();
        const responseData = await signInWithPopup(auth, provider);
        // console.log("hit- googleLogin:", responseData.user.email);
        if (responseData?.user?.email) {
            const resDataFromDb = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER}/user/signin-social-media`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: responseData?.user?.email }),
                    credentials: "include"
                }
            );
            const userData = await resDataFromDb.json();
            return userData?.data
        };
    },
);

export const getMe = createAsyncThunk(
    "auth/getMe",
    async (email: string) => {
        const resData = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/user/${email}`,
            { credentials: "include" }
        );
        const data = await resData.json();
        return data.data;
    }
);

// logOut from firebase and remove cookei and clear redux state
export const logOutUser = createAsyncThunk(
    "auth/logOutUser",
    async () => {
        try {
            //firebase signOut Function
            const signOutRes = await signOut(auth);
            // console.log('signOutRes:', signOutRes); // => signOutRes: undefined
            // clear cookie 
            const resData = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER}/user/signout`,
                { credentials: "include", }
            );

            if (resData?.ok) {
                // clear user from redux state
                // const data = await resData.json();
                // return data.data;
                // signOutReducer();
                return;
            }
        } catch (error) {
            // console.log('error from authApi logout functon:',error);
        };
    },
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
                state.user = payload;
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
                state.user = payload;
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
                state.user = payload;
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message || "User Authentication Failed";
            })
            .addCase(getMe.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user = payload;
                state.email = payload.email;
                state.role = payload?.role || "";
            })
            .addCase(logOutUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message || "User Log OUT Failed";
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = "";
                state.role = "";
                state.user = {};
            })
    },
    reducers: {
        signOutReducer: (state) => {
            state.email = "";
            state.role = "";
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