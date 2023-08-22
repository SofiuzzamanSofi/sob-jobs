"use client";

import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const CandidateRegistration = () => {

  const [countries, setCountries] = useState<any[]>([]);
  const { handleSubmit, register, control } = useForm<RegisterTypes>();
  const term = useWatch({ control, name: "term" });
  const router = useRouter();
  const reduxStore = useSelector((state: RootState) => state);
  const [postUser, { isLoading, isError, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const onSubmit: SubmitHandler<RegisterTypes> = (data) => {
    postUser({ ...data, role: "Candidate", email: reduxStore?.auth?.email || "", country: data.country || "Bangladesh" });
    // console.log("hello clicked", data);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...", { id: "post-user-on-db" });
    };
    if (!isLoading && isSuccess) {
      toast.success("Register Success.", { id: "post-user-on-db" });
      router.push("/dashboard");
    };
    if (isError) {
      toast.error("Error ", { id: "post-user-on-db" })
    };
  }, [isLoading, isSuccess, isError, router]);

  if (reduxStore?.auth?.user?.role) {
    router.push("/dashboard");
    return null;
  };

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
            <input className="border p-2" type='text' id='firstName' {...register("firstName")} required />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='lastName'>
              Last Name
            </label>
            <input className="border p-2" type='text' id='lastName' {...register("lastName")} required />
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
                  required
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
                  required
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
                  required
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
                .map(({ name }, index) => (
                  <option
                    key={index}
                    value={name.common}
                    selected={name.common === "Bangladesh"}
                  >
                    {name.common}
                  </option>
                ))}
            </select>
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='address'>
              Street Address
            </label>
            <input className="border p-2" type='text' {...register("address")} id='address' required />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='city'>
              City
            </label>
            <input className="border p-2" type='text' {...register("city")} id='city' required />
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='postcode'>
              Postal Code
            </label>
            <input className="border p-2" type='text' {...register("postcode")} id='postcode' required />
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
            <button
              disabled={!term}
              type='submit'
              className='border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all '
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegistration;