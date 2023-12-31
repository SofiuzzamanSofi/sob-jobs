"use client";

import React from "react";
import candidate from "@/assets/candidate.svg";
import employer from "@/assets/employer.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface pageProps {

};

const AccountCreator = () => {

  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-16rem)]  my-auto">
      <div className="">
        <h1 className='text-center my-10 font-bold text-4xl md:text-7xl'>Continue As...</h1>
        <div className='flex justify-center items-center flex-col md:flex-row gap-8 mb-10'>
          <div
            onClick={() => router.push("/dashboard/register/candidate")}
            className='flex flex-col justify-between transition-all rounded-lg p-5 hover:border hover:border-primary hover:shadow-2xl hover:scale-105 group cursor-pointer'
          >
            <Image className='h-5/6' src={candidate} alt='candidate-registration' />
            <p className='text-center text-3xl'>Candidate</p>
          </div>
          <div
            onClick={() => router.push("/dashboard/register/employer")}
            className='flex flex-col justify-between transition-all rounded-lg p-5 hover:border hover:border-primary hover:shadow-2xl hover:scale-105 group cursor-pointer'
          >
            <Image className='h-5/6' src={employer} alt='employer-registration' />
            <p className='text-center text-3xl'>Employer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreator;
