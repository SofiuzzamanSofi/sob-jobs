"use client";

import React, { useEffect } from "react";
import { useFieldArray, useForm, SubmitHandler } from "react-hook-form";
import { FiTrash, FiPlusCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { usePostJobMutation } from "@/redux/features/job/jobApi";
import { JobDataTypes } from "@/interfaceTypes/interfaceTypes";


const AddJob = () => {

  const router = useRouter();
  const reduxStore = useSelector((state: RootState) => state);
  const [postJob, { isLoading, isSuccess, isError }] = usePostJobMutation();
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

  const onSubmit: SubmitHandler<JobDataTypes> = (data) => {

    if (reduxStore.auth.user?.role !== "Employer") {
      toast.error("Only Employer can post the jobs");
      return;
    };
    // console.log("data on submit handler addJObs:", data);
    postJob({ ...data, email: reduxStore.auth.user?.email, isOpen: true });
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...", { id: "post-job" });
    }
    else if (isSuccess) {
      toast.success("Post Job Success", { id: "post-job" });
      router.push("/dashboard/posted-jobs");
    }
  }, [isLoading, isSuccess, router]);

  if (reduxStore.auth.user?.role !== "Employer") {
    router.push("/");
    return;
  };

  const searchBarInputClass = "p-2 w-full border border-gray-200 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 text-slate-700 dark:text-slate-400"

  const addButtonClass = "shrink-0 h-10 w-10 bg-primary/10 border border-primary dark:border-darkPrimary hover:bg-primary dark:hover:bg-darkPrimary hover:text-white rounded-full grid place-items-center text-primary dark:text-darkPrimary transition-all duration-500 hover:scale-100 scale-90"
  const removeButtonClass = "shrink-0 h-10 w-10 bg-primary/10 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white rounded-full grid place-items-center transition-all duration-500 hover:scale-100 scale-90"

  return (
    <div className='flex justify-center items-center overflow-auto py-5'>
      <form
        className='flex flex-wrap gap-3 max-w-3xl justify-between md:border border-gray-200 dark:border-gray-700 rounded-md md:p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <h1 className='font-bold text-4xl pb-5 text-center dark:text-slate-300'>
            Add A New Position
          </h1>
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='position'>
            Position
          </label>
          <input className={searchBarInputClass} type='text' id='position' {...register("position")} required />
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='companyName'>
            Company Name
          </label>
          <input
            disabled
            className={`${searchBarInputClass} cursor-not-allowed`}
            type='text'
            id='companyName'
            {...register("companyName", {
              value: reduxStore?.auth?.user?.companyName || ""
            })}
          // defaultValue={ }
          />
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='experience'>
            Experience
          </label>
          <input className={searchBarInputClass} type='text' id='experience' {...register("experience")} required />
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='workLevel'>
            Work Level
          </label>
          <input className={searchBarInputClass} type='text' id='workLevel' {...register("workLevel")} required />
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='employmentType'>
            Employment Type
          </label>
          <input
            className={searchBarInputClass}
            type='text'
            id='employmentType'
            {...register("employmentType")}
            required
          />
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='salaryRange'>
            Salary Range
          </label>
          <input className={searchBarInputClass} type='text' id='salaryRange' {...register("salaryRange")} required />
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='location'>
            Location
          </label>
          <input className={searchBarInputClass} type='text' id='location' {...register("location")} required />
        </div>
        <div className='flex flex-col w-full lg:max-w-xs'>
          <label className='pt-2 dark:text-slate-300' htmlFor='location'>
            Number of Openings
          </label>
          <input className={searchBarInputClass} type='number' id='location' {...register("noOpening")} required />
        </div>

        <hr className='w-full mt-2 mx-1 bg-black' />

        <div className='flex flex-col w-full'>
          <label className='pt-2 dark:text-slate-300' htmlFor='overview'>
            Overview
          </label>
          <textarea className={`${searchBarInputClass}`} rows={8} {...register("overview")} id='overview' required />
        </div>
        <div className='flex flex-col w-full'>
          <label className='pt-2 dark:text-slate-300' >Skills:</label>
          <div>
            <div>
              {skillFields.map((item, index) => {
                return (
                  <div key={index} className='flex items-center gap-3 mb-5'>
                    <input
                      className={searchBarInputClass}
                      type='text'
                      {...register(`skills[${index}]`)}
                    />
                    <button
                      type='button'
                      onClick={() => skillRemove(index)}
                      className={removeButtonClass}
                    >
                      <FiTrash
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
                className={addButtonClass}
              >
                <FiPlusCircle
                  size='20'
                />
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label className='pt-2 dark:text-slate-300' >Responsibilities:</label>
          <div>
            <div>
              {resFields.map((item, index) => {
                return (
                  <div key={index} className=' mb-5 flex items-center gap-3'>
                    <input
                      className={searchBarInputClass}
                      type='text'
                      {...register(`responsibilities[${index}]`)}
                    />
                    <button
                      type='button'
                      onClick={() => resRemove(index)}
                      className={removeButtonClass}
                    >
                      <FiTrash
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
                className={addButtonClass}
              >
                <FiPlusCircle
                  size='20'
                />
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label className='pt-2 dark:text-slate-300' >Requirements:</label>
          <div>
            <div>
              {reqFields.map((item, index) => {
                return (
                  <div key={index} className=' mb-5 flex items-center gap-3'>
                    <input
                      className={searchBarInputClass}
                      type='text'
                      {...register(`requirements[${index}]`)}
                    />
                    <button
                      type='button'
                      onClick={() => reqRemove(index)}
                      className={removeButtonClass}
                    >
                      <FiTrash
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
                className={addButtonClass}
              >
                <FiPlusCircle
                  size='20'
                />
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-end items-center w-full mt-3'>
          <input
            type="submit"
            className={"cursor-pointer py-3 px-4 rounded-md border border-primary dark:border-darkPrimary hover:bg-primary dark:hover:bg-darkPrimary text-primary  dark:text-darkPrimary  hover:text-white font-bold"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddJob;