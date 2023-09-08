import { AllMessageObjectResponseType, MessageObjectResponseType } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessageById: builder.query<AllMessageObjectResponseType, string | undefined>({
            query: (userId) => ({
                url: `/message/${userId}`,
            }),
        }),
        getMessageById: builder.query<MessageObjectResponseType, string>({
            query: (id) => ({
                url: `/message/details/${id}`,
            }),
        }),
        postMessageById: builder.mutation({
            query: (messageData) => ({
                url: "/message/post-message",
                method: "POST",
                body: messageData,
            }),
        }),
    }),
});

export const { useGetAllMessageByIdQuery, useGetMessageByIdQuery, usePostMessageByIdMutation } = messageApi;