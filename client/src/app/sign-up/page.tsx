"use client"

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import loginImage from "@/assets/login.svg";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SignUpFormValueTypes } from "@/interfaceTypes/interfaceTypes";
import { googleLogin, signUpUser } from "@/redux/features/auth/authSlice";

const SignUp = () => {

  const { handleSubmit, register, control } = useForm<SignUpFormValueTypes>();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const { error, isError, isLoading, user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = ({ email, password }: SignUpFormValueTypes) => {
    dispatch(signUpUser({ email, password }));
    console.log('clicked onsubmit: signUP');
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
    console.log('googlelogin:');
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Please wait...", { id: "user-creating" });
    };
    if (!isLoading && user?.email) {
      toast.success("Sign-Up Success.", { id: "user-creating" });
      // router.push("/");
    };
    if (isError && error) {
      toast.error("Error ", { id: "user-creating" })
    };

    if (user?.email) {
      router.push("/");
    };
  }, [isLoading, user?.email, error, isError, router]);


  console.log('pageClicked:');

  return (
    <div className='min-h-[calc(100vh-2rem)] flex items-center gap-4'>
      <div className='w-1/2 hidden md:block'>
        <Image src={loginImage} className='h-full w-full' alt='Sign-Up-Image' />
      </div>
      <div className='w-full md:w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] text-gray-800 grid place-items-center p-10 w-full rounded-2xl border'>
          <h1 className='mb-10 font-bold text-4xl'>Sign up</h1>

          <div className='space-y-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='pt-2'>
                  Email
                </label>
                <input
                  className="p-2"
                  type='email'
                  id='email'
                  {...register("email")}
                  required
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='pt-2'>
                  Password
                </label>
                <input
                  className="p-2"
                  type='password'
                  id='password'
                  {...register("password")}
                  required
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='confirm-password' className='pt-2'>
                  Confirm Password
                </label>
                <input
                  className="p-2"
                  type='password'
                  id='confirm-password'
                  {...register("confirmPassword")}
                  required
                />
              </div>
              <div className='flex flex-col items-start text-xs text-red-700'>
                <p className='pt-2'                             >
                  {
                    isError ?
                      <span>
                        {error}
                      </span>
                      :
                      <span
                        className="invisible"
                      >
                        &quot;Firebase: Error (auth/wrong-password).&quot;
                      </span>
                  }
                </p>
              </div>
              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-md bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={disabled}
                >
                  Sign Up
                </button>
              </div>
            </form>
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
                Already have an account?{" "}
                <br />
                <Link href="sign-in"
                  className='text-primary hover:underline cursor-pointer bg-gray-100'
                >
                  Sign-In
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;