"use client";

import React, { useEffect } from "react";

import candidate from "@/workArea/assets/candidate.svg";
import employer from "@/workArea/assets/employer.svg";
import CandidateRegistration from "./CandidateRegistration";
import EmployerRegistration from "./EmployerRegistration";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/workArea/redux/store";
import { toast } from "react-hot-toast";
import Loading from "../Loading";

interface pageProps {

};

const AccountCreator = () => {

  const router = useRouter();
  const reduxStore = useSelector((state: RootState) => state);

  useEffect(() => {
    if (reduxStore?.auth?.role) {
      return router.push("/dashboard");
    };
  }, [reduxStore?.auth?.isLoading, reduxStore?.auth?.role]);

  if (reduxStore?.auth?.isLoading) {
    return <Loading />;
  }
  else if (reduxStore?.auth?.role) {
    return router.push("/dashboard");
  }
  else {
    return (
      <div className='h-screen pt-14'>
        <h1 className='text-center my-10 text-2xl'>Continue as ...</h1>
        <div className='flex justify-evenly '>
          <div
            onClick={() => router.push("/dashboard/register/candidate")}
            className='flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group'
          >
            <Image className='h-5/6' src={candidate} alt='' />
            <p className='text-center text-3xl'>Candidate</p>
          </div>
          <div
            onClick={() => router.push("/dashboard/register/employer")}
            className='flex flex-col justify-between transition-all rounded-lg p-5 border border-white hover:border-primary hover:shadow-2xl hover:scale-105 group'
          >
            <Image className='h-[77%]' src={employer} alt='' />
            <p className='text-center text-3xl'>Employer</p>
          </div>
        </div>
      </div>
    );
  };
};

export default AccountCreator;
