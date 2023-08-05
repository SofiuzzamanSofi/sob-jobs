"use client";

import { RegisterTypes } from "@/workArea/interfaceTypes/interfaceTypes";
import { useRegisterMutation } from "@/workArea/redux/features/auth/authApi";
import { RootState } from "@/workArea/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const CandidateRegistration = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const { handleSubmit, register, control } = useForm();
  const term = useWatch({ control, name: "term" });
  // console.log(term);
  const router = useRouter();
  const reduxStore = useSelector((state: RootState) => state);
  const [postUser, { isLoading, isError, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const onSubmit = (data: RegisterTypes) => {
    postUser({ ...data, role: "Candidate", email: reduxStore?.auth?.email || "", });
    console.log("hello clicked", data);
  };

  useEffect(() => {
    if (reduxStore?.auth?.role) {
      return router.push("/dashboard");
    };
    if (reduxStore?.auth?.isLoading) {
      toast.loading("Please wait...", { id: "post-user-on-db" });
    };
    if (!reduxStore?.auth?.isLoading && !reduxStore?.auth?.email) {
      toast.success("Register Success. on DB 41", { id: "post-user-on-db" });
      return router.back();
      // router.push("/");
    };
    if (reduxStore?.auth?.isError && reduxStore?.auth?.error) {
      toast.error("Error ", { id: "post-user-on-db" })
    };
  }, [isLoading, isError, isSuccess, reduxStore?.auth?.role]);

  return (
    <div className='pt-14'>
      <div
        onClick={() => router.back()}
        className='cursor-pointer w-fit mt-5 flex items-center'
      >
        <FaChevronLeft />
        <p>back</p>
      </div>
      <div className='flex justify-center items-center overflow-auto p-10'>
        <form
          className='bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='w-full text-2xl text-primary mb-5'>Candidate</h1>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='firstName'>
              First Name
            </label>
            <input className="border p-2" type='text' id='firstName' {...register("firstName")} />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='lastName'>
              Last Name
            </label>
            <input className="border p-2" type='text' id='lastName' {...register("lastName")} />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='email'>
              Email
            </label>
            <input
              className="border p-2"
              type="email"
              id="email"
              disabled
              {...register("email")}
              defaultValue={reduxStore?.auth?.email || ""}
            />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <h1 className='mb-3'>Gender</h1>
            <div className='flex gap-3'>
              <div>
                <input
                  type='radio'
                  id='male'
                  {...register("gender")}
                  value='male'
                />
                <label className='ml-2 text-lg' htmlFor='male'>
                  Male
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='female'
                  {...register("gender")}
                  value='female'
                />
                <label className='ml-2 text-lg' htmlFor='female'>
                  Female
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='other'
                  {...register("gender")}
                  value='other'
                />
                <label className='ml-2 text-lg' htmlFor='other'>
                  Other
                </label>
              </div>
            </div>
          </div>
          <hr className='w-full mt-2 bg-black' />
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-3' htmlFor='country'>
              Country
            </label>
            <select className="border p-2" {...register("country")} id='country'>
              {countries
                .sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
                .map(({ name }) => (
                  <option key={name.common} value={name.common}>{name.common}</option>
                ))}
            </select>
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='address'>
              Street Address
            </label>
            <input className="border p-2" type='text' {...register("address")} id='address' />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='city'>
              City
            </label>
            <input className="border p-2" type='text' {...register("city")} id='city' />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='postcode'>
              Postal Code
            </label>
            <input className="border p-2" type='text' {...register("postcode")} id='postcode' />
          </div>

          <div className='flex justify-between items-center w-full mt-3'>
            <div className='flex  w-full max-w-xs'>
              <input
                className='mr-3'
                type='checkbox'
                {...register("term")}
                id='terms'
              />
              <label htmlFor='terms'>I agree to terms and conditions</label>
            </div>
            <button disabled={!term} className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegistration;
