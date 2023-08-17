import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<void, RegisterTypes>({
            query: (data) => ({
                method: "POST",
                url: "/routes/register",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(data?.email || ""));
                } catch (error) {
                    console.log("error on query onQueryStarted register: ", error);
                }
            },
        }),
        // editRegister 
        // others endpoints
    })
});

export const { useRegisterMutation } = authApi;