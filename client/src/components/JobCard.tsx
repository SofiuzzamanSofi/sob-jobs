"use client";

import React from "react";
import { JobDataTypes } from './../interfaceTypes/interfaceTypes';
import Link from "next/link";


interface JobCardProps {
  jobData: JobDataTypes
};

const JobCard: React.FC<JobCardProps> = ({ jobData }) => {

  const { _id, position, companyName, location, employmentType } = jobData || {};

  return (
    <Link
      href={`job-details/${_id}`}
      key={_id}
      className='border border-gray-300 dark:border-gray-700 shadow-xl p-5 rounded-md'
    >
      <div className='flex justify-between'>
        <div>
          <p className='text-xl'>{position}</p>
          <small >
            {" "}
            <span className='font-semibold cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        <p className="uppercase">{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>
        <button className="border px-4 py-1 rounded-md">
          <button className='btn'>
            Details
          </button>
        </button>
      </div>
    </Link>
  );
};

export default JobCard;