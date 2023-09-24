"use client";

import toast from 'react-hot-toast';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import React, { FC, useRef, useState, useEffect } from 'react';
import { useGetMessageByIdQuery, usePostMessageByIdMutation } from '@/redux/features/message/messageApi';

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
            <div>
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
                <div>
                    <textarea
                        className='border p-2'
                        placeholder='Write a message'
                        ref={textAreaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => functionCallOnPressInter(e)}
                    />
                    <button onClick={submitMessage}>Submit</button>
                </div>
                <div>

                    <form>
                        <label htmlFor="chat" className="sr-only">Your message</label>
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                                </svg>
                                <span className="sr-only">Add emoji</span>
                            </button>
                            <textarea id="chat" rows={1} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                <svg className="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        );
    };
    // Explicitly return null as a fallback to satisfy the React.FC type
    // return <div>Loading or Placeholder Message</div>;
};

export default Page;