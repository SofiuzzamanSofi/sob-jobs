"use client"

import React from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const Sidebar = () => {
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
                    <h1 className='text-xl'>Dashboard</h1>
                </div>
                <li>
                    <Link
                        href='/dashboard/add-job'
                        className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
                    >
                        Add Job
                    </Link>
                </li>
                <li>
                    <Link
                        //   style={"pointer-events: none"}
                        href='/dashboard/add-job'
                        className='pointer-events-none hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
                    >
                        Others
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

