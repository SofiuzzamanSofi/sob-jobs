"use client"

import React from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/workArea/redux/store";

const Sidebar = () => {

    const reduxStore = useSelector((state: RootState) => state);

    const employerRoutes = [
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
                    <Link
                        href='/'
                        className='flex items-center border'>
                        <FaChevronLeft />
                        <h1>Back</h1>
                    </Link>
                    <h1 className='text-xl'>
                        <Link
                            href='/dashboard'
                            className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-md'
                        >
                            Dashboard
                        </Link>
                    </h1>
                </div>
                {
                    reduxStore.auth.user?.role === "Employer" &&
                    employerRoutes.map(({ name, path }, index) => (
                        <li key={index}>
                            <Link
                                href={path}
                                className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-md'
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
                                className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-md'
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
                        className='pointer-events-none hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-md'
                    >
                        Others
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

