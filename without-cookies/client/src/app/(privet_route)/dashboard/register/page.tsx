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
        if (!isLoading && user?.role) {
            router.push("/dashboard");
        };
    }, [user?.role, isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    return <AccountCreator />;
};

export default Page;