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
}

const Page: FC<PageProps> = ({ params, }) => {

    const router = useRouter();
    const [text, setText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [id1, id2] = params?.params[0]?.split("-")

    const reduxStore = useSelector((state: RootState) => state);
    // get Message Detail By Id1 - Id2
    const { isLoading: messageDetailsIsLoading, isError: messageDetailsIsError, data: messageDetailsData } = useGetMessageByIdQuery(`${id1}-${id2}`, { pollingInterval: 1000 });
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

    console.log("messageDetailsData:", messageDetailsData);
    console.log("reduxStore.auth.user:", reduxStore.auth.user);

    // other user not seen other chat 
        const matchUser = messageDetailsData?.data.participants.filter((userInfo)=> userInfo.userEmail === reduxStore.auth.user?.email && userInfo.userId ===  reduxStore.auth.user?._id)
        console.log('matchUser:',matchUser);

    if (messageDetailsIsLoading) {
        return <Loading />
    };
    if (messageDetailsIsError) {
        // if sender/Employee & receiver/Candidate userId dont match on server FIRSTTIME MESSAGE 
        toast.error("No user information found for message.")
        router.back();
        return null;
    };
    if(!matchUser?.length){
        router.push("/dashboard/chat");
        return null;
    };
    if(!messageDetailsData?.data?.messages?.length && reduxStore.auth.user?.role === "Candidate"){
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
            </div>
        );
    };
    // Explicitly return null as a fallback to satisfy the React.FC type
    // return <div>Loading or Placeholder Message</div>;
};

export default Page;