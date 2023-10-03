import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";
import { getMe } from "./authSlice";
// import { cookies } from "next/dist/client/components/headers";
// import Cookies from 'js-cookie';

interface regResponseTypes {
    success: boolean;
}

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<regResponseTypes, RegisterTypes>({
            query: (data) => ({
                method: "PUT",
                url: "/user/registration",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    if (res.data.success) {
                        dispatch(getMe(data?.email || ""));
                    }
                } catch (error) {
                    // console.log("error on query onQueryStarted user: ", error);
                }
            },
        }),
        // editRegister 
        // others endpoints
    }),
});

export const { useRegisterMutation } = authApi;