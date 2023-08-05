"use client"

import React, { useEffect, useState } from "react";
import loginImage from "@/workArea/assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { SignUpFormValues } from "@/workArea/interfaceTypes/interfaceTypes";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, signInUser } from "@/workArea/redux/features/auth/authSlice";
import { AppDispatch, RootState } from "@/workArea/redux/store";
import toast from 'react-hot-toast';

const SignIn = () => {
  const { handleSubmit, register, control } = useForm<SignUpFormValues>();
  const password = useWatch({ control, name: "password" });
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const reduxStore = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (
      password?.length > 5
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);

  const onSubmit = ({ email, password }: SignUpFormValues) => {
    dispatch(signInUser({ email, password }));
    // Rest of the form submission logic
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  }

  useEffect(() => {
    if (reduxStore?.auth?.isLoading) {
      toast.loading("Please wait...", { id: "user-creating" });
    };
    if (!reduxStore?.auth?.isLoading && reduxStore?.auth?.email) {
      toast.success("Sign-Up Success.", { id: "user-creating" });
      router.back();
      // router.push("/");
    };
    if (reduxStore?.auth?.isError && reduxStore?.auth?.error) {
      toast.error("Error ", { id: "user-creating" })
    };
  }, [reduxStore?.auth?.isLoading, reduxStore?.auth?.email, reduxStore?.auth?.error, reduxStore?.auth?.isError]);

  return (
    <div className='flex h-screen items-center pt-14 border border-red-700'>
      <div className='w-1/2'>
        <Image src={loginImage} className='h-full w-full' alt='Sign-Up-Image' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input
                  className="p-2"
                  type='email'
                  id='email'
                  {...register("email")}
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  className="p-2"
                  type='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-md bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={disabled}
                >
                  Sign In
                </button>
              </div>
              <div>
                <p
                  className="text-xs text-red-700 my-[-10px] mb-[-20px]"
                >
                  {
                    reduxStore?.auth?.isError ?
                      <span>
                        {reduxStore?.auth?.error}
                      </span>
                      :
                      <span
                        className="invisible"
                      >
                        "Firebase: Error (auth/wrong-password)."
                      </span>
                  }
                </p>
              </div>
              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-md bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  // disabled={disabled}
                  onClick={handleGoogleLogin}
                >
                  Sign In With Google
                </button>
              </div>
              <div>
                <p>
                  Don't have an accoount?{" "}
                  <br />
                  <Link href="/sign-up"
                    className='text-primary hover:underline cursor-pointer bg-gray-100'
                  >
                    Sign-Up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;