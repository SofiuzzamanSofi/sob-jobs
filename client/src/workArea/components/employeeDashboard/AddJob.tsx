"use client";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from '@/workArea/redux/store';
import { JobDataTypes } from "@/workArea/interfaceTypes/interfaceTypes";
import { usePostJobMutation } from "@/workArea/redux/features/job/jobApi";


const AddJob = () => {
  const reduxStore = useSelector((state: RootState) => state);
  const [postJob, { isLoading, isSuccess, isError }] = usePostJobMutation()
  const { handleSubmit, register, control } = useForm();
  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: resFields,
    append: resAppend,
    remove: resRemove,
  } = useFieldArray({ control, name: "responsibilities" });
  const {
    fields: reqFields,
    append: reqAppend,
    remove: reqRemove,
  } = useFieldArray({ control, name: "requirements" });

  const onSubmit = (data: JobDataTypes) => {
    console.log("data line 33:", data);
    postJob(data);
    console.log(data);
  };

  return (
    <div className='flex justify-center items-center overflow-auto p-10'>
      <form
        className='bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='w-full text-2xl text-primary mb-5'>
          Add a new position
        </h1>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2 underline' htmlFor='position'>
            Position:
          </label>
          <input className="p-2 border" type='text' id='position' {...register("position")} />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2 underline' htmlFor='companyName'>
            Company Name:
          </label>
          <input
            disabled
            className='cursor-not-allowed'
            type='text'
            id='companyName'
            {...register("companyName", {
              value: reduxStore?.auth?.user?.companyName || ""
            })}
          // defaultValue={ }
          />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2 underline' htmlFor='experience'>
            Experience:
          </label>
          <input className="p-2 border" type='text' id='experience' {...register("experience")} />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2 underline' htmlFor='workLevel'>
            Work Level:
          </label>
          <input className="p-2 border" type='text' id='workLevel' {...register("workLevel")} />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2 underline' htmlFor='employmentType'>
            Employment Type:
          </label>
          <input
            className="p-2 border"
            type='text'
            id='employmentType'
            {...register("employmentType")}
          />
        </div>
        <div className='flex flex-col w-full max-w-xs'>
          <label className='mb-2 underline' htmlFor='salaryRange'>
            Salary Range:
          </label>
          <input className="p-2 border" type='text' id='salaryRange' {...register("salaryRange")} />
        </div>
        <div className='flex flex-col w-full'>
          <label className='mb-2 underline' htmlFor='location'>
            Location:
          </label>
          <input className="p-2 border" type='text' id='location' {...register("location")} />
        </div>
        <hr className='w-full mt-2 bg-black' />
        <div className='flex flex-col w-full'>
          <label className='mb-2 underline' htmlFor='overview'>
            Overview:
          </label>
          <textarea className="p-2 border" rows={8} {...register("overview")} id='overview' />
        </div>
        <div className='flex flex-col w-full'>
          <label className='mb-2 underline'>Skills:</label>
          <div>
            <div>
              {skillFields.map((item, index) => {
                return (
                  <div key={index} className='flex items-center gap-3 mb-5'>
                    <input
                      className="p-2 border !w-full"
                      type='text'
                      {...register(`skills[${index}]`)}
                    />
                    <button
                      type='button'
                      onClick={() => skillRemove(index)}
                      className='grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500'
                    >
                      <FiTrash
                        className='text-red-500 group-hover:text-white transition-all'
                        size='20'
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type='button'
                onClick={() => skillAppend("")}
                className='btn-outline text-xs border'
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label className='mb-2 underline'>Responsibilities:</label>
          <div>
            <div>
              {resFields.map((item, index) => {
                return (
                  <div key={index} className=' mb-5 flex items-center gap-3'>
                    <input
                      className="p-2 border !w-full"
                      type='text'
                      {...register(`responsibilities[${index}]`)}
                    />
                    <button
                      type='button'
                      onClick={() => resRemove(index)}
                      className='grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500'
                    >
                      <FiTrash
                        className='text-red-500 group-hover:text-white transition-all'
                        size='20'
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type='button'
                onClick={() => resAppend("")}
                className='btn-outline text-xs border'
              >
                Add Responsibility
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label className='mb-2 underline'>Requirements:</label>
          <div>
            <div>
              {reqFields.map((item, index) => {
                return (
                  <div key={index} className=' mb-5 flex items-center gap-3'>
                    <input
                      className="p-2 border !w-full"
                      type='text'
                      {...register(`requirements[${index}]`)}
                    />
                    <button
                      type='button'
                      onClick={() => reqRemove(index)}
                      className='grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500'
                    >
                      <FiTrash
                        className='text-red-500 group-hover:text-white transition-all'
                        size='20'
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type='button'
                onClick={() => reqAppend("")}
                className='btn-outline text-xs border'
              >
                Add Requirement
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-end items-center w-full mt-3'>
          <button className='btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

// Position name
// Company name
// Experience
// Work Level
// Salary Range
// Employment Type
// Location
// Overview
// Responsibilities
// Requirements
// Skills
