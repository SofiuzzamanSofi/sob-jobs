"use client"

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from 'react';
import AccountCreator from '@/components/register/AccountCreator';

interface PageProps {

};

const Page: FC<PageProps> = ({ }) => {

    const router = useRouter();
    const { isLoading, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!user?.email) {
            router.push("/sign-in");
        };
        if (user?.role) {
            router.push("/dashboard");
        };
    }, [isLoading, user?.role, router]);

    if (isLoading) {
        return <Loading />;
    }

    return <AccountCreator />;
};

export default Page;