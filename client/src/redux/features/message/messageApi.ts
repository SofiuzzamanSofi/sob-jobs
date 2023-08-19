import apiSlice from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessageById: builder.query({
            query: (data) => ({
                url: `/routes/message/${data}`,
            }),
        }),
        getMessageById: builder.query({
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