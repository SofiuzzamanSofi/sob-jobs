"use client";

import { FC } from 'react'
import Link from 'next/link';
import Image from "next/image";
import userIcon from "@/assets/user.svg";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import threeDotsIcon from "@/assets/three-dots.svg";
import { Participant } from '@/interfaceTypes/interfaceTypes';
import { useGetAllMessageByIdQuery } from '@/redux/features/message/messageApi';

interface PageProps {

};

const Page: FC<PageProps> = ({ }) => {

    const reduxStore = useSelector((state: RootState) => state);
    const { isLoading: messageDetailsIsLoading, isError: messageDetailsIsError, data: messageDetailsData } = useGetAllMessageByIdQuery(reduxStore.auth.user?._id, {
        // pollingInterval: 5000
    });

    const otheParticipentNameEmail = (participants: Participant[]) => {
        return participants.filter((p) => p.userEmail !== reduxStore.auth.user?.email);
    };

    const messageArrayReverse = messageDetailsData?.data ? [...messageDetailsData?.data].reverse() : [];

    return (
        <div>
            <div>
                <h1 className='font-bold text-4xl pb-5 text-center dark:text-slate-300'>All Messages</h1>
            </div>
            <div
                className='grid gap-4'
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
                                className="flex justify-between px-3 py-2 lg:p-5 rounded-md bg-gray-200 dark:bg-gray-700"
                            >
                                {/* <div
                                // className="border-2 border-red-500"
                                >
                                    <h1>Name: {otheParticipentNameEmail(message.participants)[0].userName}</h1>
                                    <h1> Email: {otheParticipentNameEmail(message.participants)[0].userEmail}</h1>
                                    <p>Last Message.</p>
                                </div> */}
                                <div className="flex gap-2">
                                    <div>
                                        <Link
                                            className=""
                                            href={`/dashboard/profile?email=${otheParticipentNameEmail(message.participants)[0].userEmail}`}
                                        >
                                            <Image className="bg-white rounded-full p-1 h-18 w-10" src={userIcon} alt='user-icon' />
                                        </Link>
                                    </div>
                                    <div className="text-sm">
                                        <h1>{otheParticipentNameEmail(message.participants)[0].userName}</h1>
                                        <h1>{otheParticipentNameEmail(message.participants)[0].userEmail}</h1>
                                    </div>
                                </div>
                                <div className="text-sm" >
                                    <div className="flex justify-end">
                                        <Image className="w-6 h-6 text-current text-gray-600 cursor-pointer" src={threeDotsIcon} alt='three-dots-icon' />
                                    </div>
                                    <div>
                                        <p >Last Seen</p>
                                    </div>
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