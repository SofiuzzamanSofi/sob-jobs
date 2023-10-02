import { AllMessageObjectResponseType, MessageObjectResponseType } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessageById: builder.query<AllMessageObjectResponseType, string | undefined>({
            query: (userId) => ({
                url: `/message/${userId}`,
                credentials: 'include', // *** Include cookies with the request ***
            }),
        }),
        getMessageById: builder.query<MessageObjectResponseType, string>({
            query: (id) => ({
                url: `/message/details/${id}`,
                credentials: 'include',
            }),
        }),
        postMessageById: builder.mutation({
            query: (messageData) => ({
                method: "POST",
                url: "/message/post-message",
                credentials: 'include',
                body: messageData,
            }),
        }),
    }),
});

export const { useGetAllMessageByIdQuery, useGetMessageByIdQuery, usePostMessageByIdMutation } = messageApi;