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
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

const Sidebar = () => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter();
    const pathname = usePathname() || "";
    const pathNameTotalArray = usePathname()?.split("/") || [];
    // small display slider and profile slider -----------
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const employerRoutes = [
        {
            name: "Posted Jobs",
            path: "/dashboard/posted-jobs",
            image: <Image className="" src={postedJobsIcon} alt='posted-job-icon' />
        },
        {
            name: "Add Job",
            path: "/dashboard/add-job",
            image: <Image className="" src={addJobsIcon} alt='add-jobs-icon' />
        },
    ];
    const candidateRoutes = [
        {
            name: "Applied Jobs",
            path: "/dashboard/applied-jobs",
            image: <Image className="" src={appliedJobsIcon} alt='applied-jobs-icon' />
        },
    ];
    const allRoutes = [
        {
            name: "Search Jobs",
            path: "/dashboard/search-jobs",
            image: <Image className="" src={searchIcon} alt='search-icon' />
        },
        {
            name: "All Jobs",
            path: "/dashboard/all-jobs",
            image: <Image className="" src={allJobsIcon} alt='all-jobs-icon' />
        },
        {
            name: "Message",
            path: "/dashboard/chat",
            image: <Image className="" src={messageIcon} alt='message-icon' />
        },
    ];

    const currentMenu = (data: string) => {
        return pathname.includes(data)
    };

    const linkClassNameWithCurrent = (data: string) => {
        return `
        hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white
        ${pathname.includes(data) ? "bg-gray-100 dark:bg-gray-900" : ""}
    `
    };

    // const linkClassName = `
    // hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white
    // ${pathname.includes(data) ? "bg-gray-100 dark:bg-gray-900" : ""}
    // `

    return (
        <div className=' border'>
            {/* <ul className='flex flex-col gap-2 w-full h-full  p-3'>
                <div className='flex justify-between items-center text-primary my-1'>
                    <button
                        onClick={() => window.history.back()}

                        className='flex items-center border'>
                        <FaChevronLeft />
                        <h1>Back</h1>
                    </button>
                    <h6>{reduxStore.auth.user?.role}</h6>
                </div>
                <li>
                    <Link
                        href='/dashboard'
                        className={`hover:bg-primary ${pathNameTotalArray.length === 2 ? "bg-primary text-white" : "bg-primary/10"} hover:text-white transition-all w-full block py-2 px-3 rounded-md`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        //   style={"pointer-events: none"}
                        href='/dashboard/search-jobs'
                        className={`hover:bg-primary ${pathname.includes("/search-jobs") ? "bg-primary text-white" : "bg-primary/10"} hover:text-white transition-all w-full block py-2 px-3 rounded-md`}
                    >
                        Search Jobs
                    </Link>
                </li>
                <li>
                    <Link
                        //   style={"pointer-events: none"}
                        href='/dashboard/all-jobs'
                        className={`hover:bg-primary ${pathname.includes("/all-jobs") ? "bg-primary text-white" : "bg-primary/10"} hover:text-white transition-all w-full block py-2 px-3 rounded-md`}
                    >
                        All Jobs
                    </Link>
                </li>
                {
                    reduxStore.auth.user?.role === "Employer" &&
                    employerRoutes.map(({ name, path }, index) => (
                        <li key={index}>
                            <Link
                                href={path}
                                className={`hover:bg-primary ${pathname.includes(path) ? "bg-primary text-white" : "bg-primary/10"} hover:text-white transition-all w-full block py-2 px-3 rounded-md`}
                            >
                                {name}
                            </Link>
                        </li>
                    ))
                }
                {
                    reduxStore.auth.user?.role === "Candidate" &&
                    candidateRoutes.map(({ name, path }, index) => (
                        <li key={index}>
                            <Link
                                href={path}
                                className={`hover:bg-primary ${pathname.includes(path) ? "bg-primary text-white" : "bg-primary/10"} hover:text-white transition-all w-full block py-2 px-3 rounded-md`}
                            >
                                {name}
                            </Link>
                        </li>
                    ))
                }
                <li>
                    <Link
                        //   style={"pointer-events: none"}
                        href='/dashboard/add-job'
                        className={`pointer-events-none hover:bg-primary ${pathname.includes("/dashboard/add-job") ? "hover:bg-primary " : "bg-primary/10"} hover:text-white transition-all w-full block py-2 px-3 rounded-md`}
                    >
                        Others
                    </Link>
                </li>
                <li >
                    <Link
                        href="/dashboard/chat"
                        className={`hover:bg-primary ${pathname.includes("chat") ? "bg-primary text-white" : "bg-primary/10"} hover:text-white transition-all w-full block py-2 px-3 rounded-md`}
                    >
                        Message
                    </Link>
                </li>
            </ul> */}

            <div
                className={`translate-x-[-1000px] md:translate-x-0  transition-all duration-800 transform z-[60] w-64  border-r p-1 md:p-4 border-gray-200 overflow-y-auto scrollbar-y dark:scrollbar-y  lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 bg-white dark:bg-gray-800 dark:border-gray-700 sticky top-0 h-screen`}
            >
                <div className="px-6 flex items-center justify-between">
                    <button
                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-smbg-gray-100 text-sm rounded-md text-slate-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-400"
                        onClick={(event) => {
                            router.back()
                            event.stopPropagation(); // Stop event propagation
                        }}
                    >
                        <Image className="" src={backIcon} alt='back-icon' />
                        back
                    </button>
                    <span>
                        {reduxStore.auth.user?.role}
                    </span>
                </div>
                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">
                        <li>
                            <Link className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-900" href="">
                                <Image className="" src={dashboardIcon} alt='dashboard-icon' />
                                Dashboard
                            </Link>
                        </li>

                        {
                            allRoutes.map(({ name, path, image }, index) => (
                                <li className="hs-accordion" id="users-accordion" key={index}>
                                    <Link className={linkClassNameWithCurrent(path)} href={path}
                                    >
                                        {image}
                                        {name}
                                    </Link>
                                </li>
                            ))
                        }

                        {
                            reduxStore.auth.user?.role === "Employer" &&
                            employerRoutes.map(({ name, path, image }, index) => (
                                <li className="hs-accordion" id="users-accordion" key={index}>
                                    <Link className={linkClassNameWithCurrent(path)} href={path}
                                    >
                                        {image}
                                        {name}
                                    </Link>
                                </li>
                            ))
                        }
                        {
                            reduxStore.auth.user?.role === "Candidate" &&
                            candidateRoutes.map(({ name, path, image }, index) => (
                                <li className="hs-accordion" id="users-accordion" key={index}>
                                    <Link className={linkClassNameWithCurrent(path)} href={path}
                                    >
                                        {image}
                                        {name}
                                    </Link>
                                </li>
                            ))
                        }

                        <li className="hs-accordion" id="account-accordion">
                            <Link className={linkClassNameWithCurrent("nothingfromthe worls")} href="">
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                Upcomming...

                                <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>

                                <svg className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                                </svg>
                            </Link>

                            <div id="account-accordion" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                                <ul className="pt-2 pl-2">
                                    <li>
                                        <Link className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-gray-900" href="">
                                            Upcommint
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-gray-900" href="">
                                            Upcomming
                                        </Link>
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

export default Sidebar;