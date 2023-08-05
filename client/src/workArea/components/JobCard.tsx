"use client";

import React from "react";
import { JobDataTypes } from './../interfaceTypes/interfaceTypes';
import Link from "next/link";


interface JobCardProps {
  jobData: JobDataTypes
}

const JobCard: React.FC<JobCardProps> = ({ jobData }) => {

  const { _id, position, companyName, location, employmentType } = jobData || {};

  return (
    <div
      key={_id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{position}</p>
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>
        <Link href={`dashboard/job-details/${_id}`} className="border px-4 py-1 rounded-md">
          <button className='btn'>
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;