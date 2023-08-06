"use client";

import React, { useEffect } from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { JobDataTypes } from "../interfaceTypes/interfaceTypes";
import Image from "next/image";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useJobApplyMutation } from "../redux/features/job/jobApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"

interface JobDataProps {
  jobData: JobDataTypes
}

const JobDetails: React.FC<JobDataProps> = ({ jobData }) => {

  const router = useRouter();
  const reduxStore = useSelector((state: RootState) => state);
  const [jobApply, { isLoading, isError, isSuccess }] = useJobApplyMutation();
  const {
    position,
    companyName,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    location,
    overview,
    skills,
    requirements,
    responsibilities,
    queries,
    _id,
    applicants
  } = jobData || {};

  console.log(applicants);
  const isAppliedAlready = applicants?.find(applicant => applicant?.userEmail === reduxStore?.auth?.user?.email);
  console.log(isAppliedAlready)

  const handleApply = () => {
    if (reduxStore?.auth?.user?.role === "Employer") {
      return toast.error("You are a Employee, \n So how a employer can be applied.")
    }
    else if (reduxStore?.auth?.user?.role === "Candidate") {
      const permission = window.confirm("do you want to apply");
      if (permission) {
        const jobApplyData = {
          jobId: _id,
          userId: reduxStore?.auth?.user?._id,
          userEmail: reduxStore?.auth?.user?.email,
        }
        jobApply(jobApplyData);
      };
    } else {
      router.push("/dashboard/register")
    };
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...", { id: "Apply-Job" });
    };
    if (isSuccess) {
      toast.success("Apply on this job Success.", { id: "Apply-Job" });
    };
    if (isError) {
      toast.error("Error ...", { id: "Apply-Job" })
    };
  }, [isLoading, isSuccess, isError]);

  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <Image className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
            <button
              className={`border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white  hover:bg-primary ${isAppliedAlready ? "" : "hover:px-4"} transition-all`}
              onClick={handleApply}
              disabled={isAppliedAlready ? true : false}
            >
              {isAppliedAlready ? "Already Applied" : "Apply"}
            </button>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {
                skills &&
                skills.map((skill, index) => (
                  <li key={index} className='flex items-center'>
                    <BsArrowRightShort /> <span>{skill}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {
                requirements &&
                requirements.map((requirement, index) => (
                  <li key={index} className='flex items-center'>
                    <BsArrowRightShort /> <span>{requirement}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {
                responsibilities &&
                responsibilities.map((responsibiliti, index) => (
                  <li key={index} className='flex items-center'>
                    <BsArrowRightShort /> <span>{responsibiliti}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>
            <div className='text-primary my-2'>
              {
                queries &&
                queries.map(({ question, email, reply, id }, index) => (
                  <div key={index}>
                    <small>{email}</small>
                    <p className='text-lg font-medium'>{question}</p>
                    {
                      reply &&
                      reply?.map((item, index) => (
                        <p key={index} className='flex items-center gap-2 relative left-5'>
                          <BsArrowReturnRight /> {item}
                        </p>
                      ))
                    }

                    <div className='flex gap-3 my-5'>
                      <input placeholder='Reply' type='text' className='w-full' />
                      <button
                        className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                        type='button'
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className='flex gap-3 my-5'>
              <input
                placeholder='Ask a question...'
                type='text'
                className='w-full border rounded-md p-2'
              />
              <button
                className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                type='button'
              >
                <BsArrowRightShort size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
