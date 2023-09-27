"use client";

import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';

interface Privetlayout {
    children: ReactNode;
}

// const PrivetLayout = ({ children }: Props): JSX.Element => {
export default function PrivetLayout({ children }: Privetlayout) {

    const { isLoading, user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const dashboardComponents = !isLoading
        && user?.email
        && user?.role ? true : false;

    useEffect(() => {
        if (!isLoading && !user?.email) {
            return router.push("/sign-in")
        }
    }, [user?.email, isLoading])

    // if (isLoading) {
    //     return <Loading />
    // }

    return (
        <div className={dashboardComponents ? "md:flex gap-4" : ""} >
            {
                dashboardComponents ?
                    <Sidebar />
                    :
                    ""
            }
            <div className={dashboardComponents ? "md:flex-grow lg:pl-8" : ""} >
                {children}
            </div>
        </div>
    );
};