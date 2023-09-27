"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import backIcon from "@/assets/back.svg";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import employerImage from "@/assets/employer.svg";
import React, { useEffect, useState } from "react";
import { RegisterTypes } from "@/interfaceTypes/interfaceTypes";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

const EmployerRegistration = () => {

  const [countries, setCountries] = useState<any[]>([]);
  const { handleSubmit, register, control } = useForm<RegisterTypes>();
  const term = useWatch({ control, name: "term" });
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
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

  const handleRegister: SubmitHandler<RegisterTypes> = (data) => {
    const regData = { ...data, role: "Employer", email: user?.email || "", country: data.country || "Bangladesh" }
    postUser(regData);
    console.log("clicked handleRegister",);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...", { id: "post-user-on-db" });
    };
    if (!isLoading && isSuccess) {
      toast.success("Register Success.", { id: "post-user-on-db" });
      // router.push("/dashboard");
    };
    if (isError) {
      toast.error("Error ", { id: "post-user-on-db" })
    };

    console.log("clieck useEffect",);
    if (!user?.email) {
      router.push("/sign-in");
    };
    if (user?.role) {
      router.push("/dashboard");
    };
  }, [isLoading, isSuccess, isError, router]);

  console.log("clicked outside");

  return (
    <div className='min-h-[calc(100vh-20rem)] md:flex items-center gap-4'>

      {/* back button */}
      <div className='w-1/2 hidden md:flex flex-col justify-between min-h-[53.93rem] p-10'>

        <button type="button" className="w-3/4 max-w-[16rem] mx-auto py-3 px-4 flex justify-center items-center gap-4 rounded-md  font-medium  shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:border-gray-700 hover-text- dark:focus:ring-offset-gray-800  cursor-pointer  border border-black  hover:border-primary bg-[#FFFAF4] text-gray-800  hover:text-white hover:bg-primary"
          onClick={(event) => {
            console.log("click on back function")
            router.back()
            event.stopPropagation(); // Stop event propagation
          }}
        >
          <Image className="" src={backIcon} alt='back-icon' />
          back
        </button>

        <Image src={employerImage} className='h-full w-full' alt='EmployerImage-Image' />

      </div>

      {/* functionality*/}
      <div className='w-full md:w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] text-gray-800  grid place-items-center py-10 sm:p-10 w-full rounded-md border'>
          <h1 className='mb-10 font-bold text-4xl'>Employer</h1>

          <div className='space-y-3 p-4'>
            <form
              onSubmit={handleSubmit(handleRegister)}
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
                <label htmlFor='companyName' className='pt-2'>
                  Company&apos;s name
                </label>
                <input
                  className="p-2"
                  type='text'
                  id='companyName'
                  {...register("companyName")}
                  required
                />
              </div>
              <div className='flex flex-col w-full max-w-xs'>
                <label htmlFor='country' className='pt-2'>
                  Country
                </label>
                <select
                  className="p-2 w-full bg-[#FFFFFF] "
                  {...register("country")} id='country'
                  defaultValue="Bangladesh"
                >
                  {countries
                    .sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
                    .map(({ name }, index) => (
                      <option
                        key={index}
                        value={name.common}
                      >
                        {name.common}
                      </option>
                    ))}
                </select>
              </div>
              <div className='flex flex-col w-full max-w-xs'>
                <label htmlFor='employeeRange' className='pt-2'>
                  Number of employee
                </label>
                <select
                  className="p-2 w-full bg-[#FFFFFF] "
                  id='employeeRange'
                  {...register("employeeRange")}
                >
                  {employeeRange
                    .sort((a, b) => a.localeCompare(b))
                    .map((category, index) => (
                      <option key={index} className="border p-2" value={category}>{category}</option>
                    ))}
                </select>
              </div>

              <div className='flex flex-col w-full max-w-xs'>
                <label htmlFor='companyCategory' className='pt-2'>
                  Company&apos;s Category
                </label>
                <select
                  className="p-2 w-full bg-[#FFFFFF] "
                  id='companyCategory'
                  {...register("companyCategory")}
                >
                  {businessCategory
                    .sort((a, b) => a.localeCompare(b))
                    .map((category, index) => (
                      <option key={index} className="border p-2" value={category}>{category}</option>
                    ))}
                </select>
              </div>
              <div className='flex flex-col w-full max-w-xs'>
                <label htmlFor='roleInCompany' className='pt-2'>
                  Your role in company
                </label>
                <input
                  className="p-2"
                  type='text'
                  id='roleInCompany'
                  {...register("roleInCompany")}
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

                <button
                  disabled={!term}
                  type="submit"
                  className={`${!term ? "cursor-not-allowed" : "cursor-pointer"} border border-black py-3 px-4 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary transition-all`}
                >
                  Submit
                </button>

              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
};

export default EmployerRegistration;