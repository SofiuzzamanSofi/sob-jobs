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
            <>
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

                        </li>


                        {reduxStore.auth?.user?.email ? (
                            <>

                                <li>
                                    <button
                                        className="border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                                        onClick={handleSignOut}
                                        title={reduxStore.auth?.user?.email}
                                    >
                                        Sign Out
                                    </button>
                                </li>
                                <li>
                                    <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover] sm:py-4">
                                        <button type="button" className="flex items-center w-full font-medium px-6 sm:px-0 text-black hover:text-gray-400 dark:text-black dark:hover:text-gray-500">
                                            Menu
                                            <svg className="ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                            </svg>
                                        </button>

                                        <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-lg py-2 px-3 sm:px-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5">
                                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                About
                                            </a>
                                            <div className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
                                                <button type="button" className="w-full flex justify-between items-center text-sm text-gray-800 rounded-md py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                                    Sub Menu
                                                    <svg className="sm:-rotate-90 ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                                    </svg>
                                                </button>

                                                <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-right-5 before:top-0 before:h-full before:w-5 top-0 right-full !mx-[10px]">
                                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                        About
                                                    </a>
                                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                        Downloads
                                                    </a>
                                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                        Team Account
                                                    </a>
                                                </div>
                                            </div>
                                            <a
                                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                                href="#"
                                            >
                                                Downloads
                                            </a>
                                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm focus:ring-2 focus:ring-blue-500 text-white bg-red-700"
                                                href="#"
                                            >
                                                Sign Out
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        className="flex items-center gap-x-2 font-medium text-black hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-black dark:hover:text-blue-500"
                                        href="/sign-in"
                                    >
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        </svg>
                                        LOG IN
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </nav>


                <>
                    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-0 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
                        <nav className="relative max-w-[85rem] flex flex-wrap basis-full items-center w-full mx-auto sm:flex sm:items-center sm:justify-between px-4" aria-label="Global">
                            <div className="flex items-center justify-between">
                                <Link
                                    className="flex-none text-xl font-semibold dark:text-white"
                                    aria-label="Brand"
                                    href="/"
                                >

                                    <Image
                                        src={logo}
                                        alt=''
                                        className='h-[2.904rem] sm:h-[4.248rem] w-[10.164rem] sm:w-[14.868rem] rounded-md'
                                    // className='h-[3.9375rem] max-w-[11.8125rem] sm:max-w-[15.75rem] rounded-md'
                                    />
                                </Link>
                                {/* <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Brand</a> */}

                            </div>

                            <div className="flex items-center ml-auto sm:ml-0 sm:order-3">
                                <div className="sm:hidden">
                                    <button type="button" className="p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#navbar-offcanvas-example" aria-controls="navbar-offcanvas-example" aria-label="Toggle navigation">
                                        Menu
                                        <svg className="hs-overlay-open:hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div id="navbar-offcanvas-example" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r basis-full grow sm:order-2 sm:static sm:block sm:h-auto sm:max-w-none sm:w-auto sm:border-r-transparent sm:transition-none sm:translate-x-0 sm:z-40 sm:basis-auto dark:bg-gray-800 dark:border-r-gray-700 sm:dark:border-r-transparent hidden" tabIndex={-1} data-hs-overlay-close-on-resize>
                                <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
                                    <Link
                                        className="font-medium text-gray-500 hover:text-gray-400 px-6 sm:py-6 sm:px-0 dark:text-gray-400 dark:hover:text-gray-500 "
                                        href='/dashboard/search-jobs'
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className="font-medium text-gray-500 hover:text-gray-400 px-6 sm:py-6 sm:px-0 dark:text-gray-400 dark:hover:text-gray-500"
                                        href='/dashboard/search-jobs'
                                    >
                                        <BiSearchAlt size='23' color='black' className="bg-white rounded-full p-1 h-7 w-7" />
                                    </Link>
                                    <Link
                                        className="font-medium text-gray-500 hover:text-gray-400 px-6 sm:py-6 sm:px-0 dark:text-gray-400 dark:hover:text-gray-500"
                                        href="/dashboard"
                                    >
                                        Dashboard
                                    </Link>
                                    <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover] sm:py-4">
                                        <button type="button" className="flex items-center w-full text-gray-500 hover:text-gray-400 font-medium px-4 dark:text-gray-400 dark:hover:text-gray-500">
                                            Dashboard
                                            <svg className="ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                            </svg>
                                        </button>

                                        <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-lg py-2 px-3 sm:px-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5">
                                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                About
                                            </a>
                                            <div className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
                                                <button type="button" className="w-full flex justify-between  items-center text-sm text-gray-800 rounded-md py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                                    Sub Menu
                                                    <svg className="sm:-rotate-90 ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                                    </svg>
                                                </button>

                                                <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-right-5 before:top-0 before:h-full before:w-5 top-0 right-full !mx-[10px]">
                                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                        About
                                                    </a>
                                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                        Downloads
                                                    </a>
                                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                        Team Account
                                                    </a>
                                                </div>
                                            </div>

                                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                Downloads
                                            </a>

                                            <button
                                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:text-black bg-red-700 w-full"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                    {!reduxStore.auth?.user?.email && (
                                        <Link
                                            className="flex items-center gap-x-2 font-semibold text-gray-500 hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
                                            href="/sign-in"
                                        >
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                            </svg>
                                            Sign In
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </header>
                </>

            </>
        );
    };
};

export default Navbar;