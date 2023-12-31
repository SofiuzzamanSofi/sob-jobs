"use client";

import React from "react";
import { JobDataTypes } from './../interfaceTypes/interfaceTypes';
import Link from "next/link";


interface JobCardProps {
  jobData: JobDataTypes
};

const JobCard: React.FC<JobCardProps> = ({ jobData }) => {

  const { _id, position, companyName, location, employmentType, isOpen } = jobData || {};

  return (
    <Link
      href={`job-details/${_id}`}
      className='border border-gray-300 dark:border-gray-700 shadow-xl p-5 rounded-md dark:hover:text-slate-300'
    >
      <div className='flex justify-between'>
        <div>
          <p className='text-xl hover:underline transition-all'>{position}</p>
          <small >
            {" "}
            <span className='font-semibold'>
              {companyName}
            </span>
          </small>
        </div>
        <p className="uppercase">{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <div>
          <p>{isOpen ? "Open" : "Closed"}</p>
          <p>{employmentType}</p>
        </div>

        <button className="border border-gray-300 dark:border-gray-700 shadow-xl py-3 px-4 rounded-md">
          Details
        </button>
      </div>
    </Link>
  );
};

export default JobCard;