"use client";

import Link from "next/link";
import toast from 'react-hot-toast';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import React, { FC, useRef, useState, useEffect } from 'react';
import { useGetMessageByIdQuery, usePostMessageByIdMutation } from '@/redux/features/message/messageApi';
import uploadImageIcon from "@/assets/upload-image.svg";
import userIcon from "@/assets/user.svg";
import threeDotsIcon from "@/assets/three-dots.svg";
import chatImojiIcon from "@/assets/chat-imoji.svg";
import { BsArrowRightShort } from "react-icons/bs";
import Image from "next/image";

interface PageProps {
    params: {
        params: string[];
    };
};

const Page: FC<PageProps> = ({ params, }) => {

    const router = useRouter();
    const [text, setText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [id1, id2] = params?.params[0]?.split("-");

    const reduxStore = useSelector((state: RootState) => state);
    // get Message Detail By Id1 - Id2
    const { isLoading: messageDetailsIsLoading, isError: messageDetailsIsError, data: messageDetailsData } = useGetMessageByIdQuery(`${id1}-${id2}`, {
        // pollingInterval: 1000
    });
    const [postMessage, { isLoading: postMessageIsLoading, isError: postMessageIsError, isSuccess: postMessageIsSuccess }] = usePostMessageByIdMutation();

    const submitMessage = () => {
        const trimmedText = text?.trim(); // Remove leading and trailing 
        if (!trimmedText) {
            return;
        } else {
            if (messageDetailsData?.data?.participants && reduxStore.auth.user?.email && reduxStore.auth.user?._id) {
                const messageData = {
                    chatId: `${id1}-${id2}`,
                    participants: messageDetailsData.data.participants,
                    message: {
                        senderId: reduxStore.auth.user._id,
                        senderEmail: reduxStore.auth.user.email,
                        content: trimmedText,
                    },
                }
                postMessage(messageData);
                setText("");
            }
        }
    }

    const functionCallOnPressInter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitMessage();
        }
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    // other user not seen other chat 
    const matchUser = messageDetailsData?.data.participants.filter((userInfo) => userInfo.userEmail === reduxStore.auth.user?.email && userInfo.userId === reduxStore.auth.user?._id)

    // className 
    const imogiButtonClass = "p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"

    const replyAnsButtonClass = "shrink-0 h-10 w-10 bg-primary/10 border border-primary dark:border-darkPrimary hover:bg-primary dark:hover:bg-darkPrimary rounded-full grid place-items-center text-primary dark:text-darkPrimary hover:text-white hover:px-2 transition-all"

    const textAreaClass = "mx-1 lg:mx-4 p-2 w-full border border-gray-200 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 text-slate-700 dark:text-slate-400"


    if (messageDetailsIsLoading) {
        return <Loading />
    };
    if (messageDetailsIsError) {
        // if sender/Employee & receiver/Candidate userId dont match on server FIRSTTIME MESSAGE 
        toast.error("No user information found for message.")
        router.back();
        return null;
    };
    if (!matchUser?.length) {
        router.push("/dashboard/chat");
        return null;
    };
    if (!messageDetailsData?.data?.messages?.length && reduxStore.auth.user?.role === "Candidate") {
        router.push("/dashboard/chat");
        return null;
    };
    if (messageDetailsData) {
        const participantsOthers = messageDetailsData.data.participants.filter((p) => p.userEmail !== reduxStore.auth.user?.email);

        return (
            <div className='md:py-5'>
                <div className="flex justify-between px-3 py-2 lg:p-5 rounded-md bg-gray-50 dark:bg-gray-700">
                    <div className="flex  gap-2">
                        <div>
                            <Link
                                className=""
                                href=""
                            >
                                <Image className="bg-white rounded-full p-1 h-18 w-10" src={userIcon} alt='user-icon' />
                            </Link>
                        </div>
                        <div className="text-sm">
                            <h1>{participantsOthers[0]?.userName}</h1>
                            <h1>{participantsOthers[0]?.userEmail}</h1>
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
                </div>
                <div>
                    <h1>{participantsOthers[0]?.userName}</h1>
                    <h1>{participantsOthers[0]?.userEmail}</h1>
                </div>
                <div
                    className="border-2 border-black"
                >
                    {
                        messageDetailsData.data.messages &&
                        messageDetailsData.data.messages.map((message) => (
                            <p
                                key={message.messageId}
                                className={`${message.senderEmail === reduxStore.auth.user?.email ? "text-right" : ""}`}
                            >
                                {message.content}
                            </p>
                        ))
                    }
                </div>
                <div className="flex items-center px-3 py-2 lg:p-5 rounded-md bg-gray-50 dark:bg-gray-700">
                    <button type="button" className={imogiButtonClass}>
                        <Image className="" src={uploadImageIcon} alt='upload-image-icon' />
                        <span className="sr-only">Upload image</span>
                    </button>
                    <button type="button" className={imogiButtonClass}>
                        <Image className="" src={chatImojiIcon} alt='chat-imoji-icon' />
                        <span className="sr-only">Add emoji</span>
                    </button>
                    <label htmlFor="chat" className="sr-only">Your message</label>
                    <textarea
                        id="chat" rows={1} className={textAreaClass} placeholder="Your message..."
                        ref={textAreaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => functionCallOnPressInter(e)}
                    ></textarea>
                    <button
                        className={replyAnsButtonClass}
                        type="submit"
                        onClick={submitMessage}
                    >
                        <BsArrowRightShort size={30} />
                    </button>
                </div>
            </div>
        );
    };
    // Explicitly return null as a fallback to satisfy the React.FC type
    // return <div>Loading or Placeholder Message</div>;
};

export default Page;