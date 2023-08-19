import apiSlice from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessageById: builder.query({
            query: (data) => ({
                url: `/routes/message/${data}`,
            }),
        }),
        getMessageById: builder.query({
            query: (data) => ({
                url: `/routes/message/details/${data}`,
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