import { JobApplyDataTypes, JobDataTypes, GetJobsResTypes, JobByIdResTypes, QuestionDataTypes, AnsDataTypes, JobIsOpenDataTypes, serarchDataTypes } from "@/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation<void, JobDataTypes>({
            query: (data) => ({
                method: 'POST',
                url: "/job",
                credentials: 'include', // *** Include cookies with the request ***
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
                credentials: 'include',
            }),
            providesTags: ["JobAll"],
        }),
        getSearchJobs: builder.mutation<GetJobsResTypes, serarchDataTypes>({
            query: (searchData) => ({
                method: 'POST',
                url: "/job/search",
                credentials: 'include',
                body: searchData
            }),
            // providesTags: ["JobAll"],
        }),
        jobById: builder.query<JobByIdResTypes, string>({
            query: (id) => ({
                url: `/job/${id}`,
                credentials: 'include',
            }),
            providesTags: ["JobById"]
        }),
        jobApply: builder.mutation<void, JobApplyDataTypes>({
            query: (jobApplyData) => ({
                method: "PATCH",
                url: "/job/applied-job",
                credentials: 'include',
                body: jobApplyData,
            }),
            invalidatesTags: ["JobById", "AppliedJobs"],
        }),
        jobIsOpen: builder.mutation<void, JobIsOpenDataTypes>({
            query: (jobIsOpenData) => ({
                method: "PATCH",
                credentials: 'include',
                url: "/job/isopen-job",
                body: jobIsOpenData,
            }),
            invalidatesTags: ["JobById", "AppliedJobs"],
        }),
        getAppliedJobs: builder.query<GetJobsResTypes, string>({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
                credentials: 'include',
            }),
            providesTags: ["AppliedJobs"],
        }),
        getPostedJobs: builder.query<GetJobsResTypes, string>({
            query: (email) => ({
                url: `/posted-jobs/${email}`,
                credentials: 'include',
            }),
            providesTags: ["PostedJobs"],
        }),
        jobQuestion: builder.mutation<void, QuestionDataTypes>({
            query: (questionData) => ({
                method: "PATCH",
                url: "/job/query",
                credentials: 'include',
                body: questionData,
            }),
            invalidatesTags: ["JobById"],
        }),
        jobAns: builder.mutation<void, AnsDataTypes>({
            query: (questionData) => ({
                method: "PATCH",
                url: "/job/riplay",
                credentials: 'include',
                body: questionData,
            }),
            invalidatesTags: ["JobById"],
        }),
    })
});

export const { usePostJobMutation, useGetJobsQuery, useGetSearchJobsMutation, useJobByIdQuery, useJobApplyMutation, useJobIsOpenMutation, useGetAppliedJobsQuery, useGetPostedJobsQuery, useJobQuestionMutation, useJobAnsMutation } = jobApi;