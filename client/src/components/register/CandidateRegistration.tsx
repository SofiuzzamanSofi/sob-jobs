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
import backIcon from "@/assets/back.svg";
import Image from "next/image";
import candidateImage from "@/assets/candidate.svg";

const CandidateRegistration = () => {

  const [countries, setCountries] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [postUser, { isLoading, isError, isSuccess }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<RegisterTypes>();
  const term = useWatch({ control, name: "term" });

  const handleRegister: SubmitHandler<RegisterTypes> = (data) => {
    console.log("click.")
    postUser({ ...data, role: "Candidate", email: user?.email || "", country: data.country || "Bangladesh" });
    // console.log("CandidateRegistration clicked:",data)
  };

  // console.log(watch()) // watch input value by passing the name of it

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

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

    if (user?.role) {
      router.push("/dashboard");
    };
  }, [isLoading, isSuccess, isError, user?.role]);


  return (
    <div className='min-h-[calc(100vh-20rem)] md:flex items-center gap-4'>

      {/* back button */}
      <div className='w-1/2 hidden md:flex flex-col justify-between min-h-[49.5rem] p-10'>

        <button type="button" className="w-3/4 max-w-[16rem] mx-auto py-3 px-4 flex justify-center items-center gap-4 rounded-md  font-medium  shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:border-gray-700 hover-text- dark:focus:ring-offset-gray-800  cursor-pointer  border border-black  hover:border-primary bg-[#FFFAF4] text-gray-800  hover:text-white hover:bg-primary"
          onClick={(event) => {
            router.back()
            event.stopPropagation(); // Stop event propagation
          }}
        >
          <Image className="" src={backIcon} alt='back-icon' />
          back
        </button>

        <Image src={candidateImage} className='h-full w-full' alt='Candidate-Image' />

      </div>

      {/* this div big */}
      <div className='w-full md:w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] text-gray-800 grid place-items-center py-10 sm:p-10 w-full rounded-md border'>
          <h1 className='mb-10 font-bold text-4xl'>Candidate</h1>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className='space-y-3 p-4'
          >

            <div className='flex flex-col w-full max-w-xs'>
              <label htmlFor='firstName' className='pt-2'>
                First Name
              </label>
              <input
                className="p-2"
                type='text'
                id='firstName'
                {...register("firstName")}
                required
              />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label htmlFor='lastName' className='pt-2'>
                Last Name
              </label>
              <input
                className="p-2" type='text' id='lastName'
                {...register("lastName")} required
              />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label htmlFor='email' className='pt-2'>
                Email
              </label>
              <input
                className="p-2 bg-[#ffffff]"
                type="email"
                id="email"
                disabled
                {...register("email")}
                defaultValue={user?.email || ""}
              />
            </div>

            <div className='flex flex-col w-full max-w-xs'>
              <label htmlFor='gender' className='pt-2'>
                Gender
              </label>
              {/* <h1 className='mb-3'>Gender</h1> */}
              <div className='flex gap-3'>
                <div>
                  <input
                    type='radio'
                    id='male'
                    {...register("gender")}
                    value='male'
                    required
                  />
                  <label htmlFor='male' className='p-2'>
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
                  <label htmlFor='female' className='p-2'>
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
                  <label htmlFor='other' className='p-2'>
                    Other
                  </label>
                </div>
              </div>
            </div>

            <hr className='w-full mt-2 bg-black' />
            <div className='flex flex-col w-full max-w-xs'>
              <label htmlFor='country' className='pt-2'>
                Country
              </label>
              <select
                className="p-2 w-full bg-[#FFFFFF] "
                id='country'
                {...register("country")}
              >
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
              <label htmlFor='address' className='pt-2'>
                Street Address
              </label>
              <input
                className="p-2" type='text'
                {...register("address")} id='address'
                required
              />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label htmlFor='city' className='pt-2'>
                City
              </label>
              <input
                className="p-2" type='text'
                {...register("city")} id='city'
                required
              />
            </div>
            <div className='flex flex-col w-full max-w-xs'>
              <label htmlFor='postcode' className='pt-2'>
                Postal Code
              </label>
              <input
                className="p-2" type='text'
                {...register("postcode")} id='postcode'
                required
              />
            </div>

            <div className='flex justify-between items-center w-full mt-3'>
              <div className='flex  w-full max-w-xs'>
                <input
                  className='mr-3'
                  type='checkbox'
                  {...register("term")}
                  id='terms'
                />
                <label htmlFor='terms' className="text-xs">I agree to terms and conditions</label>
              </div>

              <input
                disabled={!term}
                type="submit"
                className={`${!term ? "cursor-not-allowed" : "cursor-pointer"} border border-black py-3 px-4 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary transition-all `}
              />

            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default CandidateRegistration;