"use client"

import React from "react";
import backIcon from "@/assets/back.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import NavLinks from "../navBarSidebar/NavLinks";

const Sidebar = () => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter();

    return (
        <div
            className="hidden md:block my-[-1rem] py-[1rem] border-r border-gray-200 dark:border-gray-700">
            <div
                className="translate-x-[-1000px] md:translate-x-0  transition-all duration-800 transform z-[60] w-56 p-1 md:p-4 overflow-y-auto scrollbar-y dark:scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 bg-white dark:bg-gray-800 sticky top-0"
            >
                <div className="px-6 flex items-center justify-between">
                    <button
                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
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
                <NavLinks />
            </div>
        </div>
    );
};

export default Sidebar;