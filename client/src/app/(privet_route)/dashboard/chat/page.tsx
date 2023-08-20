"use client";

import { Participant } from '@/interfaceTypes/interfaceTypes';
import { useGetAllMessageByIdQuery } from '@/redux/features/message/messageApi';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { FC } from 'react'
import { useSelector } from 'react-redux';

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {

    const reduxStore = useSelector((state: RootState) => state);
    const { isLoading: messageDetailsIsLoading, isError: messageDetailsIsError, data: messageDetailsData } = useGetAllMessageByIdQuery(reduxStore.auth.user?._id);
    // console.log('reduxStore.auth.user?._id:', reduxStore.auth.user?._id);
    // console.log('messageDetailsData:', messageDetailsData);

    const otheParticipentNameEmail = (participants: Participant[]) => {
        return participants.filter((p) => p.userEmail !== reduxStore.auth.user?.email);
    };

    const messageArrayReverse = messageDetailsData?.data ? [...messageDetailsData?.data].reverse() : [];


    return (
        <div>
            <div>
                <h1>
                    message home page
                </h1>
            </div>
            <div
                className='border-2 border-black'
            >
                {
                    messageDetailsData?.data?.length ?
                        messageArrayReverse.map((message) => (
                            <Link
                                href={{
                                    pathname: `/dashboard/chat/${reduxStore.auth.user?._id}-${otheParticipentNameEmail(message.participants)[0].userId}`,
                                    query: { messageEmail: `${reduxStore.auth.user?.email}-${otheParticipentNameEmail(message.participants)[0].userEmail}` },
                                }}
                                key={message._id}
                                className="border-2 border-red-500 block"
                            >
                                <div
                                // className="border-2 border-red-500"
                                >
                                    <h1>Name: {otheParticipentNameEmail(message.participants)[0].userName}</h1>
                                    <h1> Email: {otheParticipentNameEmail(message.participants)[0].userEmail}</h1>
                                    <p>Last Message.</p>
                                </div>
                            </Link>
                        ))
                        :
                        <div>
                            <h1> No Message History For You </h1>
                        </div>
                }
            </div>
        </div>
    )
}

export default Page;