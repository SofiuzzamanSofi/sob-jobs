"use client";

import Loading from '@/workArea/components/Loading';
import { RootState } from '@/workArea/redux/store';
import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/workArea/components/dashboard/DashboardLayout';


interface Privetlayout {
    children: ReactNode;
}

// const PrivetLayout = ({ children }: Props): JSX.Element => {
const PrivetLayout = ({ children }: Privetlayout) => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter();

    // useEffect(() => {
    //     if (!reduxStore?.auth?.isLoading && !reduxStore?.auth?.email) {
    //         router.push("/sign-in");
    //     }
    // }, [reduxStore, router]);


    if (reduxStore?.auth?.isLoading) {
        return <Loading />
    }
    else if (!reduxStore?.auth?.isLoading && !reduxStore?.auth?.email) {
        return router.push("/sign-in")
        //  return null;
    }
    // else if (!reduxStore?.auth?.isLoading && !reduxStore?.auth?.email) {
    //     if (!reduxStore?.auth?.role) {
    //         return router.push("/dashboard/register");
    //     }
    //     return router.push("/sign-in")
    //     //  return null;
    // }
    else if ((!reduxStore?.auth?.isLoading && !reduxStore?.auth?.role) && reduxStore?.auth?.email) {
        return (
            <div>
                {children}
            </div>
        );
    }
    else {
        return (
            <div>
                <div>
                    <DashboardLayout children={children} />
                </div>
            </div>
        );
    };
};

export default PrivetLayout;
