import { FC } from 'react';
import Link from "next/link";
import React from "react";
import searchIcon from "@/assets/search.svg";
import allJobsIcon from "@/assets/all-jobs-icon.svg";
import postedJobsIcon from "@/assets/posted-jobs.svg";
import addJobsIcon from "@/assets/add-jobs.svg";
import appliedJobsIcon from "@/assets/applied-jobs.svg";
import messageIcon from "@/assets/message.svg";
import dashboardIcon from "@/assets/dashboard.svg";
import backIcon from "@/assets/back.svg";
import avatarIcon from "@/assets/avatar.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface NavLinksProps {

};

const NavLinks: FC<NavLinksProps> = () => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter();
    const pathname = usePathname() || "";

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

    const linkClassNameWithCurrent = (data: string) => {
        return `
         flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 
        ${pathname.includes(data) ? "bg-gray-100 dark:bg-gray-900" : ""}
    `
    };

    const sidebarClass = "translate-x-[-1000px] md:translate-x-0  transition-all duration-800 transform z-[60] w-56 p-1 md:p-4 overflow-y-auto scrollbar-y dark:scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 bg-white dark:bg-gray-800 sticky top-0"

    const dashboardClass = "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-900"

    return (
        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5 max-w-36">
                <li>
                    <Link className={dashboardClass} href="/dashboard">
                        <Image className="" src={dashboardIcon} alt='dashboard-icon' />
                        Dashboard
                    </Link>
                </li>

                {
                    allRoutes.map(({ name, path, image }, index) => (
                        <li key={index}>
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
                        <li key={index}>
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
                        <li key={index}>
                            <Link className={linkClassNameWithCurrent(path)} href={path}
                            >
                                {image}
                                {name}
                            </Link>
                        </li>
                    ))
                }


                <li className="cursor-not-allowed">
                    <div className={linkClassNameWithCurrent("/profile")}>
                        <Image className="" src={avatarIcon} alt='avatar-icon' />
                        Others Profile
                    </div>
                </li>
                <li className="cursor-not-allowed">
                    <div className={linkClassNameWithCurrent("nothingfromthe worls")}>
                        <Image className="" src={avatarIcon} alt='avatar-icon' />
                        Upcoming...
                    </div>
                </li>

            </ul>
        </nav>
    );
};

export default NavLinks;