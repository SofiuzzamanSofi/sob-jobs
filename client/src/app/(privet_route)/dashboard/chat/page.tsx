"use client";

import { useGetAllMessageByIdQuery } from '@/redux/features/message/messageApi';
import { RootState } from '@/redux/store';
import { FC } from 'react'
import { useSelector } from 'react-redux';

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {

    const reduxStore = useSelector((state: RootState) => state);
    const { isLoading: messageDetailsIsLoading, isError: messageDetailsIsError, data: messageDetailsData } = useGetAllMessageByIdQuery(reduxStore.auth.user?._id);
    console.log('reduxStore.auth.user?._id:', reduxStore.auth.user?._id);
    console.log('messageDetailsData:', messageDetailsData);

    return (
        <div>
            <h1>
                message home page
            </h1>
            <h1>
                No Chat History Here.
            </h1>
        </div>
    )
}

export default Page;