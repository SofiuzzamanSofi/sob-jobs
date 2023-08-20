"use client";

import Loading from '@/components/Loading';
import { useGetMessageByIdQuery, usePostMessageByIdMutation } from '@/redux/features/message/messageApi';
import { RootState } from '@/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react'
import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

interface PageProps {
    params: {
        params: string[];
    };
}

const Page: FC<PageProps> = ({ params, }) => {

    const router = useRouter();
    const searchParams = useSearchParams()
    const [text, setText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [id1, id2] = params?.params[0]?.split("-")
    // console.log("id1, id2:", id1, id2);
    /////////////////////// id1= Employee id2 = Candidate

    const reduxStore = useSelector((state: RootState) => state);
    const { isLoading: messageDetailsIsLoading, isError: messageDetailsIsError, data: messageDetailsData } = useGetMessageByIdQuery(`${id1}-${id2}`);
    const [postMessage, { isLoading: postMessageIsLoading, isError: postMessageIsError, isSuccess: postMessageIsSuccess }] = usePostMessageByIdMutation();

    const submitMessage = () => {
        const trimmedText = text?.trim(); // Remove leading and trailing whitespaces
        if (!trimmedText) {
            return; // Return early if the text is empty or whitespace-only
        } else {
            if (messageDetailsData?.data?.participants && reduxStore.auth.user?.email && reduxStore.auth.user?._id) {
                const messageData = {
                    chatId: `${id1}-${id2}`,
                    participants: messageDetailsData.data.participants,
                    message: {
                        // messageId: string;
                        // timestamp: Date; 
                        senderId: reduxStore.auth.user._id,
                        senderEmail: reduxStore.auth.user.email,
                        content: trimmedText,
                    },

                }
                console.log("submitPress-TEXT:", messageData); // whatsApp is similler like this
                // console.log("submitPress-TEXT:", text);
                postMessage(messageData);
                setText("");
                // next code for the function
                // window.alert(trimmedText);
                // textAreaRef.current?.focus()
            }

        }
    }

    const functionCallOnPressInter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitMessage();
        }
    };


    // console.log("params line 48:", params);
    // console.log("router line 49:", router);
    // console.log("searchParams line 50:", searchParams?.get("messageEmail"));
    // console.log("messageDetailsData Like WhatsApp:", messageDetailsData);


    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    if (messageDetailsIsLoading) {
        return <Loading />
    };
    if (messageDetailsIsError) {
        toast.error("No user information found for message.")
        router.back();

    };
    if (messageDetailsData) {

        const participantsOthers = messageDetailsData.data.participants.filter((p) => p.userEmail !== reduxStore.auth.user?.email)
        console.log("messageDetailsData.data.messages:", messageDetailsData.data.messages);


        return (
            <div>
                <div>
                    <h1>{participantsOthers[0]?.userName}</h1>
                    <h1>{participantsOthers[0]?.userEmail}</h1>
                </div>
                <div>
                    <h1>MIDDLE</h1>
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

                </div>
            </div>
        );
    };
    // Explicitly return null as a fallback to satisfy the React.FC type
    // return <div>Loading or Placeholder Message</div>;
};

export default Page;