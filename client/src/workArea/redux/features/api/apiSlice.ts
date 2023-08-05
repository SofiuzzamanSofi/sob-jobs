import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER,
    }),
    tagTypes: [""],
    endpoints: (builder) => ({}),
});

export default apiSlice;