import { auth } from "@/firebase/firebase.config";
import { AuthTypes, CreateUserDataTypes } from "@/interfaceTypes/interfaceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

//
const initialState: AuthTypes = {
    state: false,
    isLoading: true,
    isError: false,
    error: "",
    user: { email: "", role: "", },
};

//SIGN-UP
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
                }
            );
            const userData = await resDataFromDb.json();
            return userData?.data
        };
    },
);

// SIGN-IN 
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
                }
            );
            const userData = await resDataFromDb.json();
            return userData?.data
        };
    },
);

// SIGN-IN-UP-SOCIAL 
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
                }
            );
            const userData = await resDataFromDb.json();
            return userData?.data
        };
    },
);

//GET-ME with cookes
export const getMe = createAsyncThunk(
    "auth/getMe",
    async (email?: string) => {
        // const getMeFunction = async () => {
        console.log('get me:.', email);
        const resDataFromDb = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/user/me`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );
        const userData = await resDataFromDb.json();
        // console.log('userData-from-get-Me:', userData);
        return userData?.data
        // };
        // return  getMeFunction();        
    }
);

// logOut from firebase and remove cookei and clear redux state
export const signOutUser = createAsyncThunk(
    "auth/signOutUser",
    async () => {
        // try {
        //firebase signOut Function
        const signOutRes = await signOut(auth);
        // console.log('signOutRes:', signOutRes); // => signOutRes: undefined
        // clear cookie 
        const resData = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/user/signout`,
        );

        if (resData?.ok) {
            // clear user from redux state
            // const data = await resData.json();
            // return data.data;
            // signOutReducer();
            return;
        }
        // } catch (error) {
        //     // console.log('error from authApi logout functon:',error);
        // };
    },
);

//
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.state = true;
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
                state.state = true;
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
                state.state = true;
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
                state.isError = false;
                state.error = "";
                // state.user = {};
            })
            .addCase(getMe.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user = payload;
            })
            .addCase(signOutUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message || "User Log OUT Failed";
            })
            .addCase(signOutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user = {};
            })
    },
    reducers: {
        // signOutReducer: (state) => {
        //     state.email = "";
        //     state.role = "";
        //     state.user = {};
        // },
        // setUser: (state, { payload }) => {
        //     state.email = payload;
        //     state.isLoading = false;
        // },
        // toggleLoading: (state) => {
        //     state.isLoading = false;
        //     state.isError = false;
        //     state.error = "";
        // },
    },
});

console.log('isLoading:', initialState.isLoading);

// export const { signOutReducer, setUser, toggleLoading } = authSlice.actions;
export const { } = authSlice.actions;

export default authSlice.reducer;