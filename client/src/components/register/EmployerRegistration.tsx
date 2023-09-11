"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";

const EmployerRegistration = () => {

  const [countries, setCountries] = useState<any[]>([]);
  const { handleSubmit, register, control } = useForm<RegisterTypes>();
  const term = useWatch({ control, name: "term" });
  const router = useRouter();
  const reduxStore = useSelector((state: RootState) => state);
  const [postUser, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const businessCategory = [
    "Automotive",
    "Business Support & Supplies",
    "Computers & Electronics",
    "Construction & Contractors",
    "Design Agency",
    "Education",
    "Entertainment",
    "Food & Dining",
    "Health & Medicine",
    "Home & Garden",
    "IT Farm",
    "Legal & Financial",
    "Manufacturing, Wholesale, Distribution",
    "Merchants (Retail)",
    "Miscellaneous",
    "Personal Care & Services",
    "Real Estate",
    "Travel & Transportation",
  ];

  const employeeRange = ["1 - 10", "11 - 50", "51 - 100", "Above 100"];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const onSubmitFunction: SubmitHandler<RegisterTypes> = (data) => {
    postUser({ ...data, role: "Employer", email: reduxStore?.auth?.user?.email || "", country: data.country || "Bangladesh" });
    // console.log("EmployerRegistration clicked", data);
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
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          <h1 className='w-full text-2xl text-primary mb-5'>Employer</h1>
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
            <input className="border p-2" type='email' id='email' disabled {...register("email")} defaultValue={reduxStore?.auth?.user?.email || ""} />
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
            <label className='mb-2' htmlFor='companyName'>
              Company&apos;s name
            </label>
            <input className="border p-2" type='text' {...register("companyName")} id='companyName' required />
          </div>
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
            <label className='mb-3' htmlFor='employeeRange'>
              Number of employee
            </label>
            <select className="border p-2" {...register("employeeRange")} id='employeeRange'>
              {employeeRange
                .sort((a, b) => a.localeCompare(b))
                .map((category, index) => (
                  <option key={index} className="border p-2" value={category}>{category}</option>
                ))}
            </select>
          </div>

          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-3' htmlFor='companyCategory'>
              Company&apos;s Category
            </label>
            <select className="border p-2" {...register("companyCategory")} id='companyCategory'>
              {businessCategory
                .sort((a, b) => a.localeCompare(b))
                .map((category, index) => (
                  <option key={index} className="border p-2" value={category}>{category}</option>
                ))}
            </select>
          </div>
          <div className='flex flex-col w-full max-w-xs'>
            <label className='mb-2' htmlFor='roleInCompany'>
              Your role in company
            </label>
            <input
              className="border p-2"
              type='text'
              {...register("roleInCompany")}
              id='roleInCompany'
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
              <label htmlFor='terms'>I agree to terms and conditions</label>
            </div>
            <button
              disabled={!term}
              type='submit'
              className='border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary transition-all '
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegistration;