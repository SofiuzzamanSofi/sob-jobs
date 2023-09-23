"use client"

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import logo from "@/assets/sob-jobs-logo.png";
import searchIcon from "@/assets/search.svg";
import allJobsIcon from "@/assets/all-jobs-icon.svg";
import postedJobsIcon from "@/assets/posted-jobs.svg";
import addJobsIcon from "@/assets/add-jobs.svg";
import appliedJobsIcon from "@/assets/applied-jobs.svg";
import messageIcon from "@/assets/message.svg";
import dashboardIcon from "@/assets/dashboard.svg";
import backIcon from "@/assets/back.svg";
import Image from "next/image";
import { useRouter } from 'next/navigation';


import { FC } from 'react';

interface PageProps {

};

const Page: FC<PageProps> = ({ }) => {

    const router = useRouter();

    // small display slider and profile slider -----------
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

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
    // (isMenuOpen || isProfileOpen) && window.addEventListener("scroll", () => {
    //     handleCloseProfileAndMenu();
    // });

    // Define a function to toggle the profile
    const toggleProfile = () => {
        setIsProfileOpen((prev) => !prev);
        setIsMenuOpen(false);
        console.log('toggleProfile:', isProfileOpen);
    };
    // Define a function to toggle the profile
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        setIsProfileOpen(false);
        console.log('toggleMenu:', isMenuOpen);
    };

    // Handle clicks outside the profile
    const handleClickOutside = (event: MouseEvent) => {

        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            if (isProfileOpen) {
                console.log('isProfileOPen:');
                setTimeout(() => {
                    handleCloseProfileAndMenu();
                }, 300);
            }
        };

        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            if (isMenuOpen) {
                console.log('isMenuOpen:');
                setTimeout(() => {
                    handleCloseProfileAndMenu();
                }, 300);
            }
        };
    };

    // Add click event listener when the profile is open
    useEffect(() => {
        if (isProfileOpen || isMenuOpen) {
            document.addEventListener('mouseup', handleClickOutside);
        } else {
            document.removeEventListener('mouseup', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [isProfileOpen, isMenuOpen]);

    useEffect(() => {
        handleCloseProfileAndMenu();
    }, [router]);


    const linkClassName = "hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white"

    return (

        <div className="hidden md:block">
            <div
                // onMouseUpCapture={handleCloseProfileAndMenu}
                ref={menuRef}
                id="docs-sidebar"
                className={`${isMenuOpen ? "translate-x-0" : "translate-x-[-3000px]"} transition-all duration-500 transform fixed top-0 left-0 bottom-0 z-[60] w-64  border-r p-1 md:p-4 border-gray-200 overflow-y-auto scrollbar-y dark:scrollbar-y  lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 bg-white dark:bg-gray-800 dark:border-gray-700`}
            >
                <div className="px-6 flex items-center justify-between">
                    <Link
                        href=""
                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-smbg-gray-100 text-sm rounded-md text-slate-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-400"
                        onClick={(event) => {
                            router.back()
                            event.stopPropagation(); // Stop event propagation
                        }}
                    >
                        <Image className="" src={backIcon} alt='back-icon' />
                        back
                    </Link>
                    <Link
                        href=""
                    >
                        Employer
                    </Link>
                </div>
                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">
                        <li>
                            <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-900" href="">
                                <Image className="" src={dashboardIcon} alt='dashboard-icon' />
                                Dashboard
                            </a>
                        </li>

                        <li className="hs-accordion" id="users-accordion">
                            <a className={linkClassName} href="">
                                <Image className="" src={searchIcon} alt='search-icon' />
                                Search Jobs
                            </a>
                        </li>



                        <li className="hs-accordion" id="users-accordion">
                            <a className={linkClassName} href="">
                                <Image className="" src={allJobsIcon} alt='all-jobs-icon' />
                                All Jobs
                            </a>
                        </li>

                        <li className="hs-accordion" id="users-accordion">
                            <a className={linkClassName} href="">
                                <Image className="" src={postedJobsIcon} alt='posted-job-icon' />
                                Posted Jobs
                            </a>
                        </li>

                        <li className="hs-accordion" id="users-accordion">
                            <a className={linkClassName} href="">
                                <Image className="" src={addJobsIcon} alt='add-jobs-icon' />
                                Add Jobs
                            </a>
                        </li>

                        <li className="hs-accordion" id="users-accordion">
                            <a className={linkClassName} href="">
                                <Image className="" src={appliedJobsIcon} alt='applied-jobs-icon' />
                                Applied Jobs
                            </a>
                        </li>

                        <li className="hs-accordion" id="users-accordion">
                            <a className={linkClassName} href="">
                                <Image className="" src={messageIcon} alt='message-icon' />
                                Message
                            </a>
                        </li>

                        <li className="hs-accordion" id="account-accordion">
                            <a className={linkClassName} href="">
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                Account Upcomming...

                                <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>

                                <svg className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </a>

                            <div id="account-accordion" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                                <ul className="pt-2 pl-2">
                                    <li>
                                        <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-gray-900" href="">
                                            Upcommint
                                        </a>
                                    </li>
                                    <li>
                                        <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-gray-900" href="">
                                            Upcomming
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Page;