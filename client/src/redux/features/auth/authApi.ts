import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";
import { cookies } from "next/dist/client/components/headers";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<void, RegisterTypes>({
            query: (data) => ({
                method: "POST",
                url: "/user/signup",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    // dispatch(getUser(data?.email || ""));
                    // (res.meta?.response?.headers.getSetCookie.name)
                    console.log('res.meta?.response?.headers:', res.meta?.response?.headers);
                } catch (error) {
                    console.log("error on query onQueryStarted user: ", error);
                }
            },
        }),
        // editRegister 
        // others endpoints
    })
});

export const { useRegisterMutation } = authApi;