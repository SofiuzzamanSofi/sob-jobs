"use client"

import Link from "next/link";
import React, { useEffect } from "react";
import logo from "../assets/Sob-Jobs-Logo.png";
import { BiSearchAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { auth } from "../firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getMe, signOutUser, } from "../redux/features/auth/authSlice";
import Image from "next/image";

const Navbar = () => {

    const pathname = usePathname() ?? "";
    const pathNameTotalArray = pathname.split("/");
    const pathNameArray = pathNameTotalArray.filter((path) => path !== "");
    const reduxStore = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();

    // // every time relode and get user/register user from DATABASE 
    // useEffect(() => {
    //     // onAuthStateChanged(auth, (user) => {
    //     //     if (user?.email) {
    //     //         dispatch(getMe(user?.email));
    //     //         // dispatch(setUser(user?.email));
    //     //  //  console.log("From Navbar:", user?.email);
    //     //     }
    //     //     else {
    //     //         // console.log("user?.email: Email nai");
    //     //         dispatch(toggleLoading());
    //     //     }
    //     // });

    //     dispatch(getMe());
    //     // dispatch(onAuthFirebase());
    // }, [dispatch]);

    const handleSignOut = () => {

        dispatch(signOutUser());


        // signOut(auth)
        //     .then(() => {
        //         // console.log("log out clicked.");
        //         dispatch(signOutReducer());
        //     })
        //     .catch((error) => {
        //         // Handle error if needed
        //     });
    };

    if (pathNameArray.includes("sign-up") || pathNameArray.includes("sign-in")) {
        return null;
    }
    else {
        return (
            <nav className={`border-b h-[6.5rem] w-full z-[20] `}>
                <ul className="max-w-7xl p-4 mx-auto flex gap-3 items-center">
                    <li className="flex-auto font-semibold text-2xl">
                        <Link href="/">
                            <Image
                                src={logo}
                                alt=''
                                className='h-[3.9375rem] max-w-[11.8125rem] sm:max-w-[15.75rem] rounded-md'
                            />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='rounded-full bg-white border  h-10 w-10 grid place-items-center'
                            href='/dashboard/search-jobs'
                        >
                            <BiSearchAlt size='23' color='black' />
                        </Link>
                    </li>
                    {/* <li>
                        <Link
                            className="border border-blackrounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                            href="/jobs"
                        >
                            Jobs
                        </Link>
                    </li> */}
                    <li>
                        {reduxStore.auth?.user?.email && (
                            <Link
                                href="/dashboard"
                                className="border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                            >
                                Dashboard
                            </Link>
                        )}
                    </li>

                    <li>
                        {reduxStore.auth?.user?.email ? (
                            <button
                                className="border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                                onClick={handleSignOut}
                                title={reduxStore.auth?.user?.email}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                className="flex items-center gap-x-2 font-medium text-black hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-black dark:hover:text-blue-500"
                                href="/sign-in"
                            >
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                LOG IN
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        );
    };
};

export default Navbar;