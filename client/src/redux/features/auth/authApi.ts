import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";
import { getMe } from "./authSlice";
import { cookies } from "next/dist/client/components/headers";
import Cookies from 'js-cookie';

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<void, RegisterTypes>({
            query: (data) => ({
                method: "POST",
                url: "/user/signup",
                credentials: 'include',  // ***SET THE COOKIE ***
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    // const res = await queryFulfilled;
                    dispatch(getMe(data?.email || ""));

                    // (res.meta?.response?.headers.getSetCookie.name)
                    // Cookies.set(res.meta?.response?.headers.getSetCookie.name || "", res.meta?.response?.headers.getSetCookie. || "");
                    // console.log('res.meta?.response?.headers:', res.meta?.response?.headers);
                } catch (error) {
                    console.log("error on query onQueryStarted user: ", error);
                }
            },
        }),
        // editRegister 
        // others endpoints
    }),
});

export const { useRegisterMutation } = authApi;