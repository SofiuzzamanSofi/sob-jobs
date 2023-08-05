import { JobDataResTypes, JobDataTypes } from "@/workArea/interfaceTypes/interfaceTypes";
import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation<void, JobDataTypes>({
            query: (data) => ({
                method: 'POST',
                url: "/routes/job",
                body: data,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    console.log("onQueryStarted queryFulfilled.")
                } catch (error) {
                    console.log("error on query onQueryStarted postjob: ", error);
                }
            }
        }),
        getJobs: builder.query<JobDataResTypes, void>({
            query: () => ({
                url: "/routes/job",
            })
        }),
        jobById: builder.mutation({
            query: (id: number) => ({
                method: "PATCH",
                url: `/routes/:${id}`,
                body: "",
            })
        }),
    })
});

export const { usePostJobMutation, useGetJobsQuery, useJobByIdMutation } = jobApi;