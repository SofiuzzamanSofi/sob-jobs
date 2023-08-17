"use client"

import React from "react";
import Link from "next/link";
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
    // const id = pathNameTotalArray[pathNameTotalArray.length - 1];
    // const isPathnameIncludes = pathname.includes("/dashboard/jobs")
    // console.log("pathname:", pathname);
    // console.log("pathNameTotalArray:", pathNameTotalArray.length);

    const employerRoutes = [
        {
            name: "Posted Jobs",
            path: "/dashboard/posted-jobs",
        },
        {
            name: "Add Job",
            path: "/dashboard/add-job",
        },
    ];
    const candidateRoutes = [
        {
            name: "Applied Jobs",
            path: "/dashboard/applied-jobs",
        },
    ];

    return (
        <div className='bg-primary/10 col-span-4 h-screen sticky top-0 border'>
            <ul className='flex flex-col gap-2 w-full h-full  p-3'>
                <div className='flex justify-between items-center text-primary my-1'>
                    <button
                        onClick={() => window.history.back()}

                        className='flex items-center border'>
                        <FaChevronLeft />
                        <h1>Back</h1>
                    </button>
                    {/* <h1 className='text-xl'>
                        <Link
                            href='/dashboard'
                            className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-md'
                        >
                            Dashboard
                        </Link>
                    </h1> */}
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
            </ul>
        </div>
    );
};

export default Sidebar;

