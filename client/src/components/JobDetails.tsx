"use client";

import React, { useEffect } from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight, BsPeople } from "react-icons/bs";
import { JobDataTypes } from "../interfaceTypes/interfaceTypes";
import Image from "next/image";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useJobApplyMutation, useJobQuestionMutation, useJobAnsMutation } from "../redux/features/job/jobApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";

interface JobDataProps {
  jobData: JobDataTypes
}

const JobDetails: React.FC<JobDataProps> = ({ jobData }) => {

  const router = useRouter();
  const reduxStore = useSelector((state: RootState) => state);
  const [jobApply, { isLoading: applyLoading, isError: applyError, isSuccess: applySuccess }] = useJobApplyMutation();
  const { register, handleSubmit, reset } = useForm<{ question: string }>();
  const [jobQuestion, { isLoading: questionLoading, isError: questionError, isSuccess: questionSuccess }] = useJobQuestionMutation();
  const [jobAns, { isLoading: ansLoading, isError: ansError, isSuccess: ansSuccess }] = useJobAnsMutation();
  const {
    email,
    position,
    companyName,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    location,
    noOpening,
    isOpen,
    overview,
    skills,
    requirements,
    responsibilities,
    _id,
    applicants,
    questionAns
  } = jobData || {};

  const isAppliedAlready = applicants?.find(applicant => applicant?.userEmail === reduxStore?.auth?.user?.email);

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

  const submitQuestion = (data: { question: string }) => {
    const questionData = {
      jobId: _id,
      userId: reduxStore.auth.user?._id,
      userEmail: reduxStore.auth.user?.email,
      ...data,
    };
    // console.log(questionData);
    jobQuestion(questionData);
    reset();
  };

  const submitAns = (e: React.FormEvent<HTMLFormElement>, questionId: string) => {
    e.preventDefault();
    const ansData = {
      jobId: _id,
      questionId,
      userEmail: reduxStore.auth.user?.email,
      riplay: e.currentTarget.ans.value,
    };
    // console.log("ansData", ansData);
    jobAns(ansData);
    (e.target as HTMLFormElement).reset();
  };

  useEffect(() => {
    if (applyLoading) {
      toast.loading("Please wait...", { id: "Apply-Job" });
    };
    if (applySuccess) {
      toast.success("Apply on this job Success.", { id: "Apply-Job" });
    };
    if (applyError) {
      toast.error("Error ...", { id: "Apply-Job" })
    };
  }, [applyLoading, applySuccess, applyError]);

  // console.log("jobData", jobData);

  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <Image className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-primary text-md font-medium'>
              Job Status: <span className="font-bold text-lg">{isOpen ? "Open" : "Closed"}</span>
            </h1>
            <button
              className={`border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white  hover:bg-primary ${isAppliedAlready ? "" : "hover:px-4"} transition-all`}
              onClick={handleApply}
              disabled={isAppliedAlready ? true : false}
            >
              {isAppliedAlready ? "Already Applied" : "Apply"}
            </button>
          </div>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-primary text-md font-medium'>
              Number of openings: {noOpening}
            </h1>
            <div className='text-primary text-md font-medium flex items-center gap-2'>
              <BsPeople /> {applicants?.length} applicants
            </div>
          </div>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
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
            <div className='text-primary grid gap-3'>
              {
                questionAns &&
                questionAns?.map((question, index) => (
                  <div key={index}>
                    <small>{question?.userEmail}</small>
                    <p className='text-lg font-medium'>{question?.question?.questionString}</p>
                    {
                      question?.ans &&
                      question?.ans?.map((item, index) => (
                        <p key={index} className='flex items-center gap-2 relative left-5'>
                          <BsArrowReturnRight /> {item?.ansString}
                        </p>
                      ))
                    }
                    {
                      reduxStore.auth.user?.role === 'Employer' &&
                      reduxStore?.auth?.user?.email === email &&
                      <form
                        onSubmit={(e) => submitAns(e, question?.questionId)}
                      >
                        <div className='flex gap-3 my-5'>
                          <input
                            placeholder='Reply'
                            type='text'
                            name="ans"
                            className="w-full p-2 border-b-2 focus:outline-none focus:border-b-black"
                          />
                          <button
                            className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                            type='submit'
                          >
                            <BsArrowRightShort size={30} />
                          </button>
                        </div>
                      </form>
                    }
                  </div>
                ))
              }
            </div>

            {
              reduxStore.auth.user?.role === 'Candidate' &&
              <form
                onSubmit={handleSubmit(submitQuestion)}
              >
                <div className='flex gap-3 my-5'>
                  <input
                    placeholder='Ask a question...'
                    type='text'
                    id='question'
                    className='w-full border rounded-md p-2'
                    {...register("question")}
                  />
                  <button
                    className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                    type="submit"
                  >
                    <BsArrowRightShort size={30} />
                  </button>
                </div>
              </form>
            }
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
            <h1 className='font-semibold text-lg'>
              {email ? email : "company@mail.com"}
            </h1>
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
