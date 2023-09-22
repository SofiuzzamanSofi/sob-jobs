"use client"

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/Sob-Jobs-Logo.png";
import avatar from "../assets/avatar.svg";
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

    // small display slider and profile slider -----------
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

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

    // Click outside or scroll to close profile and menu
    const handleCloseProfileAndMenu = () => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    };



    // scroll to off profile or mobile menu bar ---
    (isMenuOpen || isProfileOpen) && window.addEventListener("scroll", () => {
        handleCloseProfileAndMenu();
    });

    // Define a function to toggle the profile
    const toggleProfile = () => {
        setIsProfileOpen((prev) => !prev);
        setIsMenuOpen(false);
        console.log('togglelo:', isProfileOpen);
    };

    // Handle clicks outside the profile
    const handleClickOutside = (event: MouseEvent) => {
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setTimeout(() => {
                if (isMenuOpen || isProfileOpen) {
                    if (isProfileOpen) {
                        handleCloseProfileAndMenu();
                    }
                }
            }, 200);
        }
    };

    // Add click event listener when the profile is open
    useEffect(() => {
        if (isProfileOpen) {
            document.addEventListener('mouseup', handleClickOutside);
        } else {
            document.removeEventListener('mouseup', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [isProfileOpen]);

    // sign out function
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

    const headerRoutes = [
        {
            name: <BiSearchAlt size='23' color='black' className="bg-white rounded-full p-1 h-7 w-7" />,
            path: "/dashboard/search-jobs",
        },
        {
            name: "Dashboard",
            path: "/dashboard",
        },
    ];


    if (pathNameArray.includes("sign-up") || pathNameArray.includes("sign-in")) {
        return null;
    }
    else {
        return (
            <header
                className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full  border-b border-gray-200 text-sm py-0 sm:py-0 bg-white dark:bg-gray-800 dark:border-gray-700"
            >
                <nav
                    className="relative max-w-[85rem] flex flex-wrap basis-full items-center w-full mx-auto sm:flex sm:items-center sm:justify-between px-4 border border-red-700"
                    aria-label="Global"
                >
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
                            />
                        </Link>
                    </div>

                    {/* login || out */}
                    <div className="flex items-center ml-auto sm:ml-0 sm:order-3">
                        {!reduxStore.auth?.user?.email ? (
                            <>
                                <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
                                    <Link
                                        className="flex items-center gap-x-2 font-semibold text-gray-500 hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
                                        href="/sign-in"
                                    >
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        </svg>
                                        Sign In
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
                                    {
                                        headerRoutes.map(({ name, path }, index) => (
                                            <Link
                                                key={index}
                                                href={path}
                                                className={`${pathname.includes("upcommint....") ? "text-blue-500 dark:text-blue-500" : ""} text-gray-500  dark:text-gray-400 font-medium hover:text-blue-600 px-6 sm:py-6 sm:px-0  dark:hover:text-blue-500 `}
                                            >
                                                {name}
                                            </Link>
                                        ))}

                                    <Link
                                        className="flex items-center gap-x-2 font-semibold text-gray-500 hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 z-50"
                                        href=""
                                        onClick={toggleProfile}
                                    >
                                        <Image className="bg-white rounded-full p-1 h-10 w-10 border" src={avatar} alt='' />
                                    </Link>
                                </div>
                            </>
                        )}

                        {/* dash board toggle  */}
                        <div className="lg:hidden flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7 ">
                            <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
                                <span className="sr-only">Toggle Navigation</span>
                                <svg className="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* avater show  */}
                    {/* <div
                        className="border border-red-500 fixed top-0 bottom-0 left-0 right-0"
                        onClick={(e) => {
                            if (e.target !== e.currentTarget) {
                                return;
                            }
                            toggleProfile();
                        }}

                    >
                        <div>madarchod</div> */}
                    <div
                        onMouseUpCapture={handleCloseProfileAndMenu}
                        ref={profileRef}
                        className={`py-4 px-8 rounded-lg shadow-md bg-white dark:bg-gray-800 absolute top-20 right-4 z-30 ${isProfileOpen ? "translate-x-0" : "translate-x-[3000px]"} duration-1000 transition-all border`}
                    >
                        <Link href="" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-default">
                            <div>
                                <p >{reduxStore.auth.user?.firstName ? `${reduxStore.auth.user?.firstName} ${reduxStore.auth.user?.lastName}` : "No Name found, Update your name pls"}</p>
                                <p >{reduxStore.auth.user?.email}</p>
                            </div>
                        </ Link>
                        <Link href="/dashboard" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            Dashboard
                        </ Link>
                        <Link href="" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-not-allowed">
                            Others Comming
                        </ Link>
                        <Link href="" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-not-allowed">
                            Settings
                        </ Link>
                        <Link href="" onClick={handleSignOut} className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm focus:ring-2 focus:ring-blue-500 text-white bg-red-700 ">
                            Sign out
                        </ Link>
                    </div>
                    {/* </div> */}
                </nav>
            </header>
        );
    };
};

export default Navbar;