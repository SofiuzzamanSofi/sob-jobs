"use client";

import { useGetAppliedJobsQuery } from "@/workArea/redux/features/job/jobApi";
import { RootState } from "@/workArea/redux/store";
import React from "react";
import Loading from "../Loading";
import JobCard from "../JobCard";
import { useSelector } from 'react-redux';

const AppliedJobs = () => {

  const reduxStore = useSelector((state: RootState) => state);

  const { data, isLoading } = useGetAppliedJobsQuery(reduxStore.auth.user?.email || "");

  if (isLoading) {
    return <Loading />;
  }
  else {
    return (
      <div>
        <h1 className='text-xl py-5 text-center'>Applied jobs</h1>
        <div className='grid grid-cols-2 gap-5 pb-5'>
          {
            data?.data?.length &&
            data?.data?.map((job, index) => (
              <JobCard key={index} jobData={job} />
            ))
          }
        </div>
      </div>
    );
  };
};

export default AppliedJobs;
