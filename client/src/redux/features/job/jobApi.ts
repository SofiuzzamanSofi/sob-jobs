import { JobApplyDataTypes, JobDataTypes, GetJobsResTypes, JobByIdResTypes, QuestionDataTypes, AnsDataTypes, JobIsOpenDataTypes, serarchDataTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation<void, JobDataTypes>({
            query: (data) => ({
                method: 'POST',
                url: "/job",
                body: data,
            }),
            invalidatesTags: ["JobAll", "PostedJobs"],
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    // console.log("onQueryStarted queryFulfilled.");
                } catch (error) {
                    console.log("error on query onQueryStarted postjob: ", error);
                }
            }
        }),
        getJobs: builder.query<GetJobsResTypes, void>({
            query: () => ({
                url: "/job",
                credentials: 'include', // *** Include cookies with the request ***
            }),
            providesTags: ["JobAll"],
        }),
        getSearchJobs: builder.mutation<GetJobsResTypes, serarchDataTypes>({
            query: (searchData) => ({
                url: "/job/search",
                method: 'POST',
                body: searchData
            }),
            // providesTags: ["JobAll"],
        }),
        jobById: builder.query<JobByIdResTypes, string>({
            query: (id) => ({
                url: `/job/${id}`,
            }),
            providesTags: ["JobById"]
        }),
        jobApply: builder.mutation<void, JobApplyDataTypes>({
            query: (jobApplyData) => ({
                url: "/job/applied-job",
                method: "PATCH",
                body: jobApplyData,
            }),
            invalidatesTags: ["JobById", "AppliedJobs"],
        }),
        jobIsOpen: builder.mutation<void, JobIsOpenDataTypes>({
            query: (jobIsOpenData) => ({
                url: "/job/isopen-job",
                method: "PATCH",
                body: jobIsOpenData,
            }),
            invalidatesTags: ["JobById", "AppliedJobs"],
        }),
        getAppliedJobs: builder.query<GetJobsResTypes, string>({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
            }),
            providesTags: ["AppliedJobs"],
        }),
        getPostedJobs: builder.query<GetJobsResTypes, string>({
            query: (email) => ({
                url: `/posted-jobs/${email}`,
            }),
            providesTags: ["PostedJobs"],
        }),
        jobQuestion: builder.mutation<void, QuestionDataTypes>({
            query: (questionData) => ({
                url: "/job/query",
                method: "PATCH",
                body: questionData,
            }),
            invalidatesTags: ["JobById"],
        }),
        jobAns: builder.mutation<void, AnsDataTypes>({
            query: (questionData) => ({
                url: "/job/riplay",
                method: "PATCH",
                body: questionData,
            }),
            invalidatesTags: ["JobById"],
        }),
    })
});

export const { usePostJobMutation, useGetJobsQuery, useGetSearchJobsMutation, useJobByIdQuery, useJobApplyMutation, useJobIsOpenMutation, useGetAppliedJobsQuery, useGetPostedJobsQuery, useJobQuestionMutation, useJobAnsMutation } = jobApi;