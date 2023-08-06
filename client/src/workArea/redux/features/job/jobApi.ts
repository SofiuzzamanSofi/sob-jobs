import { JobDataTypes, getJobsResTypes, jobByIdResTypes } from "@/workArea/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation<void, JobDataTypes>({
            query: (data) => ({
                method: 'POST',
                url: "/routes/job",
                body: data,
            }),
            invalidatesTags: ["Jobs"],
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    console.log("onQueryStarted queryFulfilled.")
                } catch (error) {
                    console.log("error on query onQueryStarted postjob: ", error);
                }
            }
        }),
        getJobs: builder.query<getJobsResTypes, void>({
            query: () => ({
                url: "/routes/job",
            }),
            providesTags: ["Jobs"],
        }),
        jobById: builder.query<jobByIdResTypes, string>({
            query: (id) => ({
                url: `/routes/job/${id}`,
            }),
        }),
    })
});

export const { usePostJobMutation, useGetJobsQuery, useJobByIdQuery } = jobApi;