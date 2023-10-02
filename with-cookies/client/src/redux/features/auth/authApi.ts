import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";
import { getMe } from "./authSlice";

interface regResponseTypes {
    success: boolean;
}

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<regResponseTypes, RegisterTypes>({
            query: (data) => ({
                method: "PUT",
                url: "/user/registration",
                credentials: 'include',  // ***SET THE COOKIE ***
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    if (res.data.success) {
                        dispatch(getMe());
                    }
                } catch (error) {
                }
            },
        }),
    }),
});

export const { useRegisterMutation } = authApi;