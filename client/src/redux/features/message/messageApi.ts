import { AllMessageObjectResponseType, MessageObjectResponseType } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessageById: builder.query<AllMessageObjectResponseType, string | undefined>({
            query: (userId) => ({
                url: `/routes/message/${userId}`,
            }),
        }),
        getMessageById: builder.query<MessageObjectResponseType, string>({
            query: (id) => ({
                url: `/routes/message/details/${id}`,
            }),
        }),
        postMessageById: builder.mutation({
            query: (messageData) => ({
                url: "/routes/message/post-message",
                method: "POST",
                body: messageData,
            }),
        }),
    }),
});

export const { useGetAllMessageByIdQuery, useGetMessageByIdQuery, usePostMessageByIdMutation } = messageApi;