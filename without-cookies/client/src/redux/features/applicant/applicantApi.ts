import { applicantResponseTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const applicantApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getApplicant: builder.query<applicantResponseTypes, string>({
            query: (email) => ({
                url: `/user/applicant/${email}`,
            }),
        }),
    }),
});

export const { useGetApplicantQuery } = applicantApi;