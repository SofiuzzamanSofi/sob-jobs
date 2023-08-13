import { JobApplyDataTypes, JobDataTypes, GetJobsResTypes, JobByIdResTypes, QuestionDataTypes, AnsDataTypes } from "@/workArea/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation<void, JobDataTypes>({
            query: (data) => ({
                method: 'POST',
                url: "/routes/job",
                body: data,
            }),
            invalidatesTags: ["JobAll", "PostedJobs"],
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    console.log("onQueryStarted queryFulfilled.")
                } catch (error) {
                    console.log("error on query onQueryStarted postjob: ", error);
                }
            }
        }),
        getJobs: builder.query<GetJobsResTypes, void>({
            query: () => ({
                url: "/routes/job",
            }),
            providesTags: ["JobAll"],
        }),
        jobById: builder.query<JobByIdResTypes, string>({
            query: (id) => ({
                url: `/routes/job/${id}`,
            }),
            providesTags: ["JobById"]
        }),
        jobApply: builder.mutation<void, JobApplyDataTypes>({
            query: (jobApplyData) => ({
                url: "/routes/job",
                method: "PATCH",
                body: jobApplyData,
            }),
            invalidatesTags: ["JobById", "AppliedJobs"],
        }),
        getAppliedJobs: builder.query<GetJobsResTypes, string>({
            query: (email) => ({
                url: `/routes/applied-jobs/${email}`,
            }),
            providesTags: ["AppliedJobs"],
        }),
        getPostedJobs: builder.query<GetJobsResTypes, string>({
            query: (email) => ({
                url: `/routes/posted-jobs/${email}`,
            }),
            providesTags: ["PostedJobs"],
        }),
        jobQuestion: builder.mutation<void, QuestionDataTypes>({
            query: (questionData) => ({
                url: "/routes/job/query",
                method: "PATCH",
                body: questionData,
            }),
            invalidatesTags: ["JobById"],
        }),
        jobAns: builder.mutation<void, AnsDataTypes>({
            query: (questionData) => ({
                url: "/routes/job/riplay",
                method: "PATCH",
                body: questionData,
            }),
            invalidatesTags: ["JobById"],
        }),
    })
});

export const { usePostJobMutation, useGetJobsQuery, useJobByIdQuery, useJobApplyMutation, useGetAppliedJobsQuery, useGetPostedJobsQuery, useJobQuestionMutation, useJobAnsMutation } = jobApi;