import React, { ReactNode } from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className='grid grid-cols-12 gap-2'>
            <Sidebar />
            <div className=' col-span-8'>
                <div className=' h-full max-w-7xl mx-auto'>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;