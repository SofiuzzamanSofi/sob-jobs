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

  if (isLoading) {
    return <Loading />;
  }
  else {
    return (
      <div>
        <h1 className='text-xl py-5 text-center'>Posted jobs</h1>
        <div className='grid grid-cols-2 gap-5 pb-5'>
          {
            data?.data?.length ?
              data?.data?.map((job: JobDataTypes, index: React.Key | null | undefined) => (
                <JobCard key={index} jobData={job} />
              ))
              :
              <div>
                <h1> You have not Posted any job yet. </h1>
              </div>
          }
        </div>
      </div>
    );
  };
};

export default PostedJobs;
