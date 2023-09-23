"use client";

import { useGetPostedJobsQuery } from "@/redux/features/job/jobApi";
import { RootState } from "@/redux/store";
import React from "react";
import Loading from "./Loading";
import JobCard from "./JobCard";
import { useSelector } from 'react-redux';
import { JobDataTypes } from "@/interfaceTypes/interfaceTypes";

const PostedJobs = () => {

  const reduxStore = useSelector((state: RootState) => state);
  const { data, isLoading } = useGetPostedJobsQuery(reduxStore.auth.user?.email || "");
  const JobDatas = data?.data ? [...data?.data].reverse() : [];

  if (isLoading) {
    return <Loading />;
  }
  else {
    return <div>
      <div>
        <h1 className='font-bold text-4xl pb-5 text-center dark:text-slate-300'>Posted jobs</h1>
      </div>
      <div
        className='grid gap-4'
      >
        {
          data?.data?.length ?
            JobDatas?.map((job: JobDataTypes, index: React.Key) => (
              <JobCard key={index} jobData={job} />
            ))
            :
            <div>
              <h1> You have not Posted any job yet. </h1>
            </div>
        }
      </div>
    </div>
  };
};

export default PostedJobs;